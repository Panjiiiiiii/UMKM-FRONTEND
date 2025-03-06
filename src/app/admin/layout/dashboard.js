"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";
import { getProduk, getProdukById, deleteProduk } from "../handler/produk";
import toast from "react-hot-toast";
import Card from "../components/Card";

export default function Dashboard({ setActiveLayout, setEditProduct }) {
  const [produkByKategori, setProdukByKategori] = useState({});
  const [cakes, setCake] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProduk();
      const data = response.data;

      // Mengelompokkan produk berdasarkan kategori
      const groupedData = data.reduce((acc, item) => {
        const kategori = item.Kategori.Kategori;
        if (!acc[kategori]) {
          acc[kategori] = [];
        }
        acc[kategori].push(item);
        return acc;
      }, {});

      setProdukByKategori(groupedData);
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
        <div className="flex w-full justify-center">
          {Object.entries(produkByKategori).map(([kategori, produk]) => (
            <div key={kategori}>
              {/* Judul kategori */}
              <H2>{kategori}</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {produk.map((menu) => (
                  <Card
                    key={menu.id_produk}
                    id_produk={menu.id_produk}
                    image={menu.foto}
                    name={menu.nama}
                    stock={menu.stok}
                    price={menu.harga}
                    setEditProduct={setEditProduct}
                    setActiveLayout={setActiveLayout}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
