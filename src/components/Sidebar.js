"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  Download,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Data", href: "/upload", icon: Upload },
  { label: "Data Analysis", href: "/analysis", icon: BarChart3 },
  { label: "Download Report", href: "/download", icon: Download },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Zap size={22} />
        </div>
        <h2>
          P2TL<span>Analytics</span>
        </h2>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Menu</div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link${pathname === item.href ? " active" : ""}`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div
        style={{
          padding: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
          Analisa TO P2TL
        </div>
        <div
          style={{
            fontSize: "0.6875rem",
            color: "rgba(255,255,255,0.25)",
            marginTop: "0.25rem",
          }}
        >
          © 2026 EPM UID BALI 
        </div>
      </div>
    </aside>
  );
}
