import { EnumInput, Input } from "@/components/ui/atoms/Input";
import { Modal } from "@/components/ui/organism/Modal";
import { Button } from "@/components/ui/atoms/Button";
import { useState } from "react";
import { addInventory } from "../handler/bahan";
import toast from "react-hot-toast";

export default function Inventory({ isOpen, onClose, idBahan }) {
  const [loading, setLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState({
    qty: 0,
    status: "LOADING_IN",
  });

  const handleSubmit = async () => {
    if (!inventoryData.qty || !inventoryData.status) {
      toast.error("Mohon isi jumlah dan status barang!");
      return;
    }
    const promise = addInventory(idBahan, inventoryData);

    toast.promise(promise, {
      loading: "Memperbarui Inventori...",
      success: "Berhasil memperbarui inventori!",
      error: "Gagal memperbarui inventori!",
    });

    try {
      await promise;
      window.location.reload();
      onClose()
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Modal title={`Tambah Inventori`} isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <Input
          type="number"
          label="Jumlah Barang"
          value={inventoryData.qty}
          onChange={(e) =>
            setInventoryData({ ...inventoryData, qty: Number(e.target.value) })
          }
        />
        <EnumInput
          label="Status"
          value={inventoryData.status}
          onChange={(e) =>
            setInventoryData({ ...inventoryData, status: e.target.value })
          }
          options={[
            { value: "", label: "Pilih Status Barang" },
            { value: "LOADING_IN", label: "LOADING_IN" },
            { value: "LOADING_OUT", label: "LOADING_OUT" },
          ]}
        />
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
