"use client";

import { useState } from "react";
import SidebarOverlay from "./components/navbar";
import Dashboard from "./layout/dashboard";
import User from "./layout/user";
import Produk from "./layout/produk";
import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState("dashboard");

  // Fungsi untuk memilih layout
  const renderLayout = () => {
    switch (activeLayout) {
      case "dashboard":
        return <Dashboard setActiveLayout={setActiveLayout} />;
      case "produk":
        return <Produk setActiveLayout={setActiveLayout} />;
      case "user":
        return <User setActiveLayout={setActiveLayout} />;
      default:
        return <Dashboard setActiveLayout={setActiveLayout} />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden p-4">
      <Toaster position="top-right"/>
      <header className="fixed p-8 z-50">
        <Button
          icon={<GiHamburgerMenu />}
          variant="primary"
          className="rounded-md p-4"
          onClick={() => setIsOpen(true)}
        />
      </header>

      {isOpen && (
        <SidebarOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setActiveLayout={setActiveLayout}
          activeLayout={activeLayout} // Kirim activeLayout ke Sidebar
        />
      )}

      <main className="mt-20">{renderLayout()}</main>
    </div>
  );
}
