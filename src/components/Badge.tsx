import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple";
  size?: "sm" | "md";
}

const variantClasses = {
  default: "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300",
  success: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
  error: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400",
  info: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
  purple: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400",
};

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", size = "sm" }) => {
  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${variantClasses[variant]} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
