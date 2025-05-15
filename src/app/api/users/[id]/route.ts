import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";
import { deleteLocalFile, saveFileLocally } from "@/lib/fileUpload";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  const corsHeaders = getCorsHeaders(request);

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401, headers: corsHeaders }
      );
    }

    const userId = params.id;

    if (session.user.id !== userId) {
      return NextResponse.json(
        { error: "You can only view your own profile" },
        { status: 403, headers: corsHeaders }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        image: true,
        phoneNumber: true,
        dateOfBirth: true,
        address: true,
        city: true,
        state: true,  
        zipcode: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        ...user,
        dateOfBirth: user.dateOfBirth
          ? user.dateOfBirth.toISOString()
          : null,
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch user", details: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

// app/api/users/[id]/route.ts
export async function PUT(
  request: NextRequest,
) {
  const corsHeaders = getCorsHeaders(request);

  try {
    // Extract ID from the URL path
    const pathParts = request.nextUrl.pathname.split('/');
    const userId = pathParts[pathParts.length - 1];
    
    // Validate the ID format
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Then await the session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    // Now compare IDs
    if (session.user.id !== userId) {
      return NextResponse.json(
        { error: "You can only update your own profile" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Handle FormData
    const formData = await request.formData();
    
    // Prepare update data
    const updateData: any = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      // email: formData.get('email') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipcode: formData.get('zipcode') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      dateOfBirth: formData.get('dateOfBirth') 
        ? new Date(formData.get('dateOfBirth') as string) 
        : null
    };

      // Handle image upload if present
    const imageFile = formData.get('image') as File | null;
    if (imageFile && imageFile.size > 0) {
      // Validate image file
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400, headers: corsHeaders }
        );
      }

      // Get current user to check for existing image
      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { image: true }
      });

      // Save new image
      const imagePath = await saveFileLocally(imageFile, userId);
      updateData.image = imagePath;

      // Delete old image if it exists
      if (currentUser?.image) {
        await deleteLocalFile(currentUser.image);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return NextResponse.json(updatedUser, { headers: corsHeaders });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update user", details: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle preflight
export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request);
}
