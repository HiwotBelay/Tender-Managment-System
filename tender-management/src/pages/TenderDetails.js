import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import { getTenderById, deleteTender } from "../services/api";
import { toast } from "react-toastify";

const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const data = await getTenderById(id);
        setTender(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tender details:", error);
        toast.error("Failed to load tender details");
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTender(id);
      toast.success("Tender deleted successfully");
      navigate("/dashboard/tenders");
    } catch (error) {
      console.error("Error deleting tender:", error);
      toast.error("Failed to delete tender");
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "all" : section);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
        <span className="ml-2 text-gray-500">Loading tender details...</span>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={24} className="text-red-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Tender Not Found
        </h2>
        <p className="mb-4 text-gray-600">
          The tender you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <Link
          to="/dashboard/tenders"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Return to Tenders
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between rounded-lg bg-white p-6 shadow md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center">
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
              {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
            </span>
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              {tender.title}
            </h1>
          </div>
          <p className="text-gray-600">
            ID: {tender.id} • Created on {tender.createdAt}
          </p>
        </div>
        <div className="mt-4 flex space-x-2 md:mt-0">
          <Link
            to={`/dashboard/tenders/${id}/edit`}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </Link>
          <button
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Delete Tender
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this tender? This action
                        cannot be undone and all associated data will be
                        permanently removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tender Overview */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Tender Overview
                </h2>
                <button
                  onClick={() => toggleSection("overview")}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  {expandedSection === "overview" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              {expandedSection === "overview" || expandedSection === "all" ? (
                <div className="mt-4">
                  <p className="text-gray-600">{tender.description}</p>
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Tender Details
                      </h3>
                      <ul className="mt-2 divide-y divide-gray-200">
                        <li className="flex items-center py-3">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="ml-3 text-sm text-gray-900">
                            Published: {tender.publishDate}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <Clock size={16} className="text-gray-400" />
                          <span className="ml-3 text-sm text-gray-900">
                            Deadline: {tender.deadline}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <DollarSign size={16} className="text-gray-400" />
                          <span className="ml-3 text-sm text-gray-900">
                            Value: ${tender.value.toLocaleString()}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <User size={16} className="text-gray-400" />
                          <span className="ml-3 text-sm text-gray-900">
                            Created by: {tender.createdBy}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Requirements
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {tender.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle
                              size={16}
                              className="mt-0.5 text-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {req}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Documents</h2>
                <button
                  onClick={() => toggleSection("documents")}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  {expandedSection === "documents" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              {expandedSection === "documents" || expandedSection === "all" ? (
                <div className="mt-4">
                  <ul className="divide-y divide-gray-200">
                    {tender.documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-blue-100 flex items-center justify-center">
                            <FileText size={20} className="text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.size} • {doc.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <button className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                          <Download size={16} className="mr-1" />
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Bids</h2>
                <button
                  onClick={() => toggleSection("bids")}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  {expandedSection === "bids" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
              {expandedSection === "bids" || expandedSection === "all" ? (
                <div className="mt-4">
                  {tender.bids.length === 0 ? (
                    <div className="rounded-md bg-gray-50 p-4 text-center">
                      <p className="text-sm text-gray-500">
                        No bids have been submitted for this tender yet.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-md border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Bidder
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Submitted
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
                          {tender.bids.map((bid) => (
                            <tr key={bid.id}>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xs font-medium text-gray-600">
                                      {bid.bidder.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                      {bid.bidder}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {bid.company}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">
                                  ${bid.amount.toLocaleString()}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="text-sm text-gray-500">
                                  {bid.submittedAt}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                    bid.status === "accepted"
                                      ? "bg-green-100 text-green-800"
                                      : bid.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {bid.status.charAt(0).toUpperCase() +
                                    bid.status.slice(1)}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <Link
                      to={`/dashboard/tenders/${id}/bid`}
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <Award size={16} className="mr-2" />
                      Submit a Bid
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Timeline</h2>
            <div className="mt-4 flow-root">
              <ul className="-mb-8">
                {tender.timeline.map((event, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== tender.timeline.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              event.type === "published"
                                ? "bg-blue-500"
                                : event.type === "updated"
                                ? "bg-yellow-500"
                                : event.type === "deadline"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            {event.type === "published" ? (
                              <FileText size={16} className="text-white" />
                            ) : event.type === "updated" ? (
                              <Edit size={16} className="text-white" />
                            ) : event.type === "deadline" ? (
                              <Clock size={16} className="text-white" />
                            ) : (
                              <CheckCircle size={16} className="text-white" />
                            )}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {event.description}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={event.date}>{event.date}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">
              Contact Information
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Contact Person
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {tender.contact.name}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {tender.contact.email}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {tender.contact.phone}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Department
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {tender.contact.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderDetails;
