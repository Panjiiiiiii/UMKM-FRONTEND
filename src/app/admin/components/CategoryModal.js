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
    if (!categoryName.trim()) {
      toast.error("Nama kategori tidak boleh kosong!");
      return;
    }

    const submitPromise = isEditMode
      ? updateCategory(initialData.id_kategori, categoryName)
      : createCategory(categoryName);

    toast.promise(submitPromise, {
      loading: isEditMode ? "Menyimpan perubahan..." : "Menambahkan kategori...",
      success: isEditMode ? "Kategori berhasil diperbarui!" : "Kategori berhasil ditambahkan!",
      error: "Terjadi kesalahan! Coba lagi.",
    });

    try {
      const response = await submitPromise;
      if (response && response.status === "success") {
        onSuccess(response.data, isEditMode); // ✅ Update kategori di state
        onClose(); // ✅ Tutup modal setelah sukses
      }
    } catch (error) {
      console.error("Gagal menyimpan kategori:", error);
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
