"use client";
import { X, ShoppingCart, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduk } from "../handler/purchasing";
import { H3 } from "@/components/ui/atoms/Text";
import { Button } from "@/components/ui/atoms/Button";
import downloadPDF from "@/utils/jsPDF";
import { createTransaksi } from "../handler/purchasing";
import UserModal from "./DataUser"; // Import UserModal
import toast from "react-hot-toast";

export default function Cart({ setActiveLayout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [produkList, setProdukList] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false); // State for UserModal

  useEffect(() => {
    const fetchProduk = async () => {
      const response = await getProduk();
      if (response) {
        setProdukList(response.data);
      }
    };

    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : {});
    };

    fetchProduk();
    updateCart();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // Filter produk yang ada di cart
  const filteredItems = produkList
    .filter((produk) => cartItems[produk.id_produk])
    .map((produk) => ({
      ...produk,
      qty: cartItems[produk.id_produk],
    }));

  // Hitung total harga
  const totalHarga = filteredItems.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );

  const handlerPrint = () => {
    downloadPDF(filteredItems, totalHarga);
  };

  const handleCheckout = async (userData) => {
    try {
      const payload = {
        ...userData,
        produk: filteredItems.map((item) => ({
          id_produk: item.id_produk,
          qty: item.qty,
        })),
      };
  
      const response = await createTransaksi(payload);
      
      if (!response) throw new Error("Gagal melakukan transaksi");
  
      toast.success("Transaksi berhasil");
      
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      window.location.reload();
  
      setShowUserModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal melakukan transaksi");
    }
  };
  
  

  return (
    <>
      {/* ✅ Tombol Cart */}
      {filteredItems.length > 0 && (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      )}

      {/* ✅ Sidebar Cart */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg transform transition-transform duration-300 z-40 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex flex-col h-full">
              <button onClick={() => setIsOpen(false)} className="self-end p-2">
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <H3 className={`mb-4`}>Item keranjang</H3>

              {/* List Produk */}
              <ul className="mb-4">
                {filteredItems.map((item) => (
                  <li
                    key={item.id_produk}
                    className="flex justify-between py-2"
                  >
                    <span>
                      {item.nama} ({item.qty})
                    </span>
                    <span>Rp. {item.harga.toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              {/* Total Harga */}
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span>Rp. {totalHarga.toLocaleString()}</span>
                </div>
              </div>

              {/* Tombol Checkout */}
              <div className="flex justify-between mt-4">
                <Button
                  icon={<Printer />}
                  variant="edit"
                  children={`Print`}
                  onClick={() => handlerPrint()}
                />
                <Button
                  icon={<ShoppingCart />}
                  variant="outline"
                  children={`Checkout`}
                  onClick={() => setShowUserModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UserModal */}
      {showUserModal && (
        <UserModal
          isOpen={showUserModal}
          setIsOpen={setShowUserModal}
          onSubmit={handleCheckout}
        />
      )}
    </>
  );
}
