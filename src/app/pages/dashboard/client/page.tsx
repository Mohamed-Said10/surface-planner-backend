"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import ClientDashboard from "./client-dashboard"
import BookingApiTest from "./booking-api-test"
import BookingIdApiTest from "./BookingIdApiTest"

export default function ClientPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Photography Booking System</h1>
              </div>
            </div>
            <div className="flex items-center">
              {session?.user && (
                <div className="text-sm font-medium text-gray-700">
                  Logged in as: <span className="text-blue-600">{session.user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </button>
            {/* <button
              onClick={() => setActiveTab("api-test")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "api-test"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              API Test Tool
            </button> */}
                    <button onClick={() => setActiveTab("api-test")}>API Test Tool</button>
        <button onClick={() => setActiveTab("booking-id-test")}>
          Booking ID Test
        </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "dashboard" && <ClientDashboard />}
          {/* {activeTab === "api-test" && <BookingApiTest />} */}
          {activeTab === "api-test" && <BookingApiTest />}
          {activeTab === "booking-id-test" && <BookingIdApiTest/>}
        </div>
      </div>
    </div>
  )
}
