"use client";

import { useState } from "react";
import SidebarOverlay from "./components/navbar";
import Dashboard from "./layout/dashboard";
import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import History from "./layout/history";
import ProtectedRoutes from "@/auth/ProtectRoutes";
import Navbar from "./components/navbar";
import Keranjang from "./layout/keranjang";
import Produk from "./layout/produk";

export default function purchasingPage({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState("dashboard");

  const renderLayout = () => {
    switch (activeLayout) {
      case "dashboard":
        return <Dashboard setActiveLayout={setActiveLayout} />;
      case "histori":
        return <History setActiveLayout={setActiveLayout} />;
      case "produk":
        return <Produk setActiveLayout={setActiveLayout} />;
      case "keranjang":
        return <Keranjang setActiveLayout={setActiveLayout} />;
      default:
        return <Dashboard setActiveLayout={setActiveLayout} />;
    }
  };
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        <ProtectedRoutes expectedRole={"PURCHASING"}>
          <Toaster position="top-right" />
          {/* <header className="fixed p-8 z-50">
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
          )} */}
          <header>
            <Navbar
              activeLayout={activeLayout}
              setActiveLayout={setActiveLayout}
            />
          </header>
          <main>{renderLayout()}</main>
        </ProtectedRoutes>
      </div>
    </>
  );
}
