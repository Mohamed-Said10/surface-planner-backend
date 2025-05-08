"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function BookingIdApiTest() {
  const { data: session, status } = useSession();

  // State for API test results
  const [testResults, setTestResults] = useState({
    getResults: null,
    putResults: null,
    deleteResults: null,
    loading: false,
    error: null,
  });

  const [bookingId, setBookingId] = useState("");

  // Test data for PUT request
  const testUpdateData = {
    status: "PHOTOGRAPHER_ASSIGNED" // Example field that can be updated
  };

  const handleGetTest = async () => {
    if (status !== "authenticated") {
      setTestResults({
        ...testResults,
        error: "You must be logged in to test the API",
      });
      return;
    }

    if (!bookingId) {
      setTestResults({
        ...testResults,
        error: "Please enter a booking ID",
      });
      return;
    }

    try {
      setTestResults({
        ...testResults,
        loading: true,
        error: null,
      });

      const token = session?.user?.token || session?.accessToken;

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handlePutTest = async () => {
    if (status !== "authenticated") {
      setTestResults({
        ...testResults,
        error: "You must be logged in to test the API",
      });
      return;
    }

    if (!bookingId) {
      setTestResults({
        ...testResults,
        error: "Please enter a booking ID",
      });
      return;
    }

    try {
      setTestResults({
        ...testResults,
        loading: true,
        error: null,
      });

      const token = session?.user?.token || session?.accessToken;

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testUpdateData),
      });

      const data = await res.json();

      setTestResults({
        ...testResults,
        putResults: data,
        loading: false,
      });
    } catch (err) {
      setTestResults({
        ...testResults,
        loading: false,
        error: "Error testing PUT: " + err.message,
      });
    }
  };

  const handleDeleteTest = async () => {
    if (status !== "authenticated") {
      setTestResults({
        ...testResults,
        error: "You must be logged in to test the API",
      });
      return;
    }

    if (!bookingId) {
      setTestResults({
        ...testResults,
        error: "Please enter a booking ID",
      });
      return;
    }

    try {
      setTestResults({
        ...testResults,
        loading: true,
        error: null,
      });

      const token = session?.user?.token || session?.accessToken;

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setTestResults({
        ...testResults,
        deleteResults: data,
        loading: false,
      });
    } catch (err) {
      setTestResults({
        ...testResults,
        loading: false,
        error: "Error testing DELETE: " + err.message,
      });
    }
  };

  const formatJson = (json) => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Booking ID API Test Tool</h1>

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

      {/* Booking ID input */}
      <div className="mb-6">
        <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700 mb-2">
          Booking ID to Test
        </label>
        <input
          type="text"
          id="bookingId"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter booking ID"
        />
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
          {testResults.loading ? "Testing..." : "Test GET /api/bookings/[id]"}
        </button>

        <button
          onClick={handlePutTest}
          disabled={testResults.loading || status !== "authenticated"}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {testResults.loading ? "Testing..." : "Test PUT /api/bookings/[id]"}
        </button>

        <button
          onClick={handleDeleteTest}
          disabled={testResults.loading || status !== "authenticated"}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
        >
          {testResults.loading ? "Testing..." : "Test DELETE /api/bookings/[id]"}
        </button>
      </div>

      {/* Test data preview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test PUT Data</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
          <pre className="text-sm">{formatJson(testUpdateData)}</pre>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GET Results */}
        <div>
          <h2 className="text-lg font-semibold mb-2">GET Results</h2>
          {testResults.getResults ? (
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
              <pre className="text-sm">
                {formatJson(testResults.getResults)}
              </pre>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-center">
              No GET test results yet
            </div>
          )}
        </div>

        {/* PUT Results */}
        <div>
          <h2 className="text-lg font-semibold mb-2">PUT Results</h2>
          {testResults.putResults ? (
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
              <pre className="text-sm">
                {formatJson(testResults.putResults)}
              </pre>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-center">
              No PUT test results yet
            </div>
          )}
        </div>

        {/* DELETE Results */}
        <div>
          <h2 className="text-lg font-semibold mb-2">DELETE Results</h2>
          {testResults.deleteResults ? (
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
              <pre className="text-sm">
                {formatJson(testResults.deleteResults)}
              </pre>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-center">
              No DELETE test results yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}