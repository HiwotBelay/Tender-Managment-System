"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const Dashboard = () => {
  const [tenders, setTenders] = useState([])
  const [notifications, setNotifications] = useState([])
  const [activeTab, setActiveTab] = useState("all")

  // Fetch tenders data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tenders")
      .then((res) => setTenders(res.data))
      .catch((err) => console.error(err))
  }, [])

  // Fetch notifications data (dummy data for now)
  useEffect(() => {
    // Replace with actual API call if needed
    setNotifications([
      { id: 1, message: "New tender opportunity available", date: "2023-11-10" },
      { id: 2, message: "Reminder: Tender A deadline approaching", date: "2023-11-25" },
    ])
  }, [])

  // If no tenders are loaded yet, show some placeholder data
  const placeholderTenders = [
    { id: 1, name: "Government Infrastructure Project", status: "Active", deadline: "2023-12-15" },
    { id: 2, name: "Healthcare Equipment Supply", status: "Pending", deadline: "2023-12-20" },
    { id: 3, name: "Educational Institution Renovation", status: "Closed", deadline: "2023-11-30" },
  ]

  const displayTenders = tenders.length > 0 ? tenders : placeholderTenders

  const quickActions = [
    {
      title: "Submit New Tender",
      description: "Start a new tender submission process.",
      icon: "📝",
      color: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      title: "View Active Bids",
      description: "Monitor your active tender bids.",
      icon: "📈",
      color: "bg-green-600 text-white hover:bg-green-700",
    },
    {
      title: "View Past Tenders",
      description: "Review your past tender submissions.",
      icon: "📁",
      color: "bg-purple-600 text-white hover:bg-purple-700",
    },
    {
      title: "Manage Notifications",
      description: "Customize your notification preferences.",
      icon: "⚙️",
      color: "bg-orange-600 text-white hover:bg-orange-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
          Tender Management Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Streamline your tender process with real-time insights and actions.
        </p>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {quickActions.map((action, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
          >
            <div className={`${action.color} py-4 px-4`}>
              <div className="flex items-center space-x-2">
                <span className="text-xl">{action.icon}</span>
                <h3 className="text-lg md:text-xl font-bold">{action.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{action.description}</p>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tender Status Overview Section */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Tender Status Overview</h2>
              <div className="flex rounded-md overflow-hidden border border-gray-200">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "active" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("closed")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "closed" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                >
                  Closed
                </button>
              </div>
            </div>
            <p className="text-gray-500 mt-1">Monitor and manage all your tender submissions</p>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold text-sm uppercase">Title</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold text-sm uppercase">Status</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold text-sm uppercase">Deadline</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold text-sm uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTenders.map((tender) => (
                    <tr key={tender.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-800 font-medium">{tender.name}</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tender.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : tender.status === "Closed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {tender.status === "Active" && "✓ "}
                          {tender.status === "Pending" && "⏱ "}
                          {tender.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-800">
                        <div className="flex items-center">
                          <span className="mr-2">📅</span>
                          {tender.deadline}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium">Previous</button>
            <div className="flex items-center space-x-2">
              <button className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded text-sm font-medium">
                1
              </button>
              <button className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded text-sm font-medium">
                2
              </button>
              <button className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded text-sm font-medium">
                3
              </button>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium">Next</button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200">
                {notifications.length} New
              </span>
            </div>
            <p className="text-gray-500 mt-1">Stay updated with the latest tender information</p>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <span className="text-blue-600 text-lg">🔔</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{notification.message}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 mr-1">📅</span>
                      <p className="text-sm text-gray-500">{notification.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

