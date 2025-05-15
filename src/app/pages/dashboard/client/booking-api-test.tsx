"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function BookingApiTest() {
  const { data: session, status } = useSession();

  // State for API test results
  const [testResults, setTestResults] = useState({
    getResults: null,
    postResults: null,
    loading: false,
    error: null,
  });

  // Updated test booking data to match new schema
  const testBookingData = {
    selectedPackage: {
      id: 1,
      name: "Test Package",
      price: 249,
      description: "Basic photography package for small properties",
      features: ["10 High-Quality Photos", "1 Floor Plan", "Next-Day Delivery"],
      pricePerExtra: 25,
    },
    propertyType: "APARTMENT",
    propertySize: "1200",
    buildingName: "Test Building",
    unitNumber: "101",
    floor: "1",
    street: "123 Test Street",
    addOns: [
      {
        id: "addon_test1",
        name: "Extra Service",
        price: 50,
      },
    ],
    date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    timeSlot: "9AM-11AM",
    firstName: "Test",
    lastName: "User",
    phoneNumber: "123-456-7890",
    email: "test@example.com",
  };

  const handleGetTest = async () => {
    if (status !== "authenticated") {
      setTestResults({
        ...testResults,
        error: "You must be logged in to test the API",
      });
      return;
    }

    try {
      setTestResults({
        ...testResults,
        loading: true,
        error: null,
      });

      // Extract the token from the session
      const token = session?.user?.token || session?.accessToken;

      const res = await fetch("/api/bookings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      const data = await res.json();

      setTestResults({
        ...testResults,
        getResults: data,
        loading: false,
      });
    } catch (err) {
      setTestResults({
        ...testResults,
        loading: false,
        error: "Error testing GET: " + err.message,
      });
    }
  };

  const handlePostTest = async () => {
    if (status !== "authenticated") {
      setTestResults({
        ...testResults,
        error: "You must be logged in to test the API",
      });
      return;
    }

    try {
      setTestResults({
        ...testResults,
        loading: true,
        error: null,
      });

      // Extract the token from the session
      const token = session?.user?.token || session?.accessToken;

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(testBookingData),
      });

      const data = await res.json();

      setTestResults({
        ...testResults,
        postResults: data,
        loading: false,
      });
    } catch (err) {
      setTestResults({
        ...testResults,
        loading: false,
        error: "Error testing POST: " + err.message,
      });
    }
  };

  const formatJson = (json) => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Booking API Test Tool</h1>

      {/* Authentication status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
        <div>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                status === "authenticated" ? "text-green-600" : "text-red-600"
              }
            >
              {status === "authenticated"
                ? "Authenticated"
                : "Not authenticated"}
            </span>
          </p>
          {session?.user && (
            <>
              <p>
                <strong>User:</strong> {session.user.email}
              </p>
              <p>
                <strong>Role:</strong> {session.user.role}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error display */}
      {testResults.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <strong>Error:</strong> {testResults.error}
        </div>
      )}

      {/* Test buttons */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={handleGetTest}
          disabled={testResults.loading || status !== "authenticated"}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {testResults.loading ? "Testing..." : "Test GET /api/bookings"}
        </button>

        <button
          onClick={handlePostTest}
          disabled={testResults.loading || status !== "authenticated"}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {testResults.loading ? "Testing..." : "Test POST /api/bookings"}
        </button>
      </div>

      {/* Test data preview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test POST Data</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
          <pre className="text-sm">{formatJson(testBookingData)}</pre>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GET Results */}
        <div>
          <h2 className="text-lg font-semibold mb-2">GET Results</h2>
          {testResults.getResults ? (
            <div>
              <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">
                  {formatJson(testResults.getResults)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-center">
              No GET test results yet
            </div>
          )}
        </div>

        {/* POST Results */}
        <div>
          <h2 className="text-lg font-semibold mb-2">POST Results</h2>
          {testResults.postResults ? (
            <div>
              <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">
                  {formatJson(testResults.postResults)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-center">
              No POST test results yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}