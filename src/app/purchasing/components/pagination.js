"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselPagination({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4; // Jumlah produk yang terlihat dalam satu tampilan
  const totalItems = children.length;
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

  const itemWidth = 120 / itemsPerView; // Lebar setiap item dalam persentase

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden justify-center p-4">
      {/* Wrapper untuk carousel */}
      <motion.div
        className="flex justify-center"
        animate={{ x: `-${currentIndex * itemWidth}%` }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalItems}, minmax(0, ${itemWidth}%)`,
          width: `${totalItems * itemWidth}%`,
        }}
      >
        {children}
      </motion.div>

      {/* Tombol Navigasi */}
      {totalItems > itemsPerView && (
        <>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full z-10"
            onClick={nextSlide}
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
}