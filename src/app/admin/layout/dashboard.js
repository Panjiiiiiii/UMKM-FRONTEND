"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { getProduk, getProdukById, deleteProduk } from "../handler/produk";
import toast from "react-hot-toast";
import Card from "../components/Card";

export default function Dashboard({ setActiveLayout, setEditProduct }) {
  const [produkByKategori, setProdukByKategori] = useState({});
  const [cakes, setCake] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id_produk) => {
    const productData = await getProdukById(id_produk);
    if (productData) {
      setEditProduct(productData.data);
      setActiveLayout("produk");
    } else {
      toast.error("Gagal mengambil data produk");
    }
  };

  const handleDelete = async (id_produk) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    const deletePromise = deleteProduk(id_produk);

    toast.promise(deletePromise, {
      loading: "Menghapus produk...",
      success: "Produk berhasil dihapus!",
      error: "Gagal menghapus produk",
    });

    try {
      await deletePromise;
      window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  const filteredProdukByKategori = Object.entries(produkByKategori).reduce(
    (acc, [kategori, produk]) => {
      const filteredProduk = produk.filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredProduk.length > 0) {
        acc[kategori] = filteredProduk;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex flex-row justify-between items-center gap-12 mb-8 mt-4">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-row gap-4">
          <Button variant="primary" onClick={() => setActiveLayout("produk")}>
            Tambah produk
          </Button>
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <P className="text-center text-gray-500">Memuat data produk...</P>
        ) : Object.keys(filteredProdukByKategori).length === 0 ? (
          <P className="text-center text-gray-500">
            Tidak ada produk ditemukan.
          </P>
        ) : (
          Object.entries(filteredProdukByKategori).map(([kategori, produk]) => (
            <div key={kategori} className="w-full mb-8">
              <H2>{kategori}</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
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
                    onDelete={handleDelete}
                    setCake={setCake} // Teruskan setCake sebagai prop
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
