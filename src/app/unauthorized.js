"use client";
import { Button } from "@/components/ui/atoms/Button";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <Image
        src='/cookie.png'
        width={300}
        height={300}
        alt="Unauthorized"
      />
      <H2 className="text-green-800 mb-4">
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
