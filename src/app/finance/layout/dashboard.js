"use client";

import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter, TrendingUp, TrendingDown } from "lucide-react";
import { getTransaksi, soldProduk } from "../handler/finance";

export default function Dashboard({ setActiveLayout }) {
  const [transaksi, setTransaksi] = useState([]);
  const [produk, setProduk] = useState([]);

  const [totalPemasukkan, setTotalPemasukkan] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [totalItemTerjual, setTotalItemTerjual] = useState(0);

  const [yesterdayPemasukkan, setYesterdayPemasukkan] = useState(0);
  const [yesterdayTransaksi, setYesterdayTransaksi] = useState(0);
  const [yesterdayItemTerjual, setYesterdayItemTerjual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksi();
        const transaksiLunas = response.data.filter(
          (t) => t.status === "LUNAS"
        );

        // Urutkan data transaksi terbaru
        const sortedData = transaksiLunas
          .sort(
            (a, b) =>
              new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi)
          )
          .slice(0, 5);
        setTransaksi(sortedData);

        // Filter transaksi lunas hari ini dan kemarin
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];

        const todayTransaksi = transaksiLunas.filter((t) =>
          t.tanggal_transaksi.startsWith(today)
        );
        const yesterdayTransaksi = transaksiLunas.filter((t) =>
          t.tanggal_transaksi.startsWith(yesterday)
        );

        setTotalPemasukkan(todayTransaksi.reduce((sum, t) => sum + t.total, 0));
        setYesterdayPemasukkan(
          yesterdayTransaksi.reduce((sum, t) => sum + t.total, 0)
        );

        setTotalTransaksi(todayTransaksi.length);
        setYesterdayTransaksi(yesterdayTransaksi.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSoldData = async () => {
      try {
        const response = await soldProduk();
        setProduk(response.data);

        // Ambil total item terjual hari ini dan kemarin
        const totalToday = response.data.reduce(
          (sum, p) => sum + p.total_terjual,
          0
        );
        setTotalItemTerjual(totalToday);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSoldData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex flex-row justify-between gap-8 mb-8">
        {/* Total Pemasukkan */}
        <div className="flex flex-col w-full rounded-lg shadow-lg p-8">
          <P className="text-gray-300">Total Pemasukkan</P>
          <H2
            className={`${
              totalPemasukkan >= yesterdayPemasukkan
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            Rp {totalPemasukkan.toLocaleString("id-ID")}
          </H2>
          <span
            className={`flex flex-row items-center gap-2 ${
              totalPemasukkan >= yesterdayPemasukkan
                ? "text-green-800 bg-[#A2D7B8] border-[#208C4D]"
                : "text-red-800 bg-[#F8D7DA] border-[#D9534F]"
            } w-28 p-1 rounded-2xl border-2`}
          >
            {totalPemasukkan >= yesterdayPemasukkan ? (
              <TrendingUp className="text-green-800" />
            ) : (
              <TrendingDown className="text-red-800" />
            )}
            {yesterdayPemasukkan > 0
              ? Math.abs(
                  ((totalPemasukkan - yesterdayPemasukkan) /
                    yesterdayPemasukkan) *
                    100
                ).toFixed(1) + "%"
              : "0%"}
          </span>
        </div>

        {/* Total Transaksi */}
        <div className="flex flex-col w-full rounded-lg shadow-lg p-8">
          <P className="text-gray-300">Total Transaksi</P>
          <H2
            className={`${
              totalTransaksi >= yesterdayTransaksi
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {totalTransaksi} Transaksi
          </H2>
          <span
            className={`flex flex-row items-center gap-2 ${
              totalTransaksi >= yesterdayTransaksi
                ? "text-green-800 bg-[#A2D7B8] border-[#208C4D]"
                : "text-red-800 bg-[#F8D7DA] border-[#D9534F]"
            } w-28 p-1 rounded-2xl border-2`}
          >
            {totalTransaksi >= yesterdayTransaksi ? (
              <TrendingUp className="text-green-800" />
            ) : (
              <TrendingDown className="text-red-800" />
            )}
            {yesterdayTransaksi > 0
              ? Math.abs(
                  ((totalTransaksi - yesterdayTransaksi) / yesterdayTransaksi) *
                    100
                ).toFixed(1) + "%"
              : "0%"}
          </span>
        </div>

        {/* Total Item Terjual */}
        <div className="flex flex-col w-full rounded-lg shadow-lg p-8">
          <P className="text-gray-300">Total Item Terjual</P>
          <H2>{totalItemTerjual} Item</H2>{" "}
        </div>
      </div>
      ;<H2 className={`mb-4`}>Transaksi Terbaru</H2>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Nomor Telepon</th>
              <th className="p-4">Tanggal Transaksi</th>
              <th className="p-4">Total Harga</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.length > 0 ? (
              transaksi.map((transaction) => (
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
                      ).toLocaleDateString("id-ID")}
                    </P>
                  </td>
                  <td className="p-4">
                    <P> Rp. {transaction.total.toLocaleString("id-ID")} </P>
                  </td>
                  <td className="p-4">
                    <P>{transaction.status}</P>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Tidak ada transaksi terbaru
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
