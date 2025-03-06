"use client";

import { useEffect, useState } from "react";
import { H2 } from "@/components/ui/atoms/Text";
import { Input } from "@/components/ui/atoms/Input";
import { soldProduk } from "../handler/finance";
import Card from "../components/Card";

export default function Produk({ setActiveLayout }) {
  const [kue, setKue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await soldProduk();
      console.log("Response API:", response);

      // Mapping data agar sesuai dengan UI
      const mappedData = response.data.map((item) => ({
        id: item.id_produk,
        name: item.nama_produk,
        category: item.kategori.Kategori,
        price: item.harga || 0,
        sold: item.total_terjual,
        image: item.foto,
      }));

      setKue(mappedData);
    };

    fetchData();
  }, []);

  // Mengelompokkan produk berdasarkan kategori
  const groupedProducts = kue.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className="mb-4">Penjualan Produk</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder="Search" />
      </div>

      <div className="flex w-full justify-center">
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-8">
            <H2>{category}</H2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {groupedProducts[category].map((product) => (
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
        ))}
      </div>
    </div>
  );
}
