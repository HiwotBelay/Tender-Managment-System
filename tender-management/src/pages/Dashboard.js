import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Award,
} from "react-feather";
import { useAuth } from "../context/AuthContext";
import {
  getTenderStats,
  getRecentTenders,
  getRecentBids,
} from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeTenders: 0,
    pendingBids: 0,
    totalValue: 0,
    closingSoon: 0,
  });
  const [recentTenders, setRecentTenders] = useState([]);
  const [recentBids, setRecentBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // For now, we'll simulate with mock data
        const statsData = await getTenderStats();
        const tendersData = await getRecentTenders();
        const bidsData = await getRecentBids();

        setStats(statsData);
        setRecentTenders(tendersData);
        setRecentBids(bidsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Placeholder data for charts
  const monthlyTenders = [12, 19, 15, 22, 18, 24, 13, 17, 21, 28, 24, 19];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const maxValue = Math.max(...monthlyTenders);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-gray-600">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/dashboard/tenders/create"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FileText size={16} className="mr-2" />
            Create New Tender
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-md bg-blue-100 p-3">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Active Tenders
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.activeTenders}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>12% increase</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-md bg-purple-100 p-3">
              <Users size={20} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Bids</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pendingBids}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>8% increase</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-md bg-green-100 p-3">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>24% increase</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-md bg-orange-100 p-3">
              <Clock size={20} className="text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Closing Soon</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.closingSoon}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-red-600">
              <AlertTriangle size={16} className="mr-1" />
              <span>Requires attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Tenders Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Monthly Tenders
          </h2>
          <div className="h-64">
            <div className="flex h-48 items-end space-x-2">
              {monthlyTenders.map((value, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(value / maxValue) * 100}%` }}
                  ></div>
                  <span className="mt-2 text-xs text-gray-500">
                    {monthNames[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bids */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Bids
          </h2>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentBids.map((bid) => (
                <li key={bid.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`rounded-full p-2 ${
                          bid.status === "accepted"
                            ? "bg-green-100"
                            : bid.status === "rejected"
                            ? "bg-red-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        {bid.status === "accepted" ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : bid.status === "rejected" ? (
                          <AlertTriangle size={16} className="text-red-600" />
                        ) : (
                          <Clock size={16} className="text-yellow-600" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {bid.tenderTitle}
                        </p>
                        <p className="text-xs text-gray-500">
                          Bid Amount: ${bid.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        bid.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : bid.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Link
                to="/dashboard/bids"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View all bids
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tenders */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Tenders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Tender
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Deadline
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentTenders.map((tender) => (
                <tr key={tender.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-blue-100 flex items-center justify-center">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {tender.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {tender.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {tender.category}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${tender.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {tender.deadline}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tender.daysRemaining} days remaining
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        tender.status === "active"
                          ? "bg-green-100 text-green-800"
                          : tender.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : tender.status === "draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tender.status.charAt(0).toUpperCase() +
                        tender.status.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Link
                      to={`/dashboard/tenders/${tender.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/dashboard/tenders"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all tenders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
