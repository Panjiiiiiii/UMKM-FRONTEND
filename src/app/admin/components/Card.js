import { Button } from "@/components/ui/atoms/Button";
import { P, H3 } from "@/components/ui/atoms/Text";
import { Edit, Trash } from "lucide-react";
import { getProdukById, deleteProduk } from "../handler/produk";
import toast from "react-hot-toast";

export default function Card({
  id_produk,
  image,
  name,
  stock,
  price,
  onDelete,
  setEditProduct,
  setActiveLayout,
}) {
  const handleEdit = async (id_produk) => {
    const productData = await getProdukById(id_produk);
    if (productData) {
      setEditProduct(productData.data); // Kirim data ke form edit
      setActiveLayout("produk"); // Pindah ke halaman addProduk
    } else {
      toast.error("Gagal mengambil data produk");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-[442px] h-auto flex flex-col border-4 border-green-800">
        {/* Gambar Menu */}
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <H3 className="text-xl">{name}</H3>
          <P className="text-sm text-gray-400">Stock: {stock}</P>
          <P className="text-xl font-bold">Rp. {price}</P>
        </div>
        <div className="flex flex-row justify-start gap-4 mt-4">
          <Button
            variant="edit"
            icon={<Edit />}
            onClick={() => handleEdit(id_produk)}
          />
          <Button
            variant="danger"
            icon={<Trash />}
            onClick={() => onDelete(id_produk)}
          />
        </div>
      </div>
    </>
  );
}
