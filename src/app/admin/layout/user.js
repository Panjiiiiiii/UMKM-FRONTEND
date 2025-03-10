"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { User2 } from "lucide-react";
import { RegisterForm } from "@/components/ui/molecules/Modal/Register";
import { Modal } from "@/components/ui/organism/Modal";
import { getAllUser } from "@/auth/handler";
import ResetPasswordModal from "../components/ResetPasswordModal";
import { Input } from "@/components/ui/atoms/Input";
import Pagination from "@/components/ui/molecules/Pagination";

export default function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 State untuk pencarian
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // ⏳ State untuk loading
  const itemsPerPage = 5; // 🛠 Atur jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 🔄 Aktifkan loading sebelum fetch
      try {
        const response = await getAllUser();
        setUsers(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false); // ✅ Matikan loading setelah fetch selesai
      }
    };
    fetchData();
  }, []);

  // 🔍 Filter user berdasarkan username atau email
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📌 Pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ⏩ Fungsi ganti halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // ⏳ Reset pagination ketika melakukan pencarian baru
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className="mb-4">Data user</H2>

      {/* 🔍 Search Bar */}
      <div className="flex flex-row justify-between items-center gap-12 mb-8">
        <Input
          placeholder="Search user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          icon={<User2 />}
          variant="primary"
          onClick={() => setOpenRegister(true)}
        >
          Register
        </Button>
      </div>

      {/* 📋 Tabel User */}
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // ⏳ Skeleton Loader saat data masih loading
              [...Array(itemsPerPage)].map((_, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 text-center animate-pulse"
                >
                  <td className="p-4 bg-gray-200 rounded">&nbsp;</td>
                  <td className="p-4 bg-gray-200 rounded">&nbsp;</td>
                  <td className="p-4 bg-gray-200 rounded">&nbsp;</td>
                  <td className="p-4 flex justify-center">
                    <div className="w-24 h-8 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id_user}
                  className="border border-gray-300 text-center"
                >
                  <td className="p-4">
                    <P>{user.username}</P>
                  </td>
                  <td className="p-4">
                    <P>{user.email}</P>
                  </td>
                  <td className="p-4">
                    <P>{user.role}</P>
                  </td>
                  <td className="p-4 flex justify-center">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedUserId(user.id_user);
                        setOpenPassword(true);
                      }}
                    >
                      Reset Password
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              // ❌ Tampilkan pesan jika tidak ada data
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Tidak ada user yang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ⏩ Pagination */}
      {!isLoading && totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* 📌 Modal Register */}
      {openRegister && (
        <Modal
          isOpen={openRegister}
          onClose={() => setOpenRegister(false)}
          title="Add user"
        >
          <RegisterForm onClose={() => setOpenRegister(false)} />{" "}
          {/* ✅ Modal otomatis tertutup */}
        </Modal>
      )}

      {/* 🔐 Modal Reset Password */}
      {openPassword && (
        <ResetPasswordModal
          isOpen={openPassword}
          onClose={() => setOpenPassword(false)}
          userId={selectedUserId}
        />
      )}

      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
