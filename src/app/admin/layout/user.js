"use client";

import { Button } from "@/components/ui/atoms/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import SidebarOverlay from "../components/navbar";
import { H2, P } from "@/components/ui/atoms/Text";
import { Filter, User2 } from "lucide-react";

export default function User() {
  const [isOpen, setIsOpen] = useState(false);

  // Data Dummy
  const users = [
    {
      id: 1,
      username: "Njell",
      email: "KueBasah@gmail.com",
      password: "ahdgajddad",
      role: "ADMIN",
    },
    {
      id: 2,
      username: "Njell",
      email: "KueBasah@gmail.com",
      password: "ahdgajddad",
      role: "ADMIN",
    },
    {
      id: 3,
      username: "Njell",
      email: "KueBasah@gmail.com",
      password: "ahdgajddad",
      role: "ADMIN",
    },
    {
      id: 4,
      username: "Njell",
      email: "KueBasah@gmail.com",
      password: "ahdgajddad",
      role: "ADMIN",
    },
    {
      id: 5,
      username: "Njell",
      email: "KueBasah@gmail.com",
      password: "ahdgajddad",
      role: "ADMIN",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex flex-row gap-8 mb-8">
        <Button
          icon={<GiHamburgerMenu />}
          variant="primary"
          className={`rounded-md p-4`}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <H2 className={`mb-4`}>Data user</H2>
      <div className="flex flex-row justify-end items-center gap-12 mb-8">
        <Button icon={<User2 />} variant="primary" children={`Register`} />
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-4">Ueername</th>
              <th className="p-4">Email</th>
              <th className="p-4">Password</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border border-gray-300 text-center">
                <td className="p-4">
                  <P>{user.username}</P>
                </td>
                <td className="p-4">
                  <P>{user.email}</P>
                </td>
                <td className="p-4">
                  <P>{user.password}</P>
                </td>
                <td className="p-4">
                  <P>{user.role}</P>
                </td>
                <td className="p-4 flex justify-center">
                  <Button variant="primary" children={`Reset Password`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
