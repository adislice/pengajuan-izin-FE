import NavLinkActive from "@/components/NavLinkActive";
import { FileTextIcon, HouseIcon, UserIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {

  return (
    <header className="antialiased flex shadow bg-white z-10">
      <nav className="w-full container mx-auto h-16 flex items-center justify-center">
        <a href="https://flowbite.com" className="flex mr-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Adi Shop
          </span>
        </a>
        <div className="flex-grow flex">
          <ul className="flex gap-2 ms-auto">
            <li>
              <NavLinkActive to="/">
                <HouseIcon size={22} />Dashboard
              </NavLinkActive>
            </li>
            <li>
              <NavLinkActive to="/user">
                <UserIcon size={22} />Data User
              </NavLinkActive>
            </li>
            <li>
              <NavLinkActive to="/izin">
                <FileTextIcon size={22} />Data Izin
              </NavLinkActive>
            </li>
          </ul>
        </div>
      </nav>
    </header>

  )
}