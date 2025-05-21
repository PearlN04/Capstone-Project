import React from "react";
function SystemAdminDash() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-400 to-pink-300 py-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-white">MyAdvisor by UCT</h1>
          <div className="flex items-center">
            <span className="text-white mr-4">Welcome, System Admin!</span>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Dashboard</h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add new user */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-pink-100 transition duration-300">
            <h3 className="text-xl font-bold text-blue-600 mb-4">
              Appointments
            </h3>
            <p className="text-gray-700 mb-4">Add a new user to the System</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Continue
            </button>
          </div>

          {/* View Student Advisors */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-blue-100 transition duration-300">
            <h3 className="text-xl font-bold text-pink-500 mb-4">
              Remove users
            </h3>
            <p className="text-gray-700 mb-4">
              Remove a specific user from the system
            </p>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-lg">
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default SystemAdminDash;
