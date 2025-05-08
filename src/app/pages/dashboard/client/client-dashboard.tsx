"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ClientDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State for bookings and pagination
  const [bookings, setBookings] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  })
  
  // State for booking form
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [packages, setPackages] = useState([])
  const [addOns, setAddOns] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedAddOns, setSelectedAddOns] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  
  // Form data state
  const [bookingData, setBookingData] = useState({
    propertyType: "",
    propertySize: "",
    buildingName: "",
    unitNumber: "",
    floor: "",
    street: "",
    date: "",
    timeSlot: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: ""
  })

  // Handle loading state
  if (status === "loading") {
    return <div className="dashboard-container">Loading...</div>
  }

  // Redirect if not authenticated or not a client
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else if (session?.user?.role !== "CLIENT") {
      router.push("/")
    }
  }, [status, session, router])

  // Fetch bookings
  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings()
      // Also fetch packages and addons for the booking form
      fetchPackages()
    }
  }, [status, pagination.page])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/bookings?page=${pagination.page}&limit=${pagination.limit}`)
      
      if (!res.ok) {
        throw new Error("Failed to fetch bookings")
      }
      
      const data = await res.json()
      setBookings(data.bookings)
      setPagination(data.pagination)
    } catch (err) {
      setError("Error fetching bookings: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchPackages = async () => {
    try {
      // Mock packages and addons for now - replace with actual API endpoints
      // In a real application, you would fetch these from your API
      setPackages([
        { id: 1, name: "Basic Package", price: 199, description: "Basic photography package" },
        { id: 2, name: "Standard Package", price: 299, description: "Standard photography package" },
        { id: 3, name: "Premium Package", price: 499, description: "Premium photography package" }
      ])
      
      setAddOns([
        { id: "1", name: "Additional Hour", price: 50, description: "Extra hour of photography" },
        { id: "2", name: "Rush Delivery", price: 75, description: "Get your photos faster" },
        { id: "3", name: "Photo Album", price: 100, description: "Printed photo album" }
      ])
    } catch (err) {
      setError("Error fetching packages: " + err.message)
    }
  }

  const handleAddOnToggle = (addon) => {
    if (selectedAddOns.some(item => item.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item.id !== addon.id))
    } else {
      setSelectedAddOns([...selectedAddOns, addon])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData({
      ...bookingData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedPackage) {
      setError("Please select a package")
      return
    }
    
    try {
      setLoading(true)
      setError("")
      
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          selectedPackage,
          addOns: selectedAddOns,
          ...bookingData
        })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking")
      }
      
      // Success
      setSuccessMessage("Booking created successfully!")
      setShowBookingForm(false)
      
      // Refresh bookings list
      fetchBookings()
      
      // Reset form
      setBookingData({
        propertyType: "",
        propertySize: "",
        buildingName: "",
        unitNumber: "",
        floor: "",
        street: "",
        date: "",
        timeSlot: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
      })
      setSelectedPackage(null)
      setSelectedAddOns([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      BOOKING_CREATED: "bg-blue-100 text-blue-800",
      ASSIGNED: "bg-yellow-100 text-yellow-800",
      IN_PROGRESS: "bg-purple-100 text-purple-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800"
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100"}`}>
        {status?.replace(/_/g, " ")}
      </span>
    )
  }

  return (
    <div className="dashboard-container p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
          <span 
            className="float-right cursor-pointer"
            onClick={() => setSuccessMessage("")}
          >
            &times;
          </span>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <span 
            className="float-right cursor-pointer"
            onClick={() => setError("")}
          >
            &times;
          </span>
        </div>
      )}
      
      {/* Booking button and form */}
      <div className="mb-6">
        {!showBookingForm ? (
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowBookingForm(true)}
          >
            Create New Booking
          </button>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">New Booking</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowBookingForm(false)}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Package Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Select Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map(pkg => (
                    <div 
                      key={pkg.id}
                      className={`border p-4 rounded cursor-pointer ${selectedPackage?.id === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <p className="text-gray-600">{pkg.description}</p>
                      <p className="font-bold mt-2">${pkg.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Add-ons Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Add-ons (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {addOns.map(addon => (
                    <div 
                      key={addon.id}
                      className={`border p-4 rounded cursor-pointer ${selectedAddOns.some(item => item.id === addon.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => handleAddOnToggle(addon)}
                    >
                      <h4 className="font-semibold">{addon.name}</h4>
                      <p className="text-gray-600">{addon.description}</p>
                      <p className="font-bold mt-2">+${addon.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Property Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Property Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Property Type</label>
                      <select 
                        name="propertyType"
                        value={bookingData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <option value="APARTMENT">Apartment</option>
                        <option value="HOUSE">House</option>
                        <option value="CONDO">Condo</option>
                        <option value="OFFICE">Office</option>
                        <option value="RETAIL">Retail</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Property Size (sq ft)</label>
                      <input 
                        type="text"
                        name="propertySize"
                        value={bookingData.propertySize}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Building Name</label>
                      <input 
                        type="text"
                        name="buildingName"
                        value={bookingData.buildingName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-700 mb-1">Unit Number</label>
                        <input 
                          type="text"
                          name="unitNumber"
                          value={bookingData.unitNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Floor</label>
                        <input 
                          type="text"
                          name="floor"
                          value={bookingData.floor}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Street</label>
                      <input 
                        type="text"
                        name="street"
                        value={bookingData.street}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Contact and Appointment Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Date</label>
                      <input 
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Time Slot</label>
                      <select 
                        name="timeSlot"
                        value={bookingData.timeSlot}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        <option value="">Select Time Slot</option>
                        <option value="9AM-11AM">9:00 AM - 11:00 AM</option>
                        <option value="11AM-1PM">11:00 AM - 1:00 PM</option>
                        <option value="1PM-3PM">1:00 PM - 3:00 PM</option>
                        <option value="3PM-5PM">3:00 PM - 5:00 PM</option>
                      </select>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-4 mb-2">Contact Information</h3>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel"
                        name="phoneNumber"
                        value={bookingData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Total calculation */}
              <div className="mt-6 bg-gray-50 p-4 rounded">
                <div className="flex justify-between">
                  <span>Package: {selectedPackage?.name || 'None'}</span>
                  <span>${selectedPackage?.price || 0}</span>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span>Add-ons:</span>
                      <span></span>
                    </div>
                    {selectedAddOns.map(addon => (
                      <div key={addon.id} className="flex justify-between pl-4">
                        <span>{addon.name}</span>
                        <span>${addon.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-2 pt-2 border-t flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    ${(selectedPackage?.price || 0) + 
                      selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Booking"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Bookings List */}
      <div>
        <h2 className="text-xl font-bold mb-4">My Bookings</h2>
        
        {loading && <p>Loading bookings...</p>}
        
        {!loading && bookings.length === 0 && (
          <div className="bg-gray-50 p-8 text-center rounded-lg">
            <p className="text-gray-600">You don't have any bookings yet.</p>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowBookingForm(true)}
            >
              Create Your First Booking
            </button>
          </div>
        )}
        
        {bookings.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Booking ID</th>
                    <th className="py-2 px-4 text-left">Package</th>
                    <th className="py-2 px-4 text-left">Property</th>
                    <th className="py-2 px-4 text-left">Date & Time</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{booking.id.slice(-6)}</td>
                      <td className="py-3 px-4">{booking.packageName}</td>
                      <td className="py-3 px-4">
                        {booking.buildingName}, Unit {booking.unitNumber}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(booking.appointmentDate).toLocaleDateString()} 
                        <br />
                        <span className="text-sm text-gray-600">{booking.timeSlot}</span>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center space-x-2 mt-6">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => setPagination({...pagination, page: pagination.page - 1})}
                  className={`px-3 py-1 rounded ${pagination.page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Prev
                </button>
                
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPagination({...pagination, page: i + 1})}
                    className={`px-3 py-1 rounded ${pagination.page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  disabled={pagination.page === pagination.pages}
                  onClick={() => setPagination({...pagination, page: pagination.page + 1})}
                  className={`px-3 py-1 rounded ${pagination.page === pagination.pages ? 'bg-gray-200 text-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}