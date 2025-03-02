"use client";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/atoms/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SidebarOverlay({
  isOpen,
  setIsOpen,
  setActiveLayout,
  activeLayout,
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token");
    toast.success("Logout berhasil");
    router.push("/");
  };

  // Accept props
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 z-40 translate-x-0`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col h-full">
            <button onClick={() => setIsOpen(false)} className="self-end p-2">
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <nav className="mt-4 flex flex-col space-y-4">
              <Button
                className={`w-full ${
                  activeLayout === "dashboard"
                    ? "bg-green-800 text-white"
                    : "text-green-800 bg-transparent hover:bg-green-100"
                }`}
                onClick={() => {
                  setActiveLayout("dashboard");
                  setIsOpen(false);
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  activeLayout === "kategori"
                    ? "bg-green-800 text-white"
                    : "text-green-800 bg-transparent hover:bg-green-100"
                }`}
                onClick={() => {
                  setActiveLayout("bahan");
                  setIsOpen(false);
                }}
              >
                Tambah Bahan
              </Button>
            </nav>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 border-green-800 text-green-800"
                icon={<User />}
                children={`Logout`}
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <Modal
          title="Logout Confirmation"
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        >
          <LogoutConfirm
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
