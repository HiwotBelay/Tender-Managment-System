"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, X, Plus, Info } from "react-feather";
import { createTender } from "../services/api";
import { toast } from "react-toastify";

const CreateTender = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    value: "",
    publishDate: "",
    deadline: "",
    status: "draft",
    requirements: [""],
    documents: [],
    contact: {
      name: "",
      email: "",
      phone: "",
      department: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    });
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements.splice(index, 1);
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map((file) => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedAt: new Date().toISOString().split("T")[0],
      file,
    }));

    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments],
    });
  };

  const removeDocument = (id) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((doc) => doc.id !== id),
    });
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.title.trim()) {
        toast.error("Please enter a tender title");
        return false;
      }
      if (!formData.description.trim()) {
        toast.error("Please enter a tender description");
        return false;
      }
      if (!formData.category) {
        toast.error("Please select a category");
        return false;
      }
      if (
        !formData.value ||
        isNaN(formData.value) ||
        Number(formData.value) <= 0
      ) {
        toast.error("Please enter a valid tender value");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.publishDate) {
        toast.error("Please select a publish date");
        return false;
      }
      if (!formData.deadline) {
        toast.error("Please select a deadline");
        return false;
      }
      if (new Date(formData.deadline) <= new Date(formData.publishDate)) {
        toast.error("Deadline must be after the publish date");
        return false;
      }
      if (formData.requirements.some((req) => !req.trim())) {
        toast.error("Please fill in all requirements or remove empty ones");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) {
      return;
    }

    // Final validation for contact information
    if (
      !formData.contact.name.trim() ||
      !formData.contact.email.trim() ||
      !formData.contact.phone.trim()
    ) {
      toast.error("Please fill in all contact information fields");
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would handle file uploads here
      // For this demo, we'll just submit the form data without the actual files
      const tenderData = {
        ...formData,
        value: Number(formData.value),
        documents: formData.documents.map(({ id, name, size, uploadedAt }) => ({
          id,
          name,
          size,
          uploadedAt,
        })),
      };

      const newTender = await createTender(tenderData);
      toast.success("Tender created successfully!");
      navigate(`/dashboard/tenders/${newTender.id}`);
    } catch (error) {
      console.error("Error creating tender:", error);
      toast.error("Failed to create tender. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Create New Tender
        </h1>
        <p className="mt-1 text-gray-600">
          Fill in the details to create a new tender
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setStep(1)}
              className={`relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium ${
                step === 1
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>Basic Information</span>
              {step === 1 && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                  aria-hidden="true"
                ></span>
              )}
            </button>
            <button
              onClick={() => validateStep(1) && setStep(2)}
              className={`relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium ${
                step === 2
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>Requirements & Timeline</span>
              {step === 2 && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                  aria-hidden="true"
                ></span>
              )}
            </button>
            <button
              onClick={() => validateStep(2) && setStep(3)}
              className={`relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium ${
                step === 3
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>Documents & Contact</span>
              {step === 3 && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                  aria-hidden="true"
                ></span>
              )}
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tender Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter a descriptive title for the tender"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Provide a detailed description of the tender"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    <option value="Construction">Construction</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="value"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estimated Value ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter the estimated value"
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Initial Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending Approval</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements & Timeline */}
          {step === 2 && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Requirements <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Requirement
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  List all requirements that bidders must meet
                </p>
                <div className="mt-2 space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) =>
                          handleRequirementChange(index, e.target.value)
                        }
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="ml-2 inline-flex items-center rounded-md p-1 text-red-600 hover:bg-red-100"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="publishDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Publish Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="publishDate"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Submission Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info size={20} className="text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Timeline Information
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        The publish date is when the tender will be visible to
                        potential bidders. The submission deadline is the last
                        date for receiving bids.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents & Contact */}
          {step === 3 && (
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Tender Documents
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Upload any relevant documents for the tender
                </p>
                <div className="mt-2">
                  <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, XLS, XLSX up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                {formData.documents.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Uploaded Documents
                    </h4>
                    <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                      {formData.documents.map((doc) => (
                        <li
                          key={doc.id}
                          className="flex items-center justify-between py-3"
                        >
                          <div className="flex items-center">
                            <FileText size={20} className="text-gray-400" />
                            <span className="ml-2 text-sm text-gray-900">
                              {doc.name}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {doc.size}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(doc.id)}
                            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Contact Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Provide contact details for inquiries about this tender
                </p>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact.name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact.name"
                      name="contact.name"
                      value={formData.contact.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact.email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact.email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact.phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact.phone"
                      name="contact.phone"
                      value={formData.contact.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact.department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="contact.department"
                      name="contact.department"
                      value={formData.contact.department}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Department or division"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75"
              >
                {loading ? "Creating..." : "Create Tender"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTender;
