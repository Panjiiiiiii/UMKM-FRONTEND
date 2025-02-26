import Dashboard from "./layout/dashboard";
import User from "./layout/user";
import Produk from "./layout/produk";


export default function purchasingPage({}) {
  return (
    <>
    <div className="w-screen h-screen overflow-x-hidden">
      {/* <Dashboard /> */}
      {/* <User/> */}
      <Produk/>
    </div>
    </>
  );
}
