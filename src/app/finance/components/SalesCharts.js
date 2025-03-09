"use client";

import { H3 } from "@/components/ui/atoms/Text";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function DashboardCharts({ produk, transaksi }) {
  // Data untuk Bar Chart (Top Penjualan Produk)
  const barData = produk
    .map((item) => ({
      name: item.nama_produk,
      total_terjual: item.total_terjual,
    }))
    .sort((a, b) => b.total_terjual - a.total_terjual) // Urutkan dari yang terbanyak
    .slice(0, 5); // Ambil 5 produk teratas

  // Data untuk Line Chart (Tren Transaksi dan Pendapatan Harian)
  const groupedData = transaksi.reduce((acc, t) => {
    const date = t.tanggal_transaksi.split("T")[0];
    if (!acc[date])
      acc[date] = { date, total_transaksi: 0, total_pendapatan: 0 };
    acc[date].total_transaksi += 1;
    acc[date].total_pendapatan += t.total;
    return acc;
  }, {});

  const trendData = Object.values(groupedData).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Total Pendapatan */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <H3 className="text-gray-900">Total Pendapatan</H3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => `${Math.round(value / 1000000)} juta`}
              padding={{ top: 20, bottom: 20 }}
              domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_pendapatan"
              stroke="#ff8042"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Transaksi */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <H3 className="text-gray-900">Total Transaksi Harian</H3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_transaksi"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Penjualan */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <H3 className="text-gray-900">Top Penjualan Produk</H3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_terjual" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}