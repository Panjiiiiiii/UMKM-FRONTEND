import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ images, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // Tambahkan state untuk arah slide

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right"); // Set arah ke kanan saat otomatis
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const prevSlide = () => {
    setDirection("left"); // Set arah ke kiri saat prevSlide
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setDirection("right"); // Set arah ke kanan saat nextSlide
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover absolute rounded-xl"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left"); // Set arah berdasarkan indeks
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}