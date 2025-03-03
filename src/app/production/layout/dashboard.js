"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { deleteBahan, getBahan, selectBahan } from "../handler/bahan";
import { Edit, Trash } from "lucide-react";

export default function Dashboard({ setActiveLayout, setEditBahan }) {
  const [bahan, setBahan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBahan();
      console.log(response);
      setBahan(response);
    };
    fetchData();
  }, []);

  const handleEdit = async (id_bahan) => {
    const bahanData = await selectBahan(id_bahan);
    if (bahanData) {
      console.log(bahanData);
      setEditBahan(bahanData); // Kirim data ke form edit
      setActiveLayout("bahan"); // Pindah ke halaman addBahan
    } else {
      toast.error("Gagal mengambil data bahan");
    }
  };

  // Data Dummy

  const handleDelete = async (id_bahan) => {
    if (!confirm("Apakah Anda yakin ingin menghapus bahan ini?")) return;
    const result = await deleteBahan(id_bahan);
    if (result) {
      toast.success("Bahan berhasil dihapus!");
      setBahan((prevBahan) =>
        prevBahan.filter((bahan) => bahan.id_bahan !== id_bahan)
      );
    } else {
      toast.error("Gagal menghapus bahan");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className={`mb-4`}>Bahan</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder={`Search`} />
        <Button
          variant="primary"
          children={`Tambah bahan`}
          onClick={() => {
            setEditBahan(null); // Reset editBahan sebelum menambah bahan baru
            setActiveLayout("bahan");
          }}
        />
      </div>
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
            {bahan.map((bahan) => (
              <tr
                key={bahan.id_bahan}
                className="border border-gray-300 text-center"
              >
                <td className="p-4">
                  <P>{bahan.nama}</P>
                </td>
                <td className="p-4">
                  <P>{bahan.stok}</P>
                </td>
                <td className="p-4">
                  <P>{bahan.satuan}</P>
                </td>
                <td className="p-4 flex flex-row gap-4 justify-center">
                  <Button
                    variant="edit"
                    icon={<Edit />}
                    onClick={() => handleEdit(bahan.id_bahan)}
                  />
                  <Button
                    variant="danger"
                    icon={<Trash />}
                    onClick={() => handleDelete(bahan.id_bahan)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
