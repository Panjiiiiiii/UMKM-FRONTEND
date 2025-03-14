"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { deleteBahan, getBahan, selectBahan } from "../handler/bahan";
import { Box, Edit, Trash } from "lucide-react";
import Pagination from "@/components/ui/molecules/Pagination";
import toast from "react-hot-toast";
import Inventory from "../components/inventory";

export default function Dashboard({ setActiveLayout, setEditBahan }) {
  const [bahan, setBahan] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 🔄 Loader state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBahan, setSelectedBahan] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getBahan();
        setBahan(response);
      } catch (error) {
        console.error("Error fetching bahan:", error);
        toast.error("Gagal mengambil data bahan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("State isOpen berubah:", isOpen);
  }, [isOpen]);

  const handleEdit = async (id_bahan) => {
    const bahanData = await selectBahan(id_bahan);
    if (bahanData) {
      setEditBahan(bahanData);
      setActiveLayout("bahan");
    } else {
      toast.error("Gagal mengambil data bahan");
    }
  };

  const handleDelete = async (id_bahan) => {
    if (!confirm("Apakah Anda yakin ingin menghapus bahan ini?")) return;

    const deletePromise = deleteBahan(id_bahan);

    toast.promise(deletePromise, {
      loading: "Menghapus bahan...",
      success: "Bahan berhasil dihapus!",
      error: "Gagal menghapus bahan",
    });

    try {
      const result = await deletePromise;
      if (result) {
        setBahan((prevBahan) =>
          prevBahan.filter((bahan) => bahan.id_bahan !== id_bahan)
        );
      }
    } catch (error) {
      console.error("Gagal menghapus bahan:", error);
    }
  };

  const filteredBahan = bahan.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredBahan.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBahan = filteredBahan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className="mb-4">Bahan</H2>

      {/* 🔍 Search Input */}
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input
          placeholder="Search bahan"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => {
            setEditBahan(null);
            setActiveLayout("bahan");
          }}
        >
          Tambah bahan
        </Button>
      </div>

      {/* 📋 Table Bahan */}
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Bahan</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Satuan</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Skeleton loading
              [...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 text-center animate-pulse"
                >
                  <td className="p-4 bg-gray-200 h-6 rounded"></td>
                  <td className="p-4 bg-gray-200 h-6 rounded"></td>
                  <td className="p-4 bg-gray-200 h-6 rounded"></td>
                  <td className="p-4 bg-gray-200 h-6 rounded"></td>
                </tr>
              ))
            ) : totalItems === 0 ? (
              // Tidak ada data
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  ⚠️ Tidak ada data bahan.
                </td>
              </tr>
            ) : (
              paginatedBahan.map((item) => (
                <tr
                  key={item.id_bahan}
                  className="border border-gray-300 text-center"
                >
                  <td className="p-4">
                    <P>{item.nama}</P>
                  </td>
                  <td className="p-4">
                    <P>{item.stok}</P>
                  </td>
                  <td className="p-4">
                    <P>{item.satuan}</P>
                  </td>
                  <td className="p-4 flex flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      icon={<Box />}
                      onClick={() => {
                        console.log("Sebelum setIsOpen:", isOpen); // Cek sebelum berubah
                        setSelectedBahan(item.id_bahan);
                        setIsOpen(true);
                        console.log("Sesudah setIsOpen:", isOpen);
                      }}
                    />
                    <Button
                      variant="edit"
                      icon={<Edit />}
                      onClick={() => handleEdit(item.id_bahan)}
                    />
                    <Button
                      variant="danger"
                      icon={<Trash />}
                      onClick={() => handleDelete(item.id_bahan)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <Inventory
          key={selectedBahan}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          idBahan={selectedBahan}
        />
      )}

      {/* ⏩ Pagination */}
      {!isLoading && totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* 🔄 Loading Inventory */}

    </div>
  );
}
