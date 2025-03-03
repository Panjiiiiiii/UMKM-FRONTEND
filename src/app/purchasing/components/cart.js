"use client";
import { X, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : {});
    };

    // Load initial cart data
    updateCart();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // 🔥 Perbaikan: Gunakan `useEffect` untuk update `hasItems`
  const hasItems = Object.values(cartItems).some((qty) => qty >= 1);

  return (
    <>
      {/* ✅ Button Cart Sekarang Muncul Saat Ada Item */}
      {hasItems && (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar Cart */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div
            className="fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 z-40 translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex flex-col h-full">
              <button onClick={() => setIsOpen(false)} className="self-end p-2">
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <h2 className="text-lg font-bold mb-4">Cart</h2>

              {/* Tampilkan item dalam cart */}
              <ul>
                {Object.entries(cartItems).map(([id, qty]) =>
                  qty >= 1 ? (
                    <li key={id} className="flex justify-between py-2">
                      <span>Produk {id}</span>
                      <span>{qty}x</span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
