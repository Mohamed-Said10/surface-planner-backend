import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
    dateOfBirth?: Date | null;
    address?: string;
    emailVerified?: Date | null;
    password?: string;
    image?: string;
  }

  interface JWT {
    id: string;
    role?: string;
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
    image?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string;
      role?: string;
      firstname?: string;
      lastname?: string;
      phoneNumber?: string;
      dateOfBirth?: string;
      address?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Look up user by email
        const { data: user, error } = await supabase
          .from("User")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          throw new Error("Wrong Email or password.");
        }

        if (!user.password) {
          throw new Error("Password not set.");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Wrong Email or password.");
        }

        return {
          id: user.id,
          name: user.firstname,
          email: user.email,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
          address: user.address,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.phoneNumber = user.phoneNumber;
        token.dateOfBirth = user.dateOfBirth;
        token.address = user.address;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        // Fetch full user details from Supabase
        const { data: user, error } = await supabase
          .from("User")
          .select("role, image, firstname, lastname, phoneNumber, dateOfBirth, address")
          .eq("id", token.id)
          .single();

        if (user) {
          session.user = {
            ...session.user,
            id: token.id,
            role: user.role || "CLIENT",
            image: user.image || "",
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber || "",
            dateOfBirth: user.dateOfBirth,
            address: user.address || "",
          };
        }
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as OPTIONS };







/*
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
    dateOfBirth?: Date | null;
    address?: string;
    emailVerified?: Date | null;
    password?: string;
    image?: string;
  }

  interface JWT {
    id: string;
    role?: string;
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
    image?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string;
      role?: string;
      firstname?: string;
      lastname?: string;
      phoneNumber?: string;
      dateOfBirth?: string;
      address?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
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
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth?.toISOString(),
            address: user.address,
            image: user.image,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          if (err instanceof Error) {
            throw err;
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.phoneNumber = user.phoneNumber;
        token.dateOfBirth = user.dateOfBirth;
        token.address = user.address;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        const user = await prisma.user.findUnique({
          where: { id: token.id },
          select: {
            role: true, // <-- Must be included!
            image: true,
            firstname: true,
            lastname: true,
            phoneNumber: true,
            dateOfBirth: true,
            address: true,
          },
        });
    
        if (user) {
          session.user = {
            ...session.user,
            id: token.id,
            role: user.role || "CLIENT", // Fallback to "CLIENT" if NULL
            image: user.image || "",
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber || "",
            dateOfBirth: user.dateOfBirth?.toISOString(),
            address: user.address || "",
          };
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: "/auth/login",
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as OPTIONS };
*/