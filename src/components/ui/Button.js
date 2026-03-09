import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-lg font-semibold font-sans cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed justify-center";

  const variants = {
    primary:
      "bg-gradient-to-br from-electric-blue to-[#1976D2] text-white border-none hover:-translate-y-0.5 hover:shadow-lg hover:shadow-electric-blue/30 disabled:hover:translate-y-0 disabled:hover:shadow-none",
    secondary:
      "bg-white text-gray-700 border-[1.5px] border-gray-200 hover:border-gray-300 hover:bg-gray-50",
    ghost:
      "bg-transparent border-none text-gray-500 hover:bg-gray-100 hover:text-dark-blue",
    success:
      "bg-gradient-to-br from-success to-[#059669] text-white border-none hover:-translate-y-0.5 hover:shadow-lg hover:shadow-success/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "w-10 h-10 p-0 rounded-full",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
