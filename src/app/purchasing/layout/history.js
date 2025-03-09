"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter, Save } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { ArrowUp, ArrowDown } from "lucide-react";
import { getTransaksi, changeStatus } from "../handler/purchasing";
import { EnumInput, Input } from "@/components/ui/atoms/Input";
import toast from "react-hot-toast";
import DetailTransaksi from "../components/DetailTransaksi";
import Pagination from "@/components/ui/molecules/Pagination"; // Import komponen Pagination

export default function History({ setActiveLayout }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [transaksi, setTransaksi] = useState([]);
  const [updatedTransactions, setUpdatedTransactions] = useState({});
  const [detailModal, setDetailModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman aktif
  const itemsPerPage = 5; // Jumlah item per halaman
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); // State untuk cek data ditemukan

  const toggleSort = () => setSortDesc(!sortDesc);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksi();
        setTransaksi(response.data);
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
      } finally {
        setIsLoading(false); // Setelah fetch selesai, matikan loading
      }
    };
    fetchData();
  }, []);

  const status = [
    { value: "LUNAS", label: "LUNAS" },
    { value: "BELUM_LUNAS", label: "BELUM_LUNAS" },
    { value: "BATAL", label: "BATAL" },
  ];

  const handleStatusChange = (transactionId, newStatus) => {
    setUpdatedTransactions((prev) => ({
      ...prev,
      [transactionId]: newStatus,
    }));
  };

  const handleSubmit = async (transactionId) => {
    const newStatus = updatedTransactions[transactionId];
  
    if (!newStatus) {
      toast.error("Status tidak boleh kosong!");
      return;
    }
  
    // Gunakan toast.promise untuk memberikan feedback loading, success, dan error
    await toast.promise(
      changeStatus(transactionId, newStatus),
      {
        loading: "Menyimpan perubahan...",
        success: "Berhasil update status!",
        error: "Gagal update status!",
      }
    ).then((response) => {
      if (response.data.status === "success") {
        setTransaksi((prev) =>
          prev.map((trx) =>
            trx.id_transaksi === transactionId
              ? { ...trx, status: newStatus }
              : trx
          )
        );
  
        setUpdatedTransactions((prev) => {
          const newUpdates = { ...prev };
          delete newUpdates[transactionId];
          return newUpdates;
        });
      }
    }).catch((error) => {
      console.error("Error saat update status:", error);
    });
  };
  

  // Fungsi untuk memfilter transaksi berdasarkan search, date range, dan sorting
  const filteredTransactions = transaksi
    .filter((transaction) => {
      const matchesSearch = transaction.Nama_pelanggan.toLowerCase().includes(
        searchQuery.toLowerCase()
      );

      const transactionDate = new Date(transaction.tanggal_transaksi);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDateRange =
        (!start || transactionDate >= start) &&
        (!end || transactionDate <= end);

      return matchesSearch && matchesDateRange;
    })
    .sort((a, b) => {
      return sortDesc
        ? new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi)
        : new Date(a.tanggal_transaksi) - new Date(b.tanggal_transaksi);
    });

  // Cek apakah hasil pencarian / filter kosong
  useEffect(() => {
    setNoResults(filteredTransactions.length === 0);
  }, [filteredTransactions]);

  // Pagination logic
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  const openModal = (id) => {
    setSelectedTransactionId(id);
    setDetailModal(true);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full p-8">
        <H2 className="mb-4">Histori Pembelian</H2>
        <div className="flex flex-row justify-between items-center gap-12 mb-8">
          {/* Input Search */}
          <Input
            placeholder="Cari transaksi"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-row gap-4">
            {/* Date Range Filter */}
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(e) => setStartDate(e.target.value)}
              onEndDateChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Nomor Telepon</th>
                <th className="p-4 cursor-pointer" onClick={toggleSort}>
                  Tanggal Transaksi{" "}
                  {sortDesc ? (
                    <ArrowUp className="inline" />
                  ) : (
                    <ArrowDown className="inline" />
                  )}
                </th>
                <th className="p-4">Total Harga</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Skeleton Loading
                [...Array(itemsPerPage)].map((_, index) => (
                  <tr
                    key={index}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-4">
                      <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                  </tr>
                ))
              ) : noResults ? (
                // Jika hasil filter kosong
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                // Jika ada data, tampilkan transaksi
                paginatedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id_transaksi}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-4">
                      <P>{transaction.Nama_pelanggan}</P>
                    </td>
                    <td className="p-4">
                      <P>{transaction.Nomor_telepon}</P>
                    </td>
                    <td className="p-4">
                      <P>
                        {new Date(
                          transaction.tanggal_transaksi
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </P>
                    </td>
                    <td className="p-4">
                      <P>Rp. {transaction.total.toLocaleString("id-ID")}</P>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-row items-center justify-center gap-4">
                        <EnumInput
                          options={status}
                          value={
                            updatedTransactions[transaction.id_transaksi] ??
                            transaction.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              transaction.id_transaksi,
                              e.target.value
                            )
                          }
                        />
                        {updatedTransactions[transaction.id_transaksi] &&
                          updatedTransactions[transaction.id_transaksi] !==
                            transaction.status && (
                            <Button
                              variant="primary"
                              icon={<Save />}
                              onClick={() =>
                                handleSubmit(transaction.id_transaksi)
                              }
                            />
                          )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <Button
                          variant="primary"
                          onClick={() => openModal(transaction.id_transaksi)}
                        >
                          Detail
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {detailModal && (
        <DetailTransaksi
          isOpen={detailModal}
          setIsOpen={setDetailModal}
          id_transaksi={selectedTransactionId}
        />
      )}
    </>
  );
}
