"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { deleteBahan, getBahan, selectBahan } from "../handler/bahan";
import { Edit, Trash } from "lucide-react";
import Pagination from "@/components/ui/molecules/Pagination";

export default function Dashboard({ setActiveLayout, setEditBahan }) {
  const [bahan, setBahan] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 State untuk pencarian
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 🛠 Atur jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBahan();
      setBahan(response);
    };
    fetchData();
  }, []);

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
    const result = await deleteBahan(id_bahan);
    if (result) {
      toast.success("Bahan berhasil dihapus!");
      setBahan((prevBahan) => prevBahan.filter((bahan) => bahan.id_bahan !== id_bahan));
    } else {
      toast.error("Gagal menghapus bahan");
    }
  };

  // 🔍 Filter berdasarkan searchQuery
  const filteredBahan = bahan.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📌 Pagination
  const totalItems = filteredBahan.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBahan = filteredBahan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ⏩ Fungsi ganti halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 🔄 Reset pagination saat searchQuery berubah
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
            {paginatedBahan.map((item) => (
              <tr key={item.id_bahan} className="border border-gray-300 text-center">
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
                  <Button variant="edit" icon={<Edit />} onClick={() => handleEdit(item.id_bahan)} />
                  <Button
                    variant="danger"
                    icon={<Trash />}
                    onClick={() => handleDelete(item.id_bahan)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ⏩ Pagination */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
