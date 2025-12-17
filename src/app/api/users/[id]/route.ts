import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCorsHeaders, handleCorsOptions } from "@/lib/cors";
import { deleteLocalFile, saveFileLocally } from "@/lib/fileUpload";
import supabase from "@/lib/supabaseAdmin";

console.log("Route file loaded");


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET /api/users/[id] route hit");
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

    const { data: user, error } = await supabase
      .from("User")
      .select(
        "id, firstname, lastname, email, image, phoneNumber, dateOfBirth, address, city, state, zipcode, role"
      )
      .eq("id", userId)
      .single();

      console.log("Session user id:", session.user.id);
      console.log("Request param id:", userId);
      console.log("User data:", user);


    if (error || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        ...user,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString()
          : null,
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch user", details: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PUT(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request);

  try {
    const pathParts = request.nextUrl.pathname.split("/");
    const userId = pathParts[pathParts.length - 1];

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    if (session.user.id !== userId) {
      return NextResponse.json(
        { error: "You can only update your own profile" },
        { status: 403, headers: corsHeaders }
      );
    }

    const formData = await request.formData();

    const updateData = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      image: formData.get("image") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipcode: formData.get("zipcode") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth") as string).toISOString()
        : null,
    };

    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400, headers: corsHeaders }
        );
      }

      const { data: currentUser } = await supabase
        .from("User")
        .select("image")
        .eq("id", userId)
        .single();

      const imagePath = await saveFileLocally(imageFile, userId);
      updateData.image = imagePath;

      if (currentUser?.image) {
        await deleteLocalFile(currentUser.image);
      }
    }

    const { data: updatedUser, error } = await supabase
      .from("User")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();
      

    if (error || !updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user", details: error?.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(updatedUser, { headers: corsHeaders });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update user", details: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request);
}

