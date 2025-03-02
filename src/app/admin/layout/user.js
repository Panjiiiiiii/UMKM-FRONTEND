"use client";

import { Button } from "@/components/ui/atoms/Button";
import { useEffect, useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { User2 } from "lucide-react";
import { RegisterForm } from "@/components/ui/molecules/Modal/Register";
import { Modal } from "@/components/ui/organism/Modal";
import { getAllUser } from "@/auth/handler";
import ResetPasswordModal from "../components/ResetPasswordModal"; // Import ResetPasswordModal

export default function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Tambahkan state untuk user ID

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllUser();
      setUsers(response.data);
    };
    fetchData();
  }, []);

  // Function untuk membuka modal reset password dan menyimpan user ID
  const handleOpenPasswordModal = (userId) => {
    setSelectedUserId(userId);
    setOpenPassword(true);
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <H2 className={`mb-4`}>Data user</H2>
      <div className="flex flex-row justify-end items-center gap-12 mb-8">
        <Button icon={<User2 />} variant="primary" onClick={() => setOpenRegister(true)}>
          Register
        </Button>
      </div>
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
            {users.map((user) => (
              <tr key={user.id_user} className="border border-gray-300 text-center">
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
                    onClick={() => handleOpenPasswordModal(user.id_user)}
                  >
                    Reset Password
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Register */}
      {openRegister && (
        <Modal isOpen={openRegister} onClose={() => setOpenRegister(false)} title="Add user">
          <RegisterForm />
        </Modal>
      )}

      {/* Modal Reset Password */}
      {openPassword && (
        <ResetPasswordModal
          isOpen={openPassword}
          onClose={() => setOpenPassword(false)}
          userId={selectedUserId} // Kirim user ID ke modal
        />
      )}

      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
