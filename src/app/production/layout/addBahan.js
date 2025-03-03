"use client";

import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { H2, H4 } from "@/components/ui/atoms/Text";
import { Checkbox, EnumInput, Input } from "@/components/ui/atoms/Input";
import { Send } from "lucide-react";
import { getProduk } from "@/app/admin/handler/produk";
import { addBahan, getBahan, updateBahan } from "../handler/bahan";
import toast from "react-hot-toast";

export default function Bahan({ setActiveLayout, editBahan, setEditBahan }) {
  const [produk, setProduk] = useState([]);
  const [satuan, setSatuan] = useState([]);
  const [bahan, setBahan] = useState({
    nama: "",
    stok: 0,
    satuan: "",
    produk_Bahan: [], // ✅ Ganti `id_produk` menjadi `produk_Bahan`
  });

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await getProduk();
        if (response?.data) {
          setProduk(
            response.data.map((item) => ({
              value: item.id_produk,
              label: item.nama,
            }))
          );
        }
      } catch (error) {
        console.error("Gagal memuat produk", error);
      }
    };
    fetchProduk();
  }, []);

  useEffect(() => {
    setSatuan([
      { value: "", label: "Pilih Satuan" },
      { value: "KG", label: "KG" },
      { value: "GR", label: "GR" },
      { value: "LTR", label: "LTR" },
      { value: "PCS", label: "PCS" },
    ]);
  }, []);

  useEffect(() => {
    console.log("EditBahan:", editBahan);
    if (editBahan) {
      setBahan({
        nama: editBahan.nama,
        stok: editBahan.stok,
        satuan: editBahan.satuan,
        produk_Bahan: editBahan.produk?.map((p) => p.id_produk) || [],
      });
    } else {
      setBahan({ nama: "", stok: 0, satuan: "", produk_Bahan: [] });
    }
  }, [editBahan]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bahan.nama ||
      !bahan.stok ||
      !bahan.satuan ||
      !bahan.produk_Bahan.length
    ) {
      toast.error("Harap lengkapi semua data sebelum mengirim.");
      return;
    }

    try {
      if (editBahan && editBahan.id_bahan) {
        // Pastikan ini hanya untuk edit
        await updateBahan(editBahan.id_bahan, bahan);
        toast.success("Bahan berhasil diperbarui!");
      } else {
        await addBahan(bahan);
        toast.success("Bahan berhasil ditambahkan!");
      }

      // Reset form setelah submit
      setBahan({ nama: "", stok: 0, satuan: "", produk_Bahan: [] });
      setEditBahan(null);
      setActiveLayout("dashboard");
      const updatedBahan = await getBahan();
      setBahan(updatedBahan);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className="mb-4">{editBahan ? "Edit bahan" : "Tambah Bahan"}</H2>
      <div className="flex flex-row justify-end mb-8">
        <Button variant="primary" icon={<Send />} onClick={handleSubmit}>
          Kirim
        </Button>
      </div>
      <div className="flex flex-col w-full p-16 border-4 border-green-800 rounded-lg">
        <div className="flex flex-row justify-between mb-8">
          <H4>Nama Bahan</H4>
          <Input
            name="Bahan"
            placeholder="Masukkan Nama Bahan"
            value={bahan.nama}
            onChange={(e) => setBahan({ ...bahan, nama: e.target.value })}
          />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Satuan</H4>
          <EnumInput
            name="Bahan"
            options={satuan}
            value={bahan.satuan}
            onChange={(e) => setBahan({ ...bahan, satuan: e.target.value })}
          />
        </div>
        <div className="flex flex-row justify-between mb-8">
          <H4>Stok</H4>
          <Input
            type="number"
            value={bahan.stok}
            onChange={(e) =>
              setBahan({ ...bahan, stok: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex flex-col gap-8 justify-between">
          <H4>Produk yang menggunakan bahan</H4>
          <div className="grid grid-cols-5 gap-8">
            {Array.isArray(produk) &&
              produk.map((p) => (
                <Checkbox
                  key={p.value}
                  value={p.value}
                  label={p.label}
                  checked={bahan.produk_Bahan.includes(p.value)}
                  onChange={(e) => {
                    setBahan({
                      ...bahan,
                      produk_Bahan: e.target.checked
                        ? [...bahan.produk_Bahan, p.value]
                        : bahan.produk_Bahan.filter((id) => id !== p.value),
                    });
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
