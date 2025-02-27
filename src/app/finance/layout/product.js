"use client";

import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";

export default function Produky() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const toggleSort = () => setSortAsc(!sortAsc);
  // Data Dummy
  const cakes = [
    {
      id: 1,
      product: "Kue Lapis",
      category: "Kue Basah",
      price: 50000,
      sold: 15,
    },
    {
      id: 2,
      product: "Brownies",
      category: "Kue Kering",
      price: 75000,
      sold: 10,
    },
    { id: 3, product: "Donat", category: "Roti", price: 30000, sold: 20 },
    {
      id: 4,
      product: "Tart Coklat",
      category: "Kue Ulang Tahun",
      price: 50000,
      sold: 5,
    },
    {
      id: 5,
      product: "Cheesecake",
      category: "Dessert",
      price: 120000,
      sold: 8,
    },
  ];

  const sortedTransactions = cakes.sort((a, b) => {
    return sortAsc ? a.sold - b.sold : b.sold - a.sold;
  });

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex flex-row gap-8 mb-8">
        <Button
          icon={<GiHamburgerMenu />}
          variant="primary"
          className={`rounded-md p-4`}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <H2 className={`mb-4`}>Penjualan Produk</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder={`Search`} />
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4" onClick={toggleSort}>Total terjual (pcs) {sortAsc ? <ArrowUp className="inline" /> : <ArrowDown className="inline" />}</th>
            </tr>
          </thead>
          <tbody>
            {cakes.map((cake) => (
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
      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
