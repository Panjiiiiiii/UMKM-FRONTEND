"use client";

import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter, TrendingUp } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const toggleSort = () => setSortAsc(!sortAsc);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Data Dummy
  const transactions = [
    {
      id: 1,
      name: "Budi Santoso",
      phone: "081234567890",
      date: "2025-02-20",
      total: 1500000,
      status: "Selesai",
    },
    {
      id: 2,
      name: "Ani Wijaya",
      phone: "082345678901",
      date: "2025-02-18",
      total: 2300000,
      status: "Pending",
    },
    {
      id: 3,
      name: "Siti Rahma",
      phone: "083456789012",
      date: "2025-02-22",
      total: 750000,
      status: "Selesai",
    },
    {
      id: 4,
      name: "Doni Prasetyo",
      phone: "084567890123",
      date: "2025-02-19",
      total: 3200000,
      status: "Dibatalkan",
    },
    {
      id: 5,
      name: "Rina Puspita",
      phone: "085678901234",
      date: "2025-02-21",
      total: 1100000,
      status: "Selesai",
    },
  ];

  const sortedTransactions = transactions.sort((a, b) => {
    return sortAsc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
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
      <div className="flex flex-row justify-between gap-8 mb-8">
        <div className="flex flex-col w-full rounded-lg shadow-lg p-8">
          <P className={`text-gray-300`}>Total Transaksi</P>
          <H2 className={`text-green-800`}>20 Transaksi</H2>
          <span className="flex flex-row items-center gap-2 text-green-800 bg-[#A2D7B8] w-28 p-1 rounded-2xl border-2 border-[#208C4D]">
            <TrendingUp className={`text-green-800`} />
            20%
          </span>
        </div>
        <div className="flex flex-col w-full rounded-lg shadow-lg p-8">
          <P className={`text-gray-300`}>Total Transaksi</P>
          <H2 className={`text-green-800`}>20 Transaksi</H2>
          <span className="flex flex-row items-center gap-2 text-green-800 bg-[#A2D7B8] w-28 p-1 rounded-2xl border-2 border-[#208C4D]">
            <TrendingUp className={`text-green-800`} />
            20%
          </span>
        </div>
        <div className="flex flex-col w-full rounded-lg shadow-lg p-8">
          <P className={`text-gray-300`}>Total Transaksi</P>
          <H2 className={`text-green-800`}>20 Transaksi</H2>
          <span className="flex flex-row items-center gap-2 text-green-800 bg-[#A2D7B8] w-28 p-1 rounded-2xl border-2 border-[#208C4D]">
            <TrendingUp className={`text-green-800`} />
            20%
          </span>
        </div>
      </div>
      <H2 className={`mb-4`}>Transaksi Terbaru</H2>
      <div className="flex flex-row justify-start items-center gap-12 mb-8">
        <Input placeholder={`Search`} />
        <Button icon={<Filter />} variant="primary" children={`Filter`} />
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Nomor Telepon</th>
              <th className="p-4 cursor-pointer" onClick={toggleSort}>
                Tanggal Transaksi{" "}
                {sortAsc ? (
                  <ArrowUp className="inline" />
                ) : (
                  <ArrowDown className="inline" />
                )}
              </th>
              <th className="p-4">Total Harga</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border border-gray-300 text-center"
              >
                <td className="p-4">
                  <P>{transaction.name}</P>
                </td>
                <td className="p-4">
                  <P>{transaction.phone}</P>
                </td>
                <td className="p-4">
                  <P>{transaction.date}</P>
                </td>
                <td className="p-4">
                  <P>Rp. {transaction.total.toLocaleString("id-ID")}</P>
                </td>
                <td className="p-4">
                  <P>{transaction.status}</P>
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
