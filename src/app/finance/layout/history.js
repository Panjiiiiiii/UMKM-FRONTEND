"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import { Printer } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { ArrowUp, ArrowDown } from "lucide-react";
import { createReport, getTransaksi } from "../handler/finance";
import DetailTransaksi from "../components/DetailTransaksi";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/atoms/Input";
import Pagination from "@/components/ui/molecules/Pagination";

export default function History({ setActiveLayout }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleSort = () => setSortAsc(!sortAsc);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksi();
        setTransaksi(response.data);
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTransactions = transaksi
    .filter((transaction) => {
      const matchesSearch = transaction.Nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase());
      const transactionDate = new Date(transaction.tanggal_transaksi);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return matchesSearch && (!start || transactionDate >= start) && (!end || transactionDate <= end);
    })
    .sort((a, b) => (sortAsc ? new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi) : new Date(a.tanggal_transaksi) - new Date(b.tanggal_transaksi)));

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (id) => {
    setSelectedTransactionId(id);
    setDetailModal(true);
  };

  const handlePrint = async () => {
    const printPromise = createReport();
    toast.promise(printPromise, {
      loading: "Membuat laporan...",
      success: "Laporan berhasil dibuat!",
      error: "Gagal membuat laporan",
    });
    try {
      const response = await printPromise;
      window.open(response.data.sheetUrl, "_blank");
    } catch (error) {
      console.error("Gagal membuat laporan:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full p-8">
        <H1 className="mb-4">Histori Pembelian</H1>
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-8">
            <Input
              placeholder="Cari pelanggan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 max-w-[300px]"
            />
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(e) => setStartDate(e.target.value)}
              onEndDateChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Button icon={<Printer />} variant="outline" onClick={handlePrint}>
            Print Report
          </Button>
        </div>

        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Nomor Telepon</th>
                <th className="p-4 cursor-pointer" onClick={toggleSort}>
                  Tanggal Transaksi {sortAsc ? <ArrowUp className="inline" /> : <ArrowDown className="inline" />}
                </th>
                <th className="p-4">Total Harga</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse border border-gray-300 text-center">
                    <td className="p-4 bg-gray-200">&nbsp;</td>
                    <td className="p-4 bg-gray-200">&nbsp;</td>
                    <td className="p-4 bg-gray-200">&nbsp;</td>
                    <td className="p-4 bg-gray-200">&nbsp;</td>
                    <td className="p-4 bg-gray-200">&nbsp;</td>
                    <td className="p-4 bg-gray-200">&nbsp;</td>
                  </tr>
                ))
              ) : paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id_transaksi} className="border border-gray-300 text-center">
                    <td className="p-4"><P>{transaction.Nama_pelanggan}</P></td>
                    <td className="p-4"><P>{transaction.Nomor_telepon}</P></td>
                    <td className="p-4"><P>{new Date(transaction.tanggal_transaksi).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</P></td>
                    <td className="p-4"><P>Rp. {transaction.total.toLocaleString("id-ID")}</P></td>
                    <td className="p-4"><P>{transaction.status}</P></td>
                    <td className="p-4"><Button variant="primary" onClick={() => openModal(transaction.id_transaksi)}>Detail</Button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="p-4 text-center text-gray-500">Tidak ada transaksi ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      {detailModal && <DetailTransaksi isOpen={detailModal} setIsOpen={setDetailModal} id_transaksi={selectedTransactionId} />}
    </>
  );
}