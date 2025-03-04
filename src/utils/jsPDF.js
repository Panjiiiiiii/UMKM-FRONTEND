"use client";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

const downloadPDF = (cartItems, totalHarga) => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [220, 300], // Ukuran struk kecil
    });

    doc.setFont("monospace");
    doc.setFontSize(12);

    // Header
    doc.text("RUMAH MADINAH CAKE & BAKERY", 105, 10, { align: "center" });
    doc.text("===============================", 105, 20, { align: "center" });

    // Detail Transaksi
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 10, 30);

    // List Item
    let currentY = 50;
    cartItems.forEach((item) => {
      doc.text(item.nama, 10, currentY); // Nama item
      doc.text(`(${item.qty})`, 80, currentY); // Jumlah
      doc.text(`Rp. ${item.harga.toLocaleString()}`, 150, currentY); // Harga
      currentY += 10;
    });

    // Total Harga
    doc.text("===============================", 105, currentY + 10, { align: "center" });
    doc.text(`Total: Rp. ${totalHarga.toLocaleString()}`, 10, currentY + 20);

    // Simpan PDF
    doc.save("receipt.pdf");
    toast.success("PDF berhasil dibuat");
  } catch (error) {
    console.error("Gagal membuat PDF:", error);
    toast.error("Gagal membuat PDF");
  }
};

export default downloadPDF;
