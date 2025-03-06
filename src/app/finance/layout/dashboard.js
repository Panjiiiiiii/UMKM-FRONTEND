"use client";

import { useEffect, useState } from "react";
import { H2, P } from "@/components/ui/atoms/Text";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getTransaksi, soldProduk } from "../handler/finance";
import SalesCharts from "../components/SalesCharts";
import TrendCharts from "../components/TrendCharts";

export default function Dashboard({ setActiveLayout }) {
  const [transaksi, setTransaksi] = useState([]);
  const [produk, setProduk] = useState([]);

  const [totalPemasukkan, setTotalPemasukkan] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [totalItemTerjual, setTotalItemTerjual] = useState(0);
  const [totalAllPemasukkan, setTotalAllPemasukkan] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [percentageTransaksiChange, setPercentageTransaksiChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksi();
        const transaksiLunas = response.data.filter(
          (t) => t.status === "LUNAS"
        );

        setTransaksi(transaksiLunas); // Tambahkan ini supaya `TrendCharts` mendapatkan data transaksi

        const totalAll = transaksiLunas.reduce((sum, t) => sum + t.total, 0);
        setTotalAllPemasukkan(totalAll);

        const today = new Date().toISOString().split("T")[0];
        const todayTransaksi = transaksiLunas.filter((t) =>
          t.tanggal_transaksi.startsWith(today)
        );

        const totalToday = todayTransaksi.reduce((sum, t) => sum + t.total, 0);
        setTotalPemasukkan(totalToday);
        setTotalTransaksi(todayTransaksi.length);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];
        const yesterdayTransaksi = transaksiLunas.filter((t) =>
          t.tanggal_transaksi.startsWith(yesterdayStr)
        );

        const totalYesterday = yesterdayTransaksi.reduce(
          (sum, t) => sum + t.total,
          0
        );
        setPercentageChange(
          totalYesterday
            ? ((totalToday - totalYesterday) / totalYesterday) * 100
            : 0
        );
        setPercentageTransaksiChange(
          yesterdayTransaksi.length
            ? ((todayTransaksi.length - yesterdayTransaksi.length) /
                yesterdayTransaksi.length) *
                100
            : 0
        );
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
        setTotalItemTerjual(
          response.data.reduce((sum, p) => sum + p.total_terjual, 0)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchSoldData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="grid grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 flex flex-col justify-center rounded-lg shadow-lg p-12 bg-white">
          <P className="text-gray-300">Total Semua Pemasukkan</P>
          <H2 className="text-green-800">
            Rp {totalAllPemasukkan.toLocaleString("id-ID")}
          </H2>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex flex-col w-full rounded-lg shadow-lg p-8 bg-white">
            <P className="text-gray-300">Total Pemasukkan Hari Ini</P>
            <H2 className="text-green-800">
              Rp {totalPemasukkan.toLocaleString("id-ID")}
            </H2>
            {percentageChange !== 0 && (
              <span
                className={`text-sm ${
                  percentageChange > 0 ? "text-green-600" : "text-red-600"
                } mt-2 flex items-center`}
              >
                {percentageChange.toFixed(2)}%{" "}
                {percentageChange > 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full rounded-lg shadow-lg p-8 bg-white">
            <P className="text-gray-300">Total Transaksi Hari Ini</P>
            <H2>{totalTransaksi} Transaksi</H2>
            {percentageTransaksiChange !== 0 && (
              <span
                className={`text-sm ${
                  percentageTransaksiChange > 0
                    ? "text-green-600"
                    : "text-red-600"
                } mt-2 flex items-center`}
              >
                {percentageTransaksiChange.toFixed(2)}%{" "}
                {percentageTransaksiChange > 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full rounded-lg shadow-lg p-8 bg-white">
            <P className="text-gray-300">Total Item Terjual</P>
            <H2>{totalItemTerjual} Item</H2>
          </div>
        </div>
      </div>

      {/* Komponen Chart */}
      <div className="space-x-4 space-y-4">
        <SalesCharts produk={produk} />
        <TrendCharts transaksi={transaksi} />
      </div>
    </div>
  );
}
