"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Step3Login({ onLogin, onPrevious }: { onLogin: () => void; onPrevious: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || null; // Get callbackUrl from query params
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Fetch the session to confirm login
      const session = await fetch("/api/auth/session").then((res) => res.json());

      console.log("Session data:", session);

      // Redirect to the next step (Step 3: Package Selection)
      if (callbackUrl) {
        router.push(callbackUrl); // Redirect to the callbackUrl if provided
      } else {
        onLogin(); // Trigger the callback to move to Step 3
      }
    }

    setLoading(false);
  };

  return (
    <div>
    <h1>Login</h1>
    
        
    <button
        onClick={onPrevious}
        className="py-2 px-6 rounded-md text-white bg-gray-600 hover:bg-gray-700"
      >
        Return
      </button>

      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <a
          href="/auth/forgot-password"
          style={{ display: "block", marginTop: "5px", color: "blue", textDecoration: "underline" }}
        >
          Forget Password?
        </a>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Don&apos;t have an account?{" "}
        <a
          href="/auth/signup"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Signup
        </a>
      </p>
    </div>
  );
}