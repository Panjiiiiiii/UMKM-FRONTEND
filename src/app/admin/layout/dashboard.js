"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/atoms/Input";
import { getProduk } from "../handler/produk";

export default function Dashboard({ setActiveLayout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cakes, setCake] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProduk();
      console.log(response);
      setCake(response.data);
    }
    fetchData(); 
  }, []);

  // Data Dummy

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className={`mb-4`}>Produk</H2>
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input placeholder={`Search`} />
        <div className="flex flex-row gap-4">
          <Button
            variant="primary"
            children={`Tambah produk`}
            onClick={() => setActiveLayout("produk")}
          />
          <Button
            variant="primary"
            children={`Tambah kategori`}
          />
        </div>
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Stok</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cakes.map((cake) => (
              <tr key={cake.id_produk} className="border border-gray-300 text-center">
                <td className="p-4">
                  <P>{cake.nama}</P>
                </td>
                <td className="p-4">
                  <P>{cake.Kategori.Kategori}</P>
                </td>
                <td className="p-4">
                  <P>{cake.stok}</P>
                </td>
                <td className="p-4">
                  <P>{`Rp ${cake.harga}`}</P>
                </td>
                <td className="p-4 flex flex-row gap-4 justify-center">
                  <Button variant="outline" icon={<Edit/>} />
                  <Button variant="outline" icon={<Trash/>} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
