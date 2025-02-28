// admin/layout/produk.js
"use client";

import { Button, ChangeQuantity } from "@/components/ui/atoms/Button";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, H4 } from "@/components/ui/atoms/Text";
import { EnumInput, Input, NumberInput, TextBox } from "@/components/ui/atoms/Input";
import { Send } from "lucide-react";

export default function Produk({ setActiveLayout }) {
  const [isOpen, setIsOpen] = useState(false);

  const category = [
    { value: "q", label: "Cookies - kue" },
    { value: "b", label: "Cookies - pastry" },
    { value: "c", label: "Cookies - cake" },
    { value: "s", label: "Cookies - cookies" },
  ];

  return (
    <div className="flex flex-col w-full h-full p-8 mt-4">
      <H2 className={`mb-4`}>Tambah Produk</H2>
      <div className="flex flex-row justify-end mb-8">
        <Button variant="primary" icon={<Send />} children={`Kirim`} />
      </div>
      <div className="flex flex-col w-full h-auto p-16 border-4 border-green-800 rounded-lg">
        <form>
          <div className="flex flex-row justify-between mb-8">
            <H4>Nama Produk</H4>
            <Input name={`Produk`} placeholder={`Masukkan Nama Produk`} />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Kategori</H4>
            <EnumInput name={`Kategori`} options={category} />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Harga</H4>
            <NumberInput placeholder={`Masukkan harga`} />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Stok</H4>
            <ChangeQuantity />
          </div>
          <div className="flex flex-col gap-8 justify-between">
            <H4>Link Foto (URL)</H4>
            <TextBox placeholder={`Masukkan link foto`} />
          </div>
        </form>
      </div>
      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
