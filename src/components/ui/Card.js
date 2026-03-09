import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  action = null,
  ...props
}) {
  return (
    <div
      className={`px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex items-center justify-between gap-4 ${className}`}
      {...props}
    >
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  subtitle = null,
  ...props
}) {
  return (
    <div>
      <h3
        className={`text-base sm:text-lg font-semibold text-dark-blue ${className}`}
        {...props}
      >
        {children}
      </h3>
      {subtitle && (
        <span className="text-xs sm:text-sm text-gray-500 mt-0.5 block">
          {subtitle}
        </span>
      )}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
