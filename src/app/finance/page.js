"use client";

import { useState } from "react";
import Dashboard from "./layout/dashboard";
import History from "./layout/history";
import Produk from "./layout/product";
import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import SidebarOverlay from "./components/navbar";
import ProtectedRoutes from "@/auth/ProtectRoutes";

export default function financePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState("dashboard");

  const renderLayout = () => {
    switch (activeLayout) {
      case "dashboard":
        return <Dashboard setActiveLayout={setActiveLayout} />;
      case "history":
        return <History setActiveLayout={setActiveLayout} />;
      case "produk":
        return <Produk setActiveLayout={setActiveLayout} />;
      default:
        return <Dashboard setActiveLayout={setActiveLayout} />;
    }
  };

  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        <ProtectedRoutes expectedRole={"FINANCE"}>
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
        </ProtectedRoutes>
      </div>
    </>
  );
}
