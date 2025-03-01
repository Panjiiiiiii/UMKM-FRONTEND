import { useState, useEffect } from "react";
import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { Modal } from "@/components/ui/organism/Modal";
import { Save, Send } from "lucide-react";
import { createCategory, updateCategory } from "../handler/category";
import toast from "react-hot-toast";

export default function CategoryModal({ isOpen, onClose, initialData }) {
  const [categoryName, setCategoryName] = useState("");
  const isEditMode = !!initialData; // Jika ada data awal, mode edit

  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.Kategori); // Isi input jika mode edit
    } else {
      setCategoryName(""); // Reset jika tambah kategori
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (isEditMode) {
      try {
        const response = await updateCategory(initialData.id, categoryName);
        if(response.status === "success") {
          toast.success("Kategori berhasil diubah");
        }
      } catch (error) {
        toast.error("Internal server error");
        console.log(error);
      }
    } else {
      try {
        const response = await createCategory(categoryName);
        console.log(response);
        if(response.status === "success") {
          toast.success("Kategori berhasil ditambahkan");
        }
      } catch (error) {
        toast.error("Internal server error");
        console.log(error);
      }
    }
    onClose(); // Tutup modal setelah submit
  };

  return (
    <Modal
      title={isEditMode ? "Edit Kategori" : "Tambah Kategori"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
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
