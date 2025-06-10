import React, { useState } from "react";
import { User } from "lucide-react";

const AccountCard = ({ name, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-white shadow-lg p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isOpen ? "border-green-600" : "border-gray-200"
      }`}
      onClick={toggleCard}
    >
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-2 text-green-600">
        <User className="w-5 h-5" />
        Account Details
      </h2>
      <p className="text-sm text-gray-700 mb-2">
        {isOpen ? "Click to hide your information" : "Click to view your information"}
      </p>

      {isOpen && (
        <div className="mt-4 space-y-2">
          <p className="text-gray-800">
            <span className="font-medium">Name:</span> {name}
          </p>
          <p className="text-gray-800">
            <span className="font-medium">Email:</span> {email}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountCard;
