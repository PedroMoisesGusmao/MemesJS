"use client";

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  variant?: "outline" | "default";
  children: React.ReactNode;
}

export default function Button({ onClick, variant = "default", children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === "outline" ? "border border-white text-white" : "bg-blue-500 text-white"
      }`}
    >
      {children}
    </button>
  );
}