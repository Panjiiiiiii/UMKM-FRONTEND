import Bahan from "./layout/addBahan";
import Dashboard from "./layout/dashboard";

export default function Page({}) {
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        {/* <Dashboard /> */}
        <Bahan />
      </div>
    </>
  );
}
