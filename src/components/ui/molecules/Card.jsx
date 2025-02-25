import Image from "next/image";
import { ChangeQuantity } from "../atoms/Button";
import { H1, H2, H3, H4, P } from "../atoms/Text";

export const MenuCard = ({ image, name, stock, price }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-[442px] h-[600px] flex flex-col border-4 border-green-800">
      {/* Gambar Menu */}
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
        <Image src={image} alt={name} width={442} height={300} objectFit="cover" />
      </div>

      {/* Informasi Menu */}
      <div className="mt-8 flex-1">
        <H3 className="font-semibold text-gray-900">{name}</H3>
        <P className=" text-gray-500">
          {stock > 0 ? `Stok: ${stock}` : "Habis"}
        </P>
        <P className="font-bold text-green-600">
          Rp {price.toLocaleString("id-ID")}
        </P>
      </div>

      {/* Tombol Change Quantity */}
      <div className="mt-auto flex justify-start">
        <ChangeQuantity />
      </div>
    </div>
  );
};
