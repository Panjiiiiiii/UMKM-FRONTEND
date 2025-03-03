"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/atoms/Input";
import { MenuCard } from "@/app/purchasing/components/Card";
import { getProduk } from "../handler/purchasing";
import { H2 } from "@/components/ui/atoms/Text";

export default function Dashboard({ setActiveLayout }) {
  const [produkByKategori, setProdukByKategori] = useState({});

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

  return (
    <div className="flex flex-col w-full h-full items-center p-12">
      {/* Input Search di atas */}
      <div className="w-full max-w-screen-lg px-4 mb-8">
        <Input type="text" placeholder="Search" className="w-full" />
      </div>

      {/* Grid container untuk kategori dan MenuCard */}
      <div className="flex w-full justify-center">
        {Object.entries(produkByKategori).map(([kategori, produk]) => (
          <div key={kategori}>
            {/* Judul kategori */}
            <H2>{kategori}</H2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {produk.map((menu) => (
                <MenuCard
                  key={menu.id_produk}
                  id_produk={menu.id_produk}
                  image={menu.foto}
                  name={menu.nama}
                  stock={menu.stok}
                  price={menu.harga}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
