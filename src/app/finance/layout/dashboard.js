"use client";

import { useEffect, useState } from "react";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getTransaksi, soldProduk } from "../handler/finance";
import DashboardCharts from "../components/SalesCharts"; // Import komponen baru

export default function Dashboard({ setActiveLayout }) {
  const [transaksi, setTransaksi] = useState([]);
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
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
  
        setTransaksi(transaksiLunas);
  
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
      } finally {
        setLoading(false); // Setelah data selesai dimuat, loading menjadi false
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
    <div className="flex flex-col w-full h-full p-4">
      <div className="mb-8 pl-4">
        <H1>Live Dashboard</H1>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col justify-center rounded-lg shadow-lg p-4 bg-white">
          <P className="text-gray-300">Total Semua Pemasukkan</P>
          <H2 className="text-green-800">
            {loading
              ? "Loading data..."
              : `Rp ${totalAllPemasukkan.toLocaleString("id-ID")}`}
          </H2>
        </div>

        <div className="flex flex-col justify-center rounded-lg shadow-lg p-4 bg-white">
          <P className="text-gray-300">Total Item Terjual</P>
          <H2>{loading ? "Loading data..." : `${totalItemTerjual} Item`}</H2>
        </div>

        <div className="flex flex-col justify-center rounded-lg shadow-lg p-4 bg-white">
          <P className="text-gray-300">Total Pemasukkan Hari Ini</P>
          <H2 className="text-green-800">
            {loading
              ? "Loading data..."
              : `Rp ${totalPemasukkan.toLocaleString("id-ID")}`}
          </H2>
        </div>

        <div className="flex flex-col justify-center rounded-lg shadow-lg p-4 bg-white">
          <P className="text-gray-300">Total Transaksi Hari Ini</P>
          <H2>{loading ? "Loading data..." : `${totalTransaksi} Transaksi`}</H2>
        </div>
      </div>

      {/* Komponen Chart */}
      <DashboardCharts produk={produk} transaksi={transaksi} />
    </div>
  );
}
