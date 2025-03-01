// admin/layout/produk.js
"use client";

import { Button, ChangeQuantity } from "@/components/ui/atoms/Button";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, H4 } from "@/components/ui/atoms/Text";
import {
  EnumInput,
  Input,
  NumberInput,
  TextBox,
} from "@/components/ui/atoms/Input";
import { Send } from "lucide-react";
import { getCategory } from "../handler/category";
import { useEffect } from "react";
import { createProduk } from "../handler/produk";
import toast from "react-hot-toast";

export default function Produk({ setActiveLayout }) {
  const [category, setCategory] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const [product, setProduct] = useState({
    nama: "",
    harga: 0,
    stok: 0,
    foto: "",
    id_kategori: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategory();
      const formattedData = response.data.map((item) => ({
        value: item.id_kategori,
        label: item.Kategori,
      }));
      setCategory([{ value: "", label: "Pilih Kategori" }, ...formattedData]);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", product); // Debugging
    if (
      !product.nama ||
      !product.harga ||
      !product.stok ||
      !product.id_kategori ||
      !product.foto
    ) {
      toast.error("Harap lengkapi semua data sebelum mengirim.");
      return;
    }
    try {
      const response = await createProduk({ value: product });
      if (response) {
        toast.success("Berhasil menambahkan produk");
        setProduct({
          nama: "",
          harga: "",
          stok: 0,
          foto: 0,
          id_kategori: "",
        });
      } else {
        toast.error("Gagal menambahkan produk");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8 mt-4">
      <H2 className={`mb-4`}>Tambah Produk</H2>
      <div className="flex flex-row justify-end mb-8">
        <Button
          variant="primary"
          icon={<Send />}
          children={`Kirim`}
          onClick={handleSubmit}
        />
      </div>
      <div className="flex flex-col w-full h-auto p-16 border-4 border-green-800 rounded-lg">
        <div className="flex flex-row justify-between mb-8">
          <H4>Nama Produk</H4>
          <Input
            name={`Produk`}
            placeholder={`Masukkan Nama Produk`}
            value={product.nama}
            onChange={(e) => setProduct({ ...product, nama: e.target.value })}
          />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Kategori</H4>
          <EnumInput
            name={`Kategori`}
            options={category}
            value={product.id_kategori}
            onChange={(e) =>
              setProduct({ ...product, id_kategori: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Harga</H4>
          <NumberInput
            placeholder={`Masukkan harga`}
            value={product.harga}
            onChange={(e) => setProduct({ ...product, harga: e.target.value })}
          />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Stok</H4>
          <ChangeQuantity
            value={product.stok}
            onChange={(newValue) =>
              setProduct((prev) => ({ ...prev, stok: newValue }))
            }
          />
        </div>
        <div className="flex flex-col gap-8 justify-between">
          <H4>Link Foto (URL)</H4>
          <TextBox
            placeholder={`Masukkan link foto`}
            value={product.foto}
            onChange={(e) => setProduct({ ...product, foto: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
