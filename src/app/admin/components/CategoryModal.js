import { useState, useEffect } from "react";
import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { Modal } from "@/components/ui/organism/Modal";
import { Save, Send } from "lucide-react";
import { createCategory, updateCategory } from "../handler/category";
import toast from "react-hot-toast";

export default function CategoryModal({ isOpen, onClose, initialData, onSuccess }) {
  const [categoryName, setCategoryName] = useState("");
  const isEditMode = !!initialData;

  useEffect(() => {
    setCategoryName(initialData?.Kategori || "");
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      let response;
      if (isEditMode) {
        response = await updateCategory(initialData.id_kategori, categoryName );
      } else {
        response = await createCategory(categoryName);
      }

      if (response && response.status === "success") {
        toast.success(`Kategori berhasil ${isEditMode ? "diubah" : "ditambahkan"}`);
        onSuccess(response.data, isEditMode); // ✅ Update state kategori langsung
        onClose(); // ✅ Tutup modal
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error(error);
    }
  };

  return (
    <Modal title={isEditMode ? "Edit Kategori" : "Tambah Kategori"} isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {isEditMode ? "Ubah nama kategori" : "Masukkan kategori baru"}
        </label>
        <Input
          placeholder="Nama Kategori"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={handleSubmit}
          icon={isEditMode ? <Save /> : <Send />}
        >
          {isEditMode ? "Simpan Perubahan" : "Kirim"}
        </Button>
      </div>
    </Modal>
  );
}

