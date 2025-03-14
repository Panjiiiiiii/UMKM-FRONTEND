"use strict";
import { Input } from "@/components/ui/atoms/Input";
import { H2, P } from "@/components/ui/atoms/Text";
import { DateRangeFilter } from "@/components/ui/molecules/Date";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInventory } from "../handler/bahan";
import { ArrowDown, ArrowUp } from "lucide-react";
import Pagination from "@/components/ui/molecules/Pagination";

export default function Inventori({ setActiveLayout }) {
  const [inventory, setInventory] = useState([]);
  const [sortDesc, setSortDesc] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman aktif
  const itemsPerPage = 5; // Jumlah item per halaman
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); // State untuk cek data ditemukan
  const toggleSort = () => setSortDesc(!sortDesc);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventory();
        console.log(response.data);
        setInventory(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Gagal memuat data inventori");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredInventory = inventory
    .filter((item) => {
      const matchesSearch = item.bahan.nama
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const inventoriDate = new Date(item.tanggal_inventori);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const isWithinRange =
        (!start || inventoriDate >= start) && (!end || inventoriDate <= end);
      return matchesSearch && isWithinRange;
    })
    .sort((a, b) => {
      return sortDesc
        ? new Date(b.tanggal_inventori) - new Date(a.tanggal_inventori)
        : new Date(a.tanggal_inventori) - new Date(b.tanggal_inventori);
    });

  useEffect(() => {
    setNoResults(filteredInventory.length === 0);
  }, [filteredInventory]);

  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col w-full h-full p-8">
        <H2 className="mb-4">Histori Inventori</H2>
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
                <th className="p-4 cursor-pointer" onClick={toggleSort}>
                  Tanggal{" "}
                  {sortDesc ? (
                    <ArrowUp className="inline" />
                  ) : (
                    <ArrowDown className="inline" />
                  )}
                </th>
                <th className="p-4">Nama Bahan</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Satuan</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
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
                  </tr>
                ))
              ) : noResults ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                paginatedInventory.map((item, index) => (
                  <tr
                    key={index}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-4">
                      <P>
                        {new Date(item.tanggal_inventori).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </P>
                    </td>
                    <td className="p-4">
                      <P>{item.bahan.nama}</P>
                    </td>
                    <td className="p-4">
                      <P>{item.qty}</P>
                    </td>
                    <td className="p-4">
                      <P>{item.bahan.satuan}</P>
                    </td>
                    <td className="p-4">
                      <span className={item.status === "LOADING_IN" ? "bg-green-300 text-green-700 px-2 py-1 rounded-xl" : "bg-red-300 text-red-700 px-2 py-1 rounded-xl"}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
