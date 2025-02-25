"use client";

import { useState } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/atoms/Button";

export default function SidebarOverlay({ isOpen, setIsOpen }) { // Accept props
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 flex flex-col h-full">
            <button onClick={() => setIsOpen(false)} className="self-end p-2">
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <nav className="mt-4 flex flex-col space-y-4">
              <Button className="bg-green-800 text-white w-full">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-green-800">
                Keranjang
              </Button>
              <Button variant="ghost" className="text-green-800">
                Histori
              </Button>
            </nav>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 border-green-800 text-green-800"
              >
                <User className="w-5 h-5" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
