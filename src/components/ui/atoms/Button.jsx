"use client";
import { cn } from "@/utils/cn";
import { useState } from "react";

export const Button = ({
  variant = "default",
  icon,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2",
        variant === "primary" &&
          "bg-[#3B694E] text-[#F3F4F8] hover:bg-green-800",
        variant === "secondary" &&
          "bg-yellow-300 text-black hover:bg-yellow-400",
        variant === "outline" &&
          "border border-green-600 text-green-600 hover:bg-green-100",
        className
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export const ChangeQuantity = ({ className, value, onChange }) => {
  return (
    <div
      className={`flex items-center justify-start w-fit bg-green-800 text-white rounded-full px-2 py-1 ${className}`}
    >
      <button
        className="px-4 py-2 text-sm font-bold"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        −
      </button>
      <span className="px-2 text-sm font-semibold">{value}</span>
      <button
        className="px-4 py-2 text-sm font-bold"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
};
