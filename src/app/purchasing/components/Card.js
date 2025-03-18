"use client";
import { useState, useEffect } from "react";
import { ChangeQuantity } from "../../../components/ui/atoms/Button";
import { H3, P } from "../../../components/ui/atoms/Text";
import toast from "react-hot-toast";
import { setLocalStorage, getLocalStorage } from "@/utils/localstorage";

export const MenuCard = ({ id_produk, image, name, stock, price }) => {
  const [quantity, setQuantity] = useState(0);
  const [currentStock, setCurrentStock] = useState(stock);

  useEffect(() => {
    const rawData = getLocalStorage("cart");
    let storedData = {};

    try {
      storedData = rawData ? JSON.parse(rawData) : {};
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }

    if (storedData[id_produk]) {
      setQuantity(storedData[id_produk]);
      setCurrentStock(stock - storedData[id_produk]);
    }
  }, [id_produk, stock]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 0) return; // Cegah qty negatif

    if (newQuantity > stock) {
      toast.error("Stok tidak mencukupi");
      return;
    }

    // **Update State**
    setQuantity(newQuantity);
    setCurrentStock(stock - newQuantity);

    // **Update Local Storage**
    const storedCart = getLocalStorage("cart");
    let cart = storedCart ? JSON.parse(storedCart) : {};

    if (newQuantity === 0) {
      delete cart[id_produk]; // Hapus produk jika qty = 0
    } else {
      cart[id_produk] = newQuantity; // Update qty
    }

    // Simpan kembali ke localStorage setelah perubahan
    setLocalStorage("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); // Notifikasi ke event listener jika ada
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-200 max-w-md h-[360px] flex flex-col space-y-4">
      {/* Gambar Menu */}
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Informasi Menu */}
      <div className="flex-1">
        <H3 className="font-semibold text-gray-900">{name}</H3>
        <P className="text-gray-500">
          {currentStock > 0 ? `Stok: ${currentStock}` : "Habis"}
        </P>
        <P className="font-bold text-green-600">
          Rp {price.toLocaleString()}
        </P>
      </div>

      {/* Tombol Change Quantity */}
      <div className="flex justify-start">
        <ChangeQuantity value={quantity} onChange={handleQuantityChange} />
      </div>
    </div>
  );
};