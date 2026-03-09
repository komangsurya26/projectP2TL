import React from "react";

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap";

  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-electric-blue/10 text-electric-blue",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
  };

  const dotColors = {
    default: "bg-gray-500",
    primary: "bg-electric-blue",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}></span>
      {children}
    </span>
  );
}
