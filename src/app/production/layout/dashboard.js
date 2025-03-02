"use client";

import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { Input } from "@/components/ui/atoms/Input";

export default function Dashboard({setActiveLayout, setEditBahan}) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Data Dummy
  const cakes = [
    {
      id: 1,
      product: "Kue Lapis",
      category: "Kue Basah",
      stock: 15,
      price: 50000,
    },
    {
      id: 2,
      product: "Brownies",
      category: "Kue Kering",
      stock: 10,
      price: 75000,
    },
    { id: 3, product: "Donat", category: "Roti", stock: 20, price: 30000 },
    {
      id: 4,
      product: "Tart Coklat",
      category: "Kue Ulang Tahun",
      stock: 5,
      price: 50000,
    },
    {
      id: 5,
      product: "Cheesecake",
      category: "Dessert",
      stock: 8,
      price: 120000,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className={`mb-4`}>Bahan</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder={`Search`}/>
        <Button variant="primary" children={`Tambah bahan`} />
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
            {cakes.map((cake) => (
              <tr key={cake.id} className="border border-gray-300 text-center">
                <td className="p-4">
                  <P>{cake.product}</P>
                </td>
                <td className="p-4">
                  <P>{cake.category}</P>
                </td>
                <td className="p-4">
                  <P>{cake.stock}</P>
                </td>
                <td className="p-4">
                  <P>{`Rp ${cake.price.toLocaleString("id-ID")}`}</P>
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
