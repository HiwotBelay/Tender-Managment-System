import React from "react";
import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Branding and info */}
      <div className="hidden w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 lg:block">
        <div className="flex h-full flex-col items-center justify-center px-12 text-white">
          <div className="mb-8 flex items-center">
            <div className="h-12 w-12 rounded-md bg-white flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">TM</span>
            </div>
            <h1 className="ml-4 text-3xl font-bold">TenderMap</h1>
          </div>
          <h2 className="mb-6 text-center text-3xl font-bold">
            Streamline Your Tendering Process
          </h2>
          <p className="mb-8 text-center text-lg">
            Digitalize your tender management workflow with our comprehensive
            platform. Create, manage, and track tenders with ease.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-blue-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Efficient Tender Creation</h3>
                <p className="text-blue-100">
                  Create and publish tenders with our intuitive interface
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-blue-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Transparent Bid Management</h3>
                <p className="text-blue-100">
                  Receive and evaluate bids with complete transparency
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-blue-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Comprehensive Analytics</h3>
                <p className="text-blue-100">
                  Gain insights with detailed reporting and analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-6 py-8">
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto h-12 w-12 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">TM</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              TenderMap
            </h1>
            <p className="mt-2 text-gray-600">
              Streamline Your Tendering Process
            </p>
          </div>

          <Outlet />

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2023 TenderMap. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
