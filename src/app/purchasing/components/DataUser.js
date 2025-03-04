import { useState } from "react";
import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { Modal } from "@/components/ui/organism/Modal";
import { Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function UserModal({ isOpen, setIsOpen, onSubmit }) {
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");

  const handleSubmit = () => {
    try {
      if (!nama || !telepon) return toast.error("Data tidak boleh kosong");

      onSubmit({
        Nama_pelanggan: nama,
        Nomor_telepon: telepon,
      });

      setIsOpen(false); // Tutup modal setelah submit
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster />
      <Modal
        title={`Masukkan data User`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <Input
            label={`Nama pelanggan`}
            placeholder={`Masukkan nama pelanggan`}
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <Input
            label={`Nomor telepon`}
            placeholder={`Masukkkan nomor telepon`}
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
          />
          <Button
            variant="primary"
            fullWidth
            icon={<Send />}
            children={`Submit`}
            onClick={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
}
