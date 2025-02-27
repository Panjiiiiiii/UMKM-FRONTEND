import Dashboard from "./layout/dashboard";
import History from "./layout/history";
import Produk from "./layout/product";

export default function financePage() {
  return (
    <>
    <div className="w-screen h-screen overflow-x-hidden">
      {/* <Dashboard/> */}
      {/* <Produk/> */}
      <History/>
    </div>
    </>
  );
}
