import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-row w-full flex-1">
          <Outlet />
        </div>
      </div>
  ); 
}