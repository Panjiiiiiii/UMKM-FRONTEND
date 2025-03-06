"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { H3 } from "@/components/ui/atoms/Text";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff6361", "#a4de6c"];

export default function SalesCharts({ produk }) {
  const pieData = produk.map((item) => ({
    name: item.nama_produk,
    value: item.total_terjual,
  }));

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Pie Chart - Distribusi Penjualan */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
      <H3 className="text-gray-900">Distribusi Produk</H3>
      <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Total Produk Terjual */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
      <H3 className="text-gray-900">Total Produk Terjual</H3>
      <ResponsiveContainer width="100%" height={300}>
          <BarChart data={produk}>
            <XAxis dataKey="nama_produk" tick={{ fontSize: 12 }} />
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
