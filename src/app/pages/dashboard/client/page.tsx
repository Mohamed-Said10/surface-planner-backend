"use client";

import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/auth/login"); // Redirect to login if no session exists
      }
    };

    checkSession();
  }, [router]);
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
        Logout
      </button>
    </div>
  );
}