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
      if (session.user) { 
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.phoneNumber = token.phoneNumber;
        session.user.dateOfBirth = token.dateOfBirth;
        session.user.address = token.address;
        session.user.image = token.image || "";
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
    signIn: "/login",
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