"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/atoms/Input";
import { MenuCard } from "@/app/purchasing/components/Card";
import { getProduk } from "../handler/purchasing";
import { H2, P } from "@/components/ui/atoms/Text";
import Cart from "../components/cart"; // Import komponen Cart

export default function Dashboard({ setActiveLayout }) {
  const [produkByKategori, setProdukByKategori] = useState({});
  const [hasItems, setHasItems] = useState(false); // Cek apakah ada item di cart
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getProduk();
        const data = response.data;

        // Mengelompokkan produk berdasarkan kategori
        const groupedData = data.reduce((acc, item) => {
          const kategori = item.Kategori.Kategori;
          if (!acc[kategori]) {
            acc[kategori] = [];
          }
          acc[kategori].push(item);
          return acc;
        }, {});

        setProdukByKategori(groupedData);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkCart = () => {
      const storedCart = localStorage.getItem("cart");
      const cartItems = storedCart ? JSON.parse(storedCart) : {};
      setHasItems(Object.keys(cartItems).length > 0);
    };

    checkCart();
    window.addEventListener("cartUpdated", checkCart);

    return () => window.removeEventListener("cartUpdated", checkCart);
  }, []);

  // Fungsi untuk memfilter produk berdasarkan query pencarian
  const filteredProdukByKategori = Object.entries(produkByKategori).reduce(
    (acc, [kategori, produk]) => {
      const filteredProduk = produk.filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredProduk.length > 0) {
        acc[kategori] = filteredProduk;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col w-full h-full items-center p-12">
      {/* Input Search di atas */}
      <div className="w-full max-w-screen-lg px-4 mb-8">
        <Input
          type="text"
          placeholder="Search"
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state saat input berubah
        />
      </div>

      {/* Grid container untuk kategori dan MenuCard */}
      <div className="w-full">
        {loading ? (
          <P className="text-center text-gray-500">Memuat data produk...</P>
        ) : Object.keys(filteredProdukByKategori).length === 0 ? (
          <P className="text-center text-gray-500">Tidak ada produk ditemukan.</P>
        ) : (
          Object.entries(filteredProdukByKategori).map(([kategori, produk]) => (
            <div key={kategori} className="w-full mb-8">
              {/* Judul kategori */}
              <H2>{kategori}</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {produk.map((menu) => (
                  <MenuCard
                    key={menu.id_produk}
                    id_produk={menu.id_produk}
                    image={menu.foto}
                    name={menu.nama}
                    stock={menu.stok}
                    price={menu.harga}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Menampilkan tombol Cart jika ada item */}
      {hasItems && <Cart />}
    </div>
  );
}