"use client";

import { Button, ChangeQuantity } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { H2, H4 } from "@/components/ui/atoms/Text";
import { Checkbox, EnumInput, Input } from "@/components/ui/atoms/Input";
import { Send } from "lucide-react";
import { getProduk } from "@/app/admin/handler/produk";

export default function Bahan({ setActiveLayout, editBahan, setEditBahan }) {
  const [produk, setProduk] = useState([]);
  const [bahan, setBahan] = useState({
    nama: "",
    stok: 0,
    satuan: "",
    id_produk: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProduk();
      const formattedData = response.data.map((item) => ({
        value: item.id_produk,
        label: item.nama,
      }));
      setProduk(formattedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editBahan) {
      setBahan({
        nama: editBahan.nama,
        stok: editBahan.stok,
        satuan: editBahan.satuan,
        id_produk: Array.isArray(editBahan.produk) 
        ? editBahan.produk.map((p) => p.id_produk) // ✅ Ambil hanya ID produk
        : [],      });
    }
  }, [editBahan]);

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
            <Input
              name={`Bahan`}
              placeholder={`Masukkan Nama Bahan`}
              value={bahan.nama}
              onChange={(e) => setBahan({ ...bahan, nama: e.target.value })}
            />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Satuan</H4>
            <EnumInput
              name={`Bahan`}
              options={satuan}
              value={bahan.satuan}
              onChange={(e) => setBahan({ ...bahan, satuan: e.target.value })}
            />
          </div>
          <div className="flex flex-row justify-between mb-8">
            <H4>Stok</H4>
            <ChangeQuantity
              value={bahan.stok}
              onChange={(value) => setBahan({ ...bahan, stok: value })}
            />
          </div>
          <div className="flex flex-col gap-8 justify-between">
            <H4>Produk yang menggunakan bahan</H4>
            <div className="grid grid-cols-5 gap-8">
              {produk.map((produk) => (
                <Checkbox
                  value={produk.value}
                  label={produk.label}
                  key={produk.value}
                  checked={
                    Array.isArray(bahan.id_produk) &&
                    bahan.id_produk.includes(produk.value)
                  }
                  onChange={(e) => {
                    const newIdProduk = e.target.checked
                      ? [...bahan.id_produk, produk.value]
                      : bahan.id_produk.filter((id) => id !== produk.value);
                    setBahan({ ...bahan, id_produk: newIdProduk });
                  }}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
