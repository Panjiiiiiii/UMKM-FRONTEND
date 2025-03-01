"use client";

import { Button, ChangeQuantity } from "@/components/ui/atoms/Button";
import { useState, useEffect } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, H4 } from "@/components/ui/atoms/Text";
import { EnumInput, Input, NumberInput, TextBox } from "@/components/ui/atoms/Input";
import { Send } from "lucide-react";
import { getCategory } from "../handler/category";
import { createProduk, updateProduk } from "../handler/produk";
import toast from "react-hot-toast";

export default function Produk({ setActiveLayout, editProduct, setEditProduct }) {
  const [category, setCategory] = useState([{ value: "", label: "Pilih Kategori" }]);
  const [product, setProduct] = useState({
    nama: "",
    harga: "",
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

  useEffect(() => {
    if (editProduct) {
      setProduct({
        nama: editProduct.nama,
        harga: editProduct.harga,
        stok: editProduct.stok,
        foto: editProduct.foto,
        id_kategori: editProduct.id_kategori,
      });
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.nama || !product.harga || !product.stok || !product.id_kategori || !product.foto) {
      toast.error("Harap lengkapi semua data sebelum mengirim.");
      return;
    }

    try {
      if (editProduct) {
        await updateProduk(editProduct.id_produk, { value: product });
        toast.success("Produk berhasil diperbarui!");
      } else {
        await createProduk({ value: product });
        toast.success("Produk berhasil ditambahkan!");
      }

      setProduct({ nama: "", harga: "", stok: 0, foto: "", id_kategori: "" });
      setEditProduct(null);
      setActiveLayout("dashboard");
    } catch (error) {
      toast.error("Terjadi kesalahan!");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8 mt-4">
      <H2 className={`mb-4`}>{editProduct ? "Edit Produk" : "Tambah Produk"}</H2>
      <div className="flex flex-row justify-end mb-8">
        <Button variant="primary" icon={<Send />} children={`Kirim`} onClick={handleSubmit} />
      </div>
      <div className="flex flex-col w-full h-auto p-16 border-4 border-green-800 rounded-lg">
        <div className="flex flex-row justify-between mb-8">
          <H4>Nama Produk</H4>
          <Input name={`Produk`} placeholder={`Masukkan Nama Produk`} value={product.nama} onChange={(e) => setProduct({ ...product, nama: e.target.value })} />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Kategori</H4>
          <EnumInput name={`Kategori`} options={category} value={product.id_kategori} onChange={(e) => setProduct({ ...product, id_kategori: e.target.value })} />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Harga</H4>
          <NumberInput placeholder={`Masukkan harga`} value={product.harga} onChange={(e) => setProduct({ ...product, harga: e.target.value })} />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Stok</H4>
          <ChangeQuantity value={product.stok} onChange={(newValue) => setProduct((prev) => ({ ...prev, stok: newValue }))} />
        </div>
        <div className="flex flex-col gap-8 justify-between">
          <H4>Link Foto (URL)</H4>
          <TextBox placeholder={`Masukkan link foto`} value={product.foto} onChange={(e) => setProduct({ ...product, foto: e.target.value })} />
        </div>
      </div>
    </div>
  );
}
