import Image from "next/image";

import { ChangeQuantity } from "../atoms/Button";

export const MenuCard = ({ image, name, stock, price }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 w-60">
      {/* Gambar Menu */}
      <div className="relative w-full h-36 rounded-lg overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>

      {/* Informasi Menu */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">
          {stock > 0 ? `Stok: ${stock}` : "Habis"}
        </p>
        <p className="text-lg font-bold text-green-600">
          Rp {price.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Tombol Change Quantity */}
      <div className="mt-3">
        <ChangeQuantity />
      </div>
    </div>
  );
};