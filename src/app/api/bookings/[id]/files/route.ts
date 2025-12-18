import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import supabase from "@/lib/supabaseAdmin";

// Helper function to get CORS headers based on request origin
function getCorsHeaders(request?: NextRequest) {
  const origin = request?.headers.get('origin') || '';
  const allowedOrigins = [
    'https://sp-dashboard-nine.vercel.app',
    'http://localhost:3001'
  ];

  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-csrf-token",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400"
  };
}

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// POST /api/bookings/[id]/files - Upload files for a booking
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const corsHeaders = getCorsHeaders(req);

  try {
    // 1. Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    // 2. Get user from database
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // 3. Only photographers can upload files
    if (user.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Only photographers can upload files" },
        { status: 403, headers: corsHeaders }
      );
    }

    const { id: bookingId } = await params;

    // 4. Verify booking exists and photographer owns it
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    if (booking.photographerId !== user.id) {
      return NextResponse.json(
        { error: "You can only upload files for your own bookings" },
        { status: 403, headers: corsHeaders }
      );
    }

    // 5. Parse multipart form data
    const formData = await req.formData();
    const fileType = formData.get('fileType') as string;
    const files = formData.getAll('files') as File[];

    if (!fileType || files.length === 0) {
      return NextResponse.json(
        { error: "fileType and files are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 6. Validate fileType
    const validFileTypes = [
      'unedited-photos',
      'edited-photos',
      'videos',
      'virtual-tour',
      'floor-plan'
    ];

    if (!validFileTypes.includes(fileType)) {
      return NextResponse.json(
        { error: `Invalid fileType. Must be one of: ${validFileTypes.join(', ')}` },
        { status: 400, headers: corsHeaders }
      );
    }

    // 7. Upload files to Supabase Storage and save metadata
    const uploadedFiles: any[] = [];
    const errors: string[] = [];

    for (const file of files) {
      try {
        // Generate unique file name with timestamp
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}-${safeName}`;
        const filePath = `${bookingId}/${fileType}/${fileName}`;

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('booking-files')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          console.error(`Upload error for ${file.name}:`, uploadError);
          errors.push(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('booking-files')
          .getPublicUrl(filePath);

        // Save file metadata to database
        const { data: fileRecord, error: dbError } = await supabase
          .from("BookingFile")
          .insert({
            bookingId: bookingId,
            fileType: fileType,
            fileName: file.name,
            fileUrl: urlData.publicUrl,
            fileSize: file.size,
            mimeType: file.type,
            uploadedBy: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .select()
          .single();

        if (dbError) {
          console.error(`Database error for ${file.name}:`, dbError);
          errors.push(`Failed to save metadata for ${file.name}: ${dbError.message}`);

          // Cleanup: Delete uploaded file from storage
          await supabase.storage
            .from('booking-files')
            .remove([filePath]);

          continue;
        }

        uploadedFiles.push(fileRecord);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        errors.push(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // 8. Return response
    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        {
          error: "Failed to upload any files",
          details: errors,
        },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
        uploadedFiles,
        errors: errors.length > 0 ? errors : undefined,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      {
        error: "Failed to upload files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET /api/bookings/[id]/files - Get all files for a booking
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const corsHeaders = getCorsHeaders(req);

  try {
    // 1. Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    // 2. Get user from database
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const { id: bookingId } = await params;

    // 3. Verify booking exists and user has access
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check authorization - user must be client or photographer
    if (
      (user.role === "CLIENT" && booking.clientId !== user.id) ||
      (user.role === "PHOTOGRAPHER" && booking.photographerId !== user.id)
    ) {
      return NextResponse.json(
        { error: "You don't have access to this booking's files" },
        { status: 403, headers: corsHeaders }
      );
    }

    // 4. Get optional fileType filter from query params
    const { searchParams } = new URL(req.url);
    const fileType = searchParams.get('fileType');

    // 5. Fetch files from database
    let query = supabase
      .from("BookingFile")
      .select(`
        *,
        uploadedByUser:User!BookingFile_uploadedBy_fkey(id, firstname, lastname, email)
      `)
      .eq("bookingId", bookingId)
      .order("createdAt", { ascending: false });

    if (fileType) {
      query = query.eq("fileType", fileType);
    }

    const { data: files, error: filesError } = await query;

    if (filesError) {
      console.error("Error fetching files:", filesError);
      return NextResponse.json(
        { error: "Failed to fetch files", details: filesError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // 6. Generate public URLs or signed URLs depending on bucket configuration
    const filesWithUrls = await Promise.all(
      (files || []).map(async (file) => {
        try {
          // Extract the file path from storage (after the bucket URL)
          // The fileUrl is stored as full public URL, we need to extract the path
          const urlParts = file.fileUrl.split('/booking-files/');
          const filePath = urlParts.length > 1 ? urlParts[1] : `${bookingId}/${file.fileType}/${file.fileName}`;

          // Try to generate signed URL for private buckets
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from('booking-files')
            .createSignedUrl(filePath, 3600);

          if (signedUrlError) {
            console.error(`Error creating signed URL for ${file.fileName}:`, signedUrlError);
            // Fallback: try to get public URL if bucket is public
            const { data: publicUrlData } = supabase.storage
              .from('booking-files')
              .getPublicUrl(filePath);

            return {
              ...file,
              accessUrl: publicUrlData.publicUrl,
            };
          }

          return {
            ...file,
            accessUrl: signedUrlData?.signedUrl || file.fileUrl,
          };
        } catch (error) {
          console.error(`Error processing file ${file.fileName}:`, error);
          return {
            ...file,
            accessUrl: file.fileUrl,
          };
        }
      })
    );

    return NextResponse.json(
      {
        files: filesWithUrls,
        count: filesWithUrls.length,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE /api/bookings/[id]/files - Delete a specific file
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const corsHeaders = getCorsHeaders(req);

  try {
    // 1. Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    // 2. Get user from database
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // 3. Only photographers can delete files
    if (user.role !== "PHOTOGRAPHER") {
      return NextResponse.json(
        { error: "Only photographers can delete files" },
        { status: 403, headers: corsHeaders }
      );
    }

    const { id: bookingId } = await params;
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId query parameter is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Get file record from database
    const { data: file, error: fileError } = await supabase
      .from("BookingFile")
      .select("*")
      .eq("id", fileId)
      .eq("bookingId", bookingId)
      .single();

    if (fileError || !file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // 5. Verify photographer owns the booking
    const { data: booking, error: bookingError } = await supabase
      .from("Booking")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking || booking.photographerId !== user.id) {
      return NextResponse.json(
        { error: "You can only delete files from your own bookings" },
        { status: 403, headers: corsHeaders }
      );
    }

    // 6. Delete file from storage
    const filePath = `${bookingId}/${file.fileType}/${file.fileName}`;
    const { error: storageError } = await supabase.storage
      .from('booking-files')
      .remove([filePath]);

    if (storageError) {
      console.error("Error deleting file from storage:", storageError);
      // Continue to delete database record even if storage deletion fails
    }

    // 7. Delete file record from database
    const { error: deleteError } = await supabase
      .from("BookingFile")
      .delete()
      .eq("id", fileId);

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete file", details: deleteError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      {
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
