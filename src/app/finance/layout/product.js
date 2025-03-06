"use client";

import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";
import { soldProduk } from "../handler/finance";

export default function Produk({ setActiveLayout }) {
  const [kue, setKue] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSort = () => setSortAsc(!sortAsc);

  useEffect(() => {
    const fetchData = async () => {
      const response = await soldProduk();
      console.log("Response API:", response);

      // Mapping data dari API agar sesuai dengan yang digunakan di UI
      const mappedData = response.data.map((item) => ({
        id: item.id_produk,
        product: item.nama_produk,
        category: item.kategori.Kategori, // Mengambil kategori dari objek kategori
        price: item.harga || 0, // Jika harga tersedia
        sold: item.total_terjual,
      }));

      setKue(mappedData);
    };

    fetchData();
  }, []);

  // Sorting berdasarkan jumlah terjual
  const sortedTransactions = [...kue].sort((a, b) =>
    sortAsc ? a.sold - b.sold : b.sold - a.sold
  );

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className="mb-4">Penjualan Produk</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder="Search" />
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4 cursor-pointer" onClick={toggleSort}>
                Total Terjual (pcs){" "}
                {sortAsc ? <ArrowUp className="inline" /> : <ArrowDown className="inline" />}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((cake) => (
              <tr key={cake.id} className="border border-gray-300 text-center">
                <td className="p-4">
                  <P>{cake.product}</P>
                </td>
                <td className="p-4">
                  <P>{cake.category}</P>
                </td>
                <td className="p-4">
                  <P>{`Rp ${cake.price.toLocaleString("id-ID")}`}</P>
                </td>
                <td className="p-4">
                  <P>{cake.sold}</P>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
