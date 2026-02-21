import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <div className="w-full border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 shadow-sm">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <h1 className="text-base md:text-lg font-semibold text-gray-800">Analytics</h1>
        </div>

        <button
          onClick={handleLogout}
          className="hidden md:flex px-4 py-2 rounded-lg bg-red-500 text-white hover:opacity-95 shadow transition"
        >
          Logout
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-gray-700 hover:bg-gray-200 rounded-lg transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:opacity-95 shadow transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;