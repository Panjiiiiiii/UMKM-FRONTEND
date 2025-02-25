import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { MenuCard } from "@/components/ui/molecules/Card";
import { GiHamburgerMenu } from "react-icons/gi";

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
  return (
    <div className="flex flex-col justify center p-4">
      <div className="flex flex-row gap-4 justify-start">
        <Button
          icon={<GiHamburgerMenu />}
          variant="primary"
          className={`rounded-md p-4`}
        />
        <Input placeholder={"S"} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-4 p-12 gap-8">
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
  );
}
