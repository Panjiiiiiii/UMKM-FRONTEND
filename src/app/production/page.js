"use client";
import Dashboard from "./layout/dashboard";
import { useState } from "react";
import Bahan from "./layout/addBahan";
import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import SidebarOverlay from "./components/navbar";
import ProtectedRoutes from "@/auth/ProtectRoutes";
import Inventori from "./layout/inventori";

export default function Page({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState("dashboard");
  const [editBahan, setEditBahan] = useState(null);
  const renderLayout = () => {
    switch (activeLayout) {
      case "dashboard":
        return (
          <Dashboard
            setActiveLayout={setActiveLayout}
            setEditBahan={setEditBahan}
          />
        );
      case "bahan":
        return (
          <Bahan
            editBahan={editBahan}
            setActiveLayout={setActiveLayout}
            setEditBahan={setEditBahan}
          />
        );
      case "inventori" : 
      return (
        <Inventori
          setActiveLayout={setActiveLayout}
        />
      )
      default:
        return <Dashboard setActiveLayout={setActiveLayout} />;
    }
  };
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        <ProtectedRoutes expectedRole={"PRODUCTION"}>
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
