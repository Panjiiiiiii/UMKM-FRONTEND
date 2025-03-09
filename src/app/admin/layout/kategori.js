"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useState, useEffect } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { deleteCategory, getCategory } from "../handler/category";
import { Edit, Trash } from "lucide-react";
import CategoryModal from "../components/CategoryModal";
import toast from "react-hot-toast";
import Pagination from "@/components/ui/molecules/Pagination";

export default function Kategori() {
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // ✅ Tambahkan state untuk loading
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // ✅ Aktifkan loading sebelum fetch
      try {
        const response = await getCategory();
        setCategory(response.data);
      } catch (error) {
        toast.error("Gagal mengambil data kategori!");
      } finally {
        setIsLoading(false); // ✅ Matikan loading setelah fetch selesai
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = (updatedCategory, isEdit) => {
    setCategory((prev) => {
      if (isEdit) {
        return prev.map((c) =>
          c.id_kategori === updatedCategory.id_kategori ? updatedCategory : c
        );
      }
      return [...prev, updatedCategory];
    });
  };

  const handleDelete = async (id_kategori) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    toast.promise(deleteCategory(id_kategori), {
      loading: "Menghapus kategori...",
      success: "Kategori berhasil dihapus!",
      error: "Gagal menghapus kategori!",
    });

    try {
      await deleteCategory(id_kategori);
      setCategory((prev) => prev.filter((c) => c.id_kategori !== id_kategori));
    } catch (error) {
      console.error("Gagal menghapus kategori:", error);
    }
  };

  const totalItems = category.length;
  const paginatedCategories = category.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className="mb-4">Kategori</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder="Search" />
        <div className="flex flex-row gap-4">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Tambah Kategori
          </Button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-4">Nama kategori</th>
            <th className="p-4">Jumlah Produk</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                <P>Loading data...</P>
              </td>
            </tr>
          ) : paginatedCategories.length > 0 ? (
            paginatedCategories.map((item) => (
              <tr
                key={item.id_kategori}
                className="border border-gray-300 text-center"
              >
                <td className="p-4"><P>{item.Kategori}</P></td>
                <td className="p-4"><P>{item._count?.Produk ?? 0}</P></td>
                <td className="p-4 flex flex-row gap-4 justify-center">
                  <Button
                    variant="edit"
                    icon={<Edit />}
                    onClick={() => handleOpenModal(item)}
                  />
                  <Button
                    variant="danger"
                    icon={<Trash />}
                    onClick={() => handleDelete(item.id_kategori)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                Tidak ada kategori tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedCategory}
          onSuccess={handleUpdateCategory} // ✅ Kirim callback untuk update kategori
        />
      )}
    </div>
  );
}
