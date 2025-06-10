import React, { useState } from 'react';
import { User, Settings, ChevronDown } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user } = useUser();
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Your Profile
      </h1>

      {/* Welcome Box */}
      {user && (
        <div className="mx-auto mb-8 w-full max-w-xl bg-white border border-blue-200 shadow-md rounded-2xl p-6 text-center">
          <div className="text-gray-500 text-sm mb-1">Welcome</div>
          <div className="text-blue-700 text-xl font-semibold">{fullName}</div>
        </div>
      )}

      <p className="text-gray-600 text-center mb-6">
        Manage your account details and preferences.
      </p>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Account Details Card */}
        <div className="bg-white rounded-2xl border shadow-md transition-all duration-300 w-full">
          <div
            onClick={() => setShowAccountDetails((prev) => !prev)}
            className="p-5 cursor-pointer flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
                <User className="w-5 h-5" />
                Account Details
              </h2>
              <p className="text-sm text-gray-700">
                View and update your personal information.
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                showAccountDetails ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Collapsible Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showAccountDetails ? 'max-h-[500px] px-5 pb-4' : 'max-h-0 px-5'
            }`}
          >
            {showAccountDetails && (
              <div className="bg-blue-50 border rounded-xl p-4 mt-2 space-y-2">
                <div>
                  <span className="font-medium text-gray-600">Name: </span>
                  <span className="text-gray-800">{fullName}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-2xl border shadow-md transition-all duration-300 w-full">
          <div className="p-5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-yellow-600">
                <Settings className="w-5 h-5" />
                Settings
              </h2>
              <p className="text-sm text-gray-700">
                Customize your experience and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
