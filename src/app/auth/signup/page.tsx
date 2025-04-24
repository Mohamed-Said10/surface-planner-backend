"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const validateInputs = () => {
    const newErrors: string[] = []

    // Email validation
    if (!email) {
      newErrors.push("Email is required.")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push("Invalid email format.")
    }

    // Password validation
    if (!password) {
      newErrors.push("Password is required.")
    } else if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters long.")
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.")
    }

    setErrors(newErrors)
    return newErrors.length === 0 // Return true if no errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (validateInputs()) {
      try {
        await axios.post("/api/auth/signup", {
          email,
          password,
          firstname,
          lastname,
        })

        // Redirect to login page after successful sign-up
        router.push("/auth/login")
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Signup error:", err.message)
        } else {
          setErrors(["Something went wrong"])
        }
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  )
}
