"use client";

import { Button, ChangeQuantity } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, H4 } from "@/components/ui/atoms/Text";
import {
  Checkbox,
  EnumInput,
  Input,
  NumberInput,
  TextBox,
} from "@/components/ui/atoms/Input";
import { Send } from "lucide-react";

export default function Bahan() {
  const [isOpen, setIsOpen] = useState(false);

  const produk = [
    { id_produk: "1", label: "nastar1" },
    { id_produk: "2", label: "nastar2" },
    { id_produk: "3", label: "nastar3" },
    { id_produk: "4", label: "nastar4" },
    { id_produk: "5", label: "nastar5" },
    { id_produk: "6", label: "nastar6" },
    { id_produk: "7", label: "nastar7" },
  ];

  const satuan = [
    { value: "KG", label: "KG" },
    { value: "GR", label: "GR" },
    { value: "LTR", label: "LTR" },
    { value: "PCS", label: "PCS" },
  ];
  return (
    <div className="flex flex-col w-full h-full p-8 ">
      <H2 className={`mb-4`}>Tambah Produk</H2>
      <div className="flex flex-row justify-end mb-8">
        <Button variant="primary" icon={<Send />} children={`Kirim`} />
      </div>
      <div
        className={`flex flex-col w-full h-auto p-16 border-4 border-green-800 rounded-lg`}
      >
        <form>
          <div className="flex flex-row justify-between mb-8">
            <H4>Nama Bahan</H4>
            <Input name={`Produk`} placeholder={`Masukkan Nama Produk`} />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Satuan</H4>
            <EnumInput name={`Kategori`} options={satuan} />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Stok</H4>
            <ChangeQuantity />
          </div>
          <div className="flex flex-col gap-8 justify-between">
            <H4>Produk yang menggunakan bahan</H4>
            <div className="grid grid-cols-5 gap-8">
              {produk.map((produk) => (
                <Checkbox
                  value={produk.id_produk}
                  label={produk.label}
                  key={produk.id_produk}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
