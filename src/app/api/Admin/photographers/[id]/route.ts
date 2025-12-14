import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authenticate session
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    // 2. Fetch current user
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("id, role")
      .eq("email", userEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Authorize admin access
    if (user.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Access denied. Only admins can access this endpoint." },
        { status: 403 }
      );
    }

    const photographerId = params.id;

    if (!photographerId) {
      return NextResponse.json(
        { error: "Photographer ID is required" },
        { status: 400 }
      );
    }

    // 4. Fetch photographer details
    const { data: photographer, error: fetchError } = await supabase
      .from("User")
      .select("id, firstname, lastname, city, email, phoneNumber, role, image")
      .eq("id", photographerId)
      .eq("role", "PHOTOGRAPHER")
      .single();

    if (fetchError || !photographer) {
      return NextResponse.json(
        { error: "Photographer not found", details: fetchError?.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ photographer });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Unexpected server error", details: error.message },
      { status: 500 }
    );
  }
}
