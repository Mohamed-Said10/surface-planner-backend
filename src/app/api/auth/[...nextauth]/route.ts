import NextAuth from "next-auth";
import { authOptions as authoptions } from "@/utils/authOptions";
export const authOptions = authoptions;
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

const handler = NextAuth(authoptions);
export { handler as GET, handler as POST, handler as OPTIONS };

