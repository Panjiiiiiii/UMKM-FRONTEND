"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";
import { getProduk, getProdukById, deleteProduk } from "../handler/produk";
import toast from "react-hot-toast";

export default function Dashboard({ setActiveLayout, setEditProduct }) {
  const [cakes, setCake] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProduk();
      console.log(response);
      setCake(response.data);
    };
    fetchData();
  }, []);

  const handleEdit = async (id_produk) => {
    const productData = await getProdukById(id_produk);
    if (productData) {
      setEditProduct(productData.data); // Kirim data ke form edit
      setActiveLayout("produk"); // Pindah ke halaman addProduk
    } else {
      toast.error("Gagal mengambil data produk");
    }
  };

  const handleDelete = async (id_produk) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    const result = await deleteProduk(id_produk);
    if (result) {
      toast.success("Produk berhasil dihapus!");
      setCake((prevCakes) =>
        prevCakes.filter((cake) => cake.id_produk !== id_produk)
      );
    } else {
      toast.error("Gagal menghapus produk");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className={`mb-4`}>Produk</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder={`Search`} />
        <div className="flex flex-row gap-4">
          <Button
            variant="primary"
            children={`Tambah produk`}
            onClick={() => setActiveLayout("produk")}
          />
        </div>
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Stok</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cakes.map((cake) => (
              <tr
                key={cake.id_produk}
                className="border border-gray-300 text-center"
              >
                <td className="p-4">
                  <P>{cake.nama}</P>
                </td>
                <td className="p-4">
                  <P>{cake.Kategori.Kategori}</P>
                </td>
                <td className="p-4">
                  <P>{cake.stok}</P>
                </td>
                <td className="p-4">
                  <P>{`Rp ${cake.harga}`}</P>
                </td>
                <td className="p-4 flex flex-row gap-4 justify-center">
                  <Button
                    variant="edit"
                    icon={<Edit />}
                    onClick={() => handleEdit(cake.id_produk)}
                  />
                  <Button
                    variant="danger"
                    icon={<Trash />}
                    onClick={() => handleDelete(cake.id_produk)}
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
