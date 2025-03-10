"use client";
import { Button } from "@/components/ui/atoms/Button";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import { ArrowLeft, DoorOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8 bg-white">
      <Image src="/cookie.png" width={300} height={300} alt="Unauthorized" />
      <H2 className="text-green-800">Halaman Tidak ditemukan</H2>
      <Button
        onClick={() => handleGoHome()}
        icon={<ArrowLeft />}
        children={`Kembali ke halaman login`}
        variant="primary"
      />
    </div>
  );
}
