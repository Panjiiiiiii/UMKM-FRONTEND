"use client";
import Dashboard from "./layout/dashboard";
import { useState } from "react";
import Bahan from "./layout/addBahan";
import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import SidebarOverlay from "./components/navbar";

export default function Page({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState("dashboard");

  const renderLayout = () => {
    switch (activeLayout) {
      case "dashboard":
        return <Dashboard setActiveLayout={setActiveLayout} />;
      case "bahan":
        return <Bahan setActiveLayout={setActiveLayout} />;
      default:
        return <Dashboard setActiveLayout={setActiveLayout} />;
    }
  };
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        <Toaster position="top-right" />
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
    </>
  );
}
