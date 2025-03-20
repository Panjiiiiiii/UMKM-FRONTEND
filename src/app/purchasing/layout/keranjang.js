import { ChangeQuantity } from "@/components/ui/atoms/Button";
import { H1, H2, P } from "@/components/ui/atoms/Text";
import { useEffect, useState } from "react";
import { getProduk } from "../handler/purchasing";
import { Button } from "@/components/ui/atoms/Button";
import downloadPDF from "@/utils/jsPDF";
import { createTransaksi } from "../handler/purchasing";
import UserModal from "../components/DataUser";
import toast from "react-hot-toast";
import { Printer, ShoppingCart } from "lucide-react";
import { setLocalStorage, getLocalStorage } from "@/utils/localstorage";
import { CLIENT_KEY } from "@/schema/secret";

export default function Keranjang({ setActiveLayout }) {
  const [cartItems, setCartItems] = useState({});
  const [produkList, setProdukList] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const fetchProduk = async () => {
      const response = await getProduk();
      console.log(response);
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

    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", CLIENT_KEY);
    document.body.appendChild(script);
  }, []);

  const filteredItems = produkList
    .filter((produk) => cartItems[produk.id_produk])
    .map((produk) => ({
      ...produk,
      qty: cartItems[produk.id_produk],
    }));

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
      if (!response) {
        toast.error("Gagal melakukan transaksi.");
        return;
      }

      const { snapToken } = response.data;
      window.snap.pay(snapToken, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil!");

          // Hapus keranjang setelah sukses
          localStorage.removeItem("cart");
          setCartItems({});
          window.dispatchEvent(new Event("cartUpdated"));

          window.location.reload();
        },
        onPending: () => {
          toast.info("Menunggu pembayaran...");
        },
        onError: () => {
          toast.error("Pembayaran gagal!");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (id_produk, newQuantity) => {
    if (newQuantity < 0) return; // Cegah qty negatif

    const produk = produkList.find((p) => p.id_produk === id_produk);
    if (newQuantity > produk.stock) {
      toast.error("Stok tidak mencukupi");
      return;
    }

    // Update state dan localStorage
    const updatedCart = { ...cartItems };
    if (newQuantity === 0) {
      delete updatedCart[id_produk]; // Hapus produk jika qty = 0
    } else {
      updatedCart[id_produk] = newQuantity; // Update qty
    }

    setCartItems(updatedCart);
    setLocalStorage("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // Notifikasi ke event listener
  };

  return (
    <div className="relative w-full justify-center p-16">
      <div className="flex flex-row justify-center gap-8 mt-8">
        {/* Container khusus untuk daftar produk */}
        <div className="max-h-[500px] overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id_produk}
              className="w-full flex flex-row rounded-xl border-4 justify-between gap-8 border-green-800 p-4 mb-4"
            >
              {/* Informasi produk dan ChangeQuantity */}
              <div className="flex flex-col space-y-4 flex-1">
                <H2>{item.nama}</H2>
                <P className="text-sm">Rp {item.harga.toLocaleString()}</P>
                <ChangeQuantity
                  value={item.qty}
                  onChange={(newQuantity) =>
                    handleQuantityChange(item.id_produk, newQuantity)
                  }
                />
              </div>
              <img
                src={item.foto}
                alt="Product"
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
            </div>
          ))}
        </div>
        {/* Container untuk detail pembayaran */}
        <div className="max-w-sm h-max rounded-xl border-4 border-green-800 p-8 space-y-8">
          <H2>Total Harga</H2>

          {/* Rincian Produk */}
          <div className="max-h-[200px] p-4 overflow-y-auto space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id_produk}
                className="flex justify-between text-sm"
              >
                <P>
                  {item.nama} (x{item.qty})
                </P>
                <P>Rp {item.harga.toLocaleString()}</P>
              </div>
            ))}
          </div>

          {/* Total Harga */}
          <div className="border-t pt-2">
            <P className="text-md font-semibold">
              Total: Rp {totalHarga.toLocaleString()}
            </P>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              icon={<Printer />}
              variant="edit"
              children={`Print`}
              onClick={handlerPrint}
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
      {showUserModal && (
        <UserModal
          isOpen={showUserModal}
          setIsOpen={setShowUserModal}
          onSubmit={handleCheckout}
        />
      )}
    </div>
  );
}
