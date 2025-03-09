"use client";

import { useEffect, useState } from "react";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { soldProduk } from "../handler/finance";
import Card from "../components/Card";

export default function Produk({ setActiveLayout }) {
  const [produkByKategori, setProdukByKategori] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await soldProduk();
        const data = response.data;

        // Mengelompokkan produk berdasarkan kategori
        const groupedData = data.reduce((acc, item) => {
          const kategori = item.kategori.Kategori;
          if (!acc[kategori]) {
            acc[kategori] = [];
          }
          acc[kategori].push({
            id: item.id_produk,
            name: item.nama_produk,
            category: item.kategori.Kategori,
            price: item.harga || 0,
            sold: item.total_terjual,
            image: item.foto,
          });
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

  const filteredProdukByKategori = Object.entries(produkByKategori).reduce(
    (acc, [kategori, produk]) => {
      const filteredProduk = produk.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <H1 className="mb-4">Penjualan Produk</H1>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full">
        {loading ? (
          <P className="text-center text-gray-500">Memuat data produk...</P>
        ) : Object.keys(filteredProdukByKategori).length === 0 ? (
          <P className="text-center text-gray-500">Tidak ada produk ditemukan.</P>
        ) : (
          Object.entries(filteredProdukByKategori).map(([kategori, produk]) => (
            <div key={kategori} className="w-full mb-8">
              <H2>{kategori}</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
                {produk.map((product) => (
                  <Card
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    sold={product.sold}
                    price={product.price.toLocaleString("id-ID")}
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
