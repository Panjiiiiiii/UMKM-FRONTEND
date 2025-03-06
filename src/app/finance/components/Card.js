import { Button } from "@/components/ui/atoms/Button";
import { P, H3 } from "@/components/ui/atoms/Text";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function Card({image, name, sold, price}) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 w-[442px] h-[600px] flex flex-col border-4 border-green-800">
        {/* Gambar Menu */}
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            width={442}
            height={300}
            className="w-full object-fill rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <H3 className="text-xl">{name}</H3>
          <P className="text-xl font-bold">Rp. {price}</P>
          <P className="text-sm text-gray-400">Total terjual: {sold}</P>
        </div>
      </div>
    </>
  );
}
