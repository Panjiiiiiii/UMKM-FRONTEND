"use client";

import { useState } from "react";
import { LoginForm } from "@/components/ui/molecules/Modal/Login";
import { PasswordForm } from "@/components/ui/molecules/Modal/Password";
import { Modal } from "@/components/ui/organism/Modal";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  // Tambahkan fungsi untuk menangani login berhasil
  const handleLoginSuccess = (result) => {
    console.log("Login berhasil:", result);
    router.push("/dashboard"); // Ganti dengan halaman tujuan setelah login sukses
  };

  return (
    <div className="h-screen"
      style={{
        backgroundImage: "url('/cookies-bg.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <Toaster />
      <Modal title={isForgotPassword ? "Forgot Password" : "Login User"} isOpen={true} hideClose>
        {isForgotPassword ? (
          <PasswordForm />
        ) : (
          <LoginForm onSubmit={handleLoginSuccess} onForgotPassword={handleForgotPassword} />
        )}
      </Modal>
    </div>
  );
}
