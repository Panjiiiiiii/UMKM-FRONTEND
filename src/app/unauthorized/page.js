"use client";
import { Button } from "@/components/ui/atoms/Button";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function unauthorized() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen bg-white">
      <Image
        src='/cookie.png'
        width={300}
        height={300}
        alt="Unauthorized"
      />
      <H2 className="text-green-800">
        Anda tidak bisa mengakses halaman ini
      </H2>
      <Button
        onClick={() => handleGoHome()}
        children={`Kembali ke halaman login`}
        variant="primary"
      />
    </div>
  );
}
