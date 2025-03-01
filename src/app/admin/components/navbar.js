"use client";

import { X, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/atoms/Button";
import { removeCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SidebarOverlay({
  isOpen,
  setIsOpen,
  setActiveLayout,
  activeLayout,
}) {
  if (!isOpen) return null;
  // const router = useRouter();
  // const handlerLogOut = () => {
  //   removeCookie("token");
  //   toast.success("Logout berhasil")
  //   router.push("/");
  // };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 z-50 translate-x-0"
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
              className={`w-full ${
                activeLayout === "kategori"
                  ? "bg-green-800 text-white"
                  : "text-green-800 bg-transparent hover:bg-green-100"
              }`}
              onClick={() => {
                setActiveLayout("kategori");
                setIsOpen(false);
              }}
            >
              Kategori
            </Button>
            <Button
              className={`w-full ${
                activeLayout === "user"
                  ? "bg-green-800 text-white"
                  : "text-green-800 bg-transparent hover:bg-green-100"
              }`}
              onClick={() => {
                setActiveLayout("user");
                setIsOpen(false);
              }}
            >
              User
            </Button>
          </nav>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 border-green-800 text-green-800"
              icon={<User />}
              children={`Logout`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
