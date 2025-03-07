"use client";
import { Button } from "@/components/ui/atoms/Button";
import { P } from "./Text";

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage)); // Pastikan totalPages minimal 1

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="primary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0} // ✅ Disable jika halaman 1 atau tidak ada data
      >
        Prev
      </Button>

      <P className="px-4 font-thin">Page {currentPage} of {totalPages}</P>

      <Button
        variant="primary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages} // ✅ Fix Next tidak bisa di klik jika sudah di halaman terakhir
      >
        Next
      </Button>
    </div>
  );
}