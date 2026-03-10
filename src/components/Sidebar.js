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
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Data", href: "/upload", icon: Upload },
  {
    label: "Data Analysis",
    href: "/data-analysis",
    icon: BarChart3,
    subItems: [
      { label: "AMI", href: "/data-analysis/ami" },
      { label: "AMR", href: "/data-analysis/amr" },
      { label: "Non-AMR", href: "/data-analysis/non-amr" },
      { label: "Prabayar", href: "/data-analysis/prabayar" },
    ],
  },
  { label: "Download Report", href: "/download", icon: Download },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark-blue/50 z-40 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-dark-blue text-white flex flex-col fixed top-0 left-0 bottom-0 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/8 min-h-[70px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 min-w-10 bg-linear-to-br from-electric-blue to-accent rounded-lg flex items-center justify-center">
              <Zap size={22} className="text-white" />
            </div>
            <h2 className="text-lg font-bold whitespace-nowrap">
              P2TL<span className="text-accent">Analytics</span>
            </h2>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-white/50 hover:text-white bg-transparent border-none p-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/35 px-6 pt-4 pb-2">
            Menu
          </div>
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.subItems && pathname.startsWith(item.href));
            return (
              <div key={item.label}>
                <Link
                  href={
                    item.href === "/data-analysis"
                      ? "/data-analysis/ami"
                      : item.href
                  }
                  onClick={() => {
                    if (window.innerWidth < 768 && !item.subItems) onClose();
                  }}
                  className={`flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all relative no-underline
                    ${
                      active
                        ? 'text-white bg-electric-blue/15 before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[60%] before:bg-electric-blue before:rounded-r'
                        : "text-white/60 hover:text-white hover:bg-white/6"
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
                {/* Sub-menu styling for Data Analysis */}
                {item.subItems && active && (
                  <div className="flex flex-col mt-1 mb-2 bg-dark-blue-light/30">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => {
                          if (window.innerWidth < 768) onClose();
                        }}
                        className={`pl-14 pr-6 py-2 text-sm transition-all relative no-underline ${pathname === sub.href ? "text-electric-blue font-medium" : "text-white/50 hover:text-white/80"}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/8">
          <div className="text-xs text-white/35">Analisa TO P2TL</div>
          <div className="text-[0.6875rem] text-white/25 mt-1">
            © 2026 EPM UID BALI
          </div>
        </div>
      </aside>
    </>
  );
}
