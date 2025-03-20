"use client";

import { useState, useEffect } from "react";
import { MenuCard } from "../components/Card";
import { getProduk } from "../handler/purchasing";
import { EnumInput, Input } from "@/components/ui/atoms/Input";
import { H2, P } from "@/components/ui/atoms/Text";
import { getCategory } from "@/app/admin/handler/category";

export default function Produk({ setActiveLayout }) {
  const [produkByKategori, setProdukByKategori] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getProduk();
        const data = response.data;

        // Mengelompokkan produk berdasarkan kategori
        const groupedData = data.reduce((acc, item) => {
          const kategori = item.Kategori.Kategori;
          if (!acc[kategori]) acc[kategori] = [];
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredProdukByKategori = Object.entries(produkByKategori).reduce(
    (acc, [kategori, produk]) => {
      if (selectedCategory && kategori !== selectedCategory) {
        return acc; // Skip kategori jika tidak sesuai filter
      }

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
        <EnumInput
          options={[
            { label: "Semua Kategori", value: "" },
            ...categories.map((cat) => ({
              label: cat.Kategori,
              value: cat.Kategori,
            })),
          ]}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-8">
        {loading ? (
          <P>Memuat produk...</P>
        ) : Object.keys(filteredProdukByKategori).length === 0 ? (
          <P className="col-span-4 text-center text-gray-500">
            Produk tidak ditemukan
          </P>
        ) : (
          Object.entries(filteredProdukByKategori).map(([kategori, produk]) => (
            <div key={kategori} className="col-span-4">
              <H2 className="text-xl font-bold mb-4">{kategori}</H2>
              <div className="grid grid-cols-4 gap-8">
                {produk.map((item) => (
                  <MenuCard
                    key={item.id_produk}
                    id_produk={item.id_produk}
                    image={item.foto}
                    price={item.harga}
                    stock={item.stok}
                    name={item.nama}
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
