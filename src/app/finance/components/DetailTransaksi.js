import { Modal } from "@/components/ui/organism/Modal";
import { useEffect, useState } from "react";
import { getDetailTransaksi } from "../handler/finance"; // Pastikan handler ini ada
import { P } from "@/components/ui/atoms/Text";

export default function DetailTransaksi({ isOpen, setIsOpen, id_transaksi }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID Transaksi:", id_transaksi);
    if (!id_transaksi) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDetailTransaksi(id_transaksi);
        console.log("Response API:", response);

        if (response.data) {
          setDetail(response.data);
        } else {
          console.error("Data transaksi tidak ditemukan:", response);
        }
      } catch (error) {
        console.error("Gagal mengambil detail transaksi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_transaksi]);

  return (
    <Modal
      isOpen={isOpen}
      title="Detail Transaksi"
      onClose={() => setIsOpen(false)}
    >
      {loading ? (
        <P>Loading...</P>
      ) : detail ? (
        <div className="p-4 space-y-4 max-h-[80vh] flex flex-col">
          {/* Informasi Pelanggan */}
          <P>
            <strong>Nama Pelanggan:</strong> {detail?.Nama_pelanggan}
          </P>
          <P>
            <strong>Nomor Telepon:</strong> {detail?.Nomor_telepon}
          </P>
          <P>
            <strong>Tanggal Transaksi:</strong>{" "}
            {new Date(detail?.tanggal_transaksi).toLocaleString("id-ID")}
          </P>
          <P>
            <strong>Total:</strong> Rp. {detail?.total?.toLocaleString("id-ID")}
          </P>
          <P>
            <strong>Status:</strong> {detail?.status}
          </P>

          {/* Detail Produk */}
          <h3 className="text-lg font-bold mt-4">Detail Produk</h3>
          <div className="space-y-4 overflow-y-auto max-h-[50vh] p-2 border rounded-lg">
            {detail?.Detail_Transaksi?.length > 0 ? (
              detail?.Detail_Transaksi?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item?.produk?.foto || "/placeholder.jpg"}
                    alt={item?.produk?.nama || "Produk"}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <P>
                      <strong>Nama Produk:</strong> {item?.produk?.nama}
                    </P>
                    <P>
                      <strong>Harga:</strong> Rp.{" "}
                      {item?.produk?.harga?.toLocaleString("id-ID")}
                    </P>
                    <P>
                      <strong>Jumlah:</strong> {item?.qty}
                    </P>
                    <P>
                      <strong>Subtotal:</strong> Rp.{" "}
                      {(item?.produk?.harga * item?.qty).toLocaleString("id-ID")}
                    </P>
                  </div>
                </div>
              ))
            ) : (
              <P>Produk tidak ditemukan.</P>
            )}
          </div>
        </div>
      ) : (
        <P>Data transaksi tidak tersedia.</P>
      )}
    </Modal>
  );
}
