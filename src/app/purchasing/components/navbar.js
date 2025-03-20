"use client";

import { X, User, ChevronDown, User2 } from "lucide-react";
import { Button } from "@/components/ui/atoms/Button";
import { useState } from "react";
import { removeCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Modal } from "@/components/ui/organism/Modal";
import { LogoutConfirm } from "@/components/ui/molecules/Modal/Logout";
import { P } from "@/components/ui/atoms/Text";

export default function Navbar({
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

  return (
    <>
      <div className="p-4 w-full h-[60px] bg-green-800">
        <div className="flex flex-row justify-end space-x-8 pr-[60px]">
          {/* Perbaikan: Gunakan arrow function di dalam onClick */}
          <button onClick={() => setActiveLayout("dashboard")}>
            <P
              className={`text-white ${
                activeLayout === "dashboard" ? "font-bold" : ""
              }`}
            >
              Home
            </P>
          </button>
          <div className="flex items-center gap-1">
            <P className="text-white">Produk</P>
            <ChevronDown className="text-white" />
          </div>
          <button onClick={() => setActiveLayout("keranjang")}>
            <P
              className={`text-white ${
                activeLayout === "keranjang" ? "font-bold" : ""
              }`}
            >
              Keranjang
            </P>
          </button>
          <button onClick={() => setActiveLayout("histori")}>
            <P
              className={`text-white ${
                activeLayout === "histori" ? "font-bold" : ""
              }`}
            >
              Histori
            </P>
          </button>
          <button onClick={() => setShowLogoutModal(true)}>
            <P className={`text-white`}>Logout</P>
          </button>
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
