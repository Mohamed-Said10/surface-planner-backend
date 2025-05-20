"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


interface AddOn {
  id: string;
  name: string;
  price: number;
  addonId: string;
  bookingId: string;
}

interface Package {
  id: number;
  name: string;
  price: number;
  features: string[];
  description: string;
  pricePerExtra: number;
}

interface User {
  id: string;
  email: string;
  lastname: string;
  firstname: string;
}

interface Booking {
  id: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  photographerId: string | null;
  status: string;
  packageId: number;
  propertyType: string;
  propertySize: string;
  buildingName: string;
  unitNumber: string;
  floor: string;
  street: string;
  appointmentDate: string;
  timeSlot: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  additionalDirections: string | null;
  additionalRequests: string | null;
  isPaid: boolean;
  addOns: AddOn[];
  package: Package;
  client: User;
  photographer: User | null;
}




export default function BookingDetails({ booking, onClose }: { booking: Booking, onClose: () => void }) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [status, setStatus] = useState(booking.status)
  const router = useRouter()

  const handleStatusUpdate = async () => {
    if (status === booking.status) return
    
    try {
      setLoading(true)
      setError("")
      
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as unknown as { accessToken: string })?.accessToken}`,
        },
        body: JSON.stringify({ status })
      })
      
      if (!res.ok) {
        throw new Error(await res.text())
      }
      
      setSuccess("Status updated successfully!")
      router.refresh() // Refresh the page to show updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return
    
    try {
      setLoading(true)
      setError("")
      
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${(session as unknown as { accessToken: string })?.accessToken}`,
        }
      })
      
      if (!res.ok) {
        throw new Error(await res.text())
      }
      
      setSuccess("Booking deleted successfully!")
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getStatusOptions = () => {
    const statusTransitions: Record<string, string[]> = {
      "BOOKING_CREATED": ["PHOTOGRAPHER_ASSIGNED"],
      "PHOTOGRAPHER_ASSIGNED": ["SHOOTING"],
      "SHOOTING": ["EDITING"],
      "EDITING": ["COMPLETED"],
    }
    
    return statusTransitions[booking.status] || []
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Booking Information</h3>
            <p><strong>ID:</strong> {booking.id}</p>
            <p><strong>Status:</strong> 
              {session?.user?.role === "PHOTOGRAPHER" || session?.user?.role === "ADMIN" ? (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="ml-2 border rounded p-1"
                  disabled={loading}
                >
                  <option value={booking.status}>{booking.status.replace(/_/g, " ")}</option>
                  {getStatusOptions().map(option => (
                    <option key={option} value={option}>{option.replace(/_/g, " ")}</option>
                  ))}
                </select>
              ) : (
                <span className="ml-2">{booking.status.replace(/_/g, " ")}</span>
              )}
            </p>
            <p><strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Package Information</h3>
            <p><strong>Package:</strong> {booking.package?.name}</p>
            <p><strong>Price:</strong> ${booking.package?.price}</p>
            {booking.addOns?.length > 0 && (
              <div className="mt-2">
                <strong>Add-ons:</strong>
                <ul className="list-disc pl-5">
                  {booking.addOns.map((addon: AddOn) => (
                    <li key={addon.id}>{addon.name} (${addon.price})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Property Information</h3>
            <p><strong>Type:</strong> {booking.propertyType}</p>
            <p><strong>Size:</strong> {booking.propertySize} sq ft</p>
            <p><strong>Address:</strong> {booking.buildingName}, Unit {booking.unitNumber}, Floor {booking.floor}</p>
            <p><strong>Street:</strong> {booking.street}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Appointment Details</h3>
            <p><strong>Date:</strong> {new Date(booking.appointmentDate).toLocaleDateString()}</p>
            <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Client Information</h3>
            <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phoneNumber}</p>
          </div>
          
          {booking.photographer && (
            <div>
              <h3 className="font-semibold mb-2">Photographer</h3>
              <p><strong>Name:</strong> {booking.photographer.firstname} {booking.photographer.lastname}</p>
              <p><strong>Email:</strong> {booking.photographer.email}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          {(session?.user?.role === "CLIENT" && booking.status === "BOOKING_CREATED") || 
           session?.user?.role === "ADMIN" ? (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
            >
              {loading ? "Deleting..." : "Delete Booking"}
            </button>
          ) : null}
          
          {(session?.user?.role === "PHOTOGRAPHER" || session?.user?.role === "ADMIN") && 
           status !== booking.status ? (
            <button
              onClick={handleStatusUpdate}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          ) : null}
          
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}