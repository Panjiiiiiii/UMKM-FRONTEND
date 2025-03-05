"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter, Save } from "lucide-react";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { ArrowUp, ArrowDown } from "lucide-react";
import { getTransaksi, changeStatus } from "../handler/purchasing";
import { EnumInput } from "@/components/ui/atoms/Input";
import toast from "react-hot-toast";
import DetailTransaksi from "../components/DetailTransaksi";

export default function History({ setActiveLayout }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [transaksi, setTransaksi] = useState([]);
  const [updatedTransactions, setUpdatedTransactions] = useState({});
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

  const handleStatusChange = (transactionId, newStatus) => {
    setUpdatedTransactions((prev) => {
      console.log("Updated Transactions:", {
        ...prev,
        [transactionId]: newStatus,
      }); // Debug log
      return { ...prev, [transactionId]: newStatus };
    });
  };

  const handleSubmit = async (transactionId) => {
    const newStatus = updatedTransactions[transactionId];

    if (!newStatus) {
      toast.error("Status tidak boleh kosong!");
      return;
    }

    try {
      console.log(
        "Mengirim status:",
        newStatus,
        "untuk transaksi:",
        transactionId
      ); // Debug log

      const response = await changeStatus(transactionId, newStatus);

      console.log(response);

      if (response.data.status === "success") {
        toast.success("Berhasil update status!");

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
      } else {
        toast.error("Gagal update status!");
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error("Error saat update status:", error);
    }
  };

  const sortedTransactions = transaksi.sort((a, b) => {
    return sortAsc
      ? new Date(a.tanggal_transaksi) - new Date(b.tanggal_transaksi)
      : new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi);
  });

  const openModal = (id) => {
    setSelectedTransactionId(id);
    setDetailModal(true);
  };

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

                  {/* Kolom Action */}
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
