"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(res.error)
    } else {
      // Fetch the session to get the user's role
      const session = await fetch("../../../api/auth/session").then((res) => res.json());

      console.log("Session data:", session);
      // Redirect based on the user's role
      if (session?.user?.role === "ADMIN") {
        router.push("../../../pages/dashboard/admin");
      } else if (session?.user?.role === "PHOTOGRAPHER") {
        router.push("../../../pages/dashboard/photographer");
      } else if (session?.user?.role === "CLIENT") {
        router.push("../../../pages/dashboard/client");
      } else {
        setError("Invalid role. Please contact support.");
      }
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
    </div>
  )
}
