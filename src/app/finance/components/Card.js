import { P, H3 } from "@/components/ui/atoms/Text";

export default function Card({ image, name, sold, price }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-[400px] h-[400px] flex flex-col border-4 border-green-800">
      {/* Gambar Menu */}
      <div className="relative w-full h-[150px] sm:h-[200px] rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <H3 className="text-lg sm:text-xl">{name}</H3>
        <P className="text-lg sm:text-xl font-bold">Rp {price}</P>
        <P className="text-sm text-gray-400">Total terjual: {sold}</P>
      </div>
    </div>
  );
}