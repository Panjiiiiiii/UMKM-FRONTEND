"use client";
import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { MenuCard } from "@/components/ui/molecules/Card";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Sidebar } from "lucide-react";
import SidebarOverlay from "../components/navbar";
const menuData = [
  {
    id: 1,
    image: "/images/menu1.jpg",
    name: "Kue Coklat",
    stock: 10,
    price: 25000,
  },
  {
    id: 2,
    image: "/images/menu2.jpg",
    name: "Donat Keju",
    stock: 5,
    price: 15000,
  },
  {
    id: 3,
    image: "/images/menu3.jpg",
    name: "Brownies",
    stock: 8,
    price: 30000,
  },
  {
    id: 4,
    image: "/images/menu4.jpg",
    name: "Cupcake",
    stock: 12,
    price: 18000,
  },
];

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // Add this line to open the sidebar
  return (
    <div className="flex flex-col w-full h-full p-12">
      <div className="flex flex-row gap-8 mb-8">
        <Button
          icon={<GiHamburgerMenu />}
          variant="primary"
          className={`rounded-md p-4`}
          onClick={() => setIsOpen(true)} // Add this line to open the sidebar
        />
        <Input placeholder={"Search"} />
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-between">
          <div className="grid grid-cols-4 gap-[40px]">
            {menuData.map((menu) => (
              <MenuCard
                key={menu.id}
                image={menu.image}
                name={menu.name}
                stock={menu.stock}
                price={menu.price}
              />
            ))}
          </div>
        </div>
      </div>
      {isOpen && <SidebarOverlay isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
