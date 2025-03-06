"use client";

import { H3 } from "@/components/ui/atoms/Text";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TrendCharts({ transaksi }) {
  // Agregasi data transaksi per hari
  const groupedData = transaksi.reduce((acc, t) => {
    const date = t.tanggal_transaksi.split("T")[0];
    if (!acc[date]) acc[date] = { date, total_transaksi: 0, total_pendapatan: 0 };
    acc[date].total_transaksi += 1;
    acc[date].total_pendapatan += t.total;
    return acc;
  }, {});

  const trendData = Object.values(groupedData).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Line Chart - Tren Transaksi */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <H3 className="text-gray-900">Tren Transaksi Harian</H3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_transaksi" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Tren Pendapatan */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
      <H3 className="text-gray-900">Tren Pendapatan Harian</H3>
      <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_pendapatan" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
