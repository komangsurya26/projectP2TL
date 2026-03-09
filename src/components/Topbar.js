"use client";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function Topbar({ title, onMenuClick }) {
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
          {title || "Dashboard"}
        </h1>

        {/* Search - Expandable on desktop, icon only or hidden on very small screens if needed, but let's keep it responsive */}
        <div className="flex items-center gap-2 px-3 py-1.5 md:py-2 bg-gray-100 rounded-full w-full max-w-xs ml-auto sm:ml-4">
          <Search size={16} className="text-gray-400 min-w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none bg-transparent text-sm text-gray-700 outline-none w-full font-sans"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0 whitespace-nowrap">
        {/* Notification */}
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full border-none bg-gray-100 flex items-center justify-center cursor-pointer transition-all hover:bg-gray-200 text-gray-600 hover:text-dark-blue relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 md:gap-3 pl-1 pr-2 md:pr-3 py-1 rounded-full cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
          <div className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-linear-to-br from-electric-blue to-accent flex items-center justify-center text-white font-semibold text-xs md:text-sm">
            AS
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs md:text-sm font-semibold text-dark-blue leading-tight">
              Admin Staff
            </span>
            <span className="text-[10px] md:text-xs text-gray-500 leading-tight">
              Analyst
            </span>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
