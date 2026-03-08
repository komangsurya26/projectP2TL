"use client";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ title }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{title || "Dashboard"}</h1>
      </div>
      <div className="topbar-right">
        <div className="topbar-search">
          <Search size={18} />
          <input type="text" placeholder="Search customers, reports..." />
        </div>
        <button className="topbar-icon-btn">
          <Bell size={18} />
          <span className="notification-badge"></span>
        </button>
        <div className="topbar-avatar">
          <div className="topbar-avatar-img">AS</div>
          <div className="topbar-avatar-info">
            <span className="topbar-avatar-name">Admin Staff</span>
            <span className="topbar-avatar-role">Analyst</span>
          </div>
          <ChevronDown size={14} style={{ color: "var(--color-gray-400)" }} />
        </div>
      </div>
    </header>
  );
}
