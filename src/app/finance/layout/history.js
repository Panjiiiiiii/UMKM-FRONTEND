"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter, Printer, Save } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { ArrowUp, ArrowDown } from "lucide-react";
import { createReport, getTransaksi } from "../handler/finance";
import DetailTransaksi from "../components/DetailTransaksi";
import toast from "react-hot-toast";

export default function History({ setActiveLayout }) {
  const [startDate, setStartDate] = useState("");
  const [link, setLink] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [transaksi, setTransaksi] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const toggleSort = () => setSortAsc(!sortAsc);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTransaksi();
      setTransaksi(response.data);
    };
    fetchData();
  }, []);

  const status = [
    { value: "LUNAS", label: "LUNAS" },
    { value: "BELUM_LUNAS", label: "BELUM_LUNAS" },
    { value: "BATAL", label: "BATAL" },
  ];

  const sortedTransactions = transaksi.sort((a, b) => {
    return sortAsc
      ? new Date(a.tanggal_transaksi) - new Date(b.tanggal_transaksi)
      : new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi);
  });

  const openModal = (id) => {
    setSelectedTransactionId(id);
    setDetailModal(true);
  };

  const handlePrint = async() => {
    try {
      const response = await createReport();
      setLink(response.data.sheetUrl);
      window.open(link, "_blank");
    } catch (error) {
      console.log(error);
      toast.error("Gagal membuat laporan");
      
    }
  }

  return (
    <>
      <div className="flex flex-col w-full h-full p-8">
        <H2 className="mb-4">Histori Pembelian</H2>
        <div className="flex flex-row justify-end items-center gap-12 mb-8">
          <Button icon={<Filter />} variant="primary">
            Filter
          </Button>
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(e) => setStartDate(e.target.value)}
            onEndDateChange={(e) => setEndDate(e.target.value)}
          />
          <Button icon={<Printer/>} variant="outline" children={`Print Report`} onClick={() => handlePrint()}/>
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
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
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

                  {/* Kolom Status */}
                  <td className="p-4">
                    <P>{transaction.status}</P>
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
              ))}
            </tbody>
          </table>
        </div>
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
