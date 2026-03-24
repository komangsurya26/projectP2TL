"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  Settings,
  User,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar({ user, onMenuClick, onLogout }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white/95 border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-30 backdrop-blur-sm gap-2">
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 hover:text-dark-blue bg-transparent border-none cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-dark-blue truncate hidden sm:block">
          Selamat Datang, {user?.name}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0 whitespace-nowrap">
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full border-none bg-gray-100 flex items-center justify-center cursor-pointer transition-all hover:bg-gray-200 text-gray-600 hover:text-dark-blue relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
        </button>

        {/* Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 md:gap-3 pl-1 pr-2 md:pr-3 py-1 rounded-full cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-linear-to-br from-electric-blue to-accent flex items-center justify-center text-white font-semibold text-xs md:text-sm">
              {user?.name?.charAt(0).toUpperCase() +
                user?.name?.charAt(1).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs md:text-sm font-semibold text-dark-blue leading-tight">
                {user?.name}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 leading-tight">
                {user?.role}
              </span>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/settings");
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/settings");
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <Settings size={16} /> Settings
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/settings");
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <HelpCircle size={16} /> Help
              </button>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
