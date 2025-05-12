import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma";  // Import prisma from lib
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// CORS middleware
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true", // This is crucial!
};


// Declare Prisma Client only once per request.
declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface JWT {
    role?: string;
  }

  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add role to the session user
    };
    firstname?: string; // Add firstname to the User type
    lastname?: string;  // Add lastname to the User type
    phoneNumber?: string; // Add phoneNumber to the User type
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),  // Use the singleton instance
  session: {
    strategy: "jwt",  // Use JWT for session management
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          
          if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          return null;
        }
      
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        if (!user || !user.password) {
          console.error("User not found or password missing");
          throw new Error("Wrong Email or password.");
        }
      
        if (!user.emailVerified) {
          console.error("Email not verified");
          throw new Error("Please verify your email before logging in.");
        }
      
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.error("Invalid password");
          return null;
        }
      
        console.log("User authenticated:", user);
        return {
          id: user.id,
          name: user.firstname,
          email: user.email,
          role: user.role,
          firstname: user.firstname, // Include firstName
          lastname: user.lastname,   // Include lastName
          //phoneNumber: user.phoneNumber, // Include phoneNumber
        };
      } catch (err) {
        console.error("Authorize error:", err);
        // Forward the exact error message to the client
        if (err instanceof Error) {
          throw err; // This will preserve our custom error message
        }
        throw new Error("Authentication failed");
      }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Adding user to token:", user);
        token.role = user.role;
        token.id = user.id;
        //token.firstName = user.firstname; // Include firstName
        //token.lastName = user.lastname;   // Include lastName
        //token.phoneNumber = user.phoneNumber; // Include phone
      }
      console.log("JWT token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          console.log("Adding token to session:", token);
          session.user.role = token.role as string | undefined;
          session.user.id = token.id as string;
          //session.user.firstName = token.firstName as string | undefined; // Add firstName
          //session.user.lastName = token.lastName as string | undefined;   // Add lastName
          //session.user.phoneNumber = token.phoneNumber as string | undefined; // Add phoneNumber
        }
      }
      console.log("Session object:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",  // Optional: custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },  
};


async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Get the NextAuth response
  const nextAuthResponse = await NextAuth(req, res, authOptions);

  // Add CORS headers to all responses
  if (nextAuthResponse instanceof Response) {
    for (const [key, value] of Object.entries(corsHeaders)) {
      nextAuthResponse.headers.set(key, value);
    }
  }

  return nextAuthResponse;
}

export { handler as GET, handler as POST, handler as OPTIONS };