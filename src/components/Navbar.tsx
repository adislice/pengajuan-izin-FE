import NavLinkActive from "@/components/NavLinkActive";
import { useAuth } from "@/context/AuthProvider";
import { FileTextIcon, HouseIcon, UserIcon } from "lucide-react";

export default function Navbar() {
  const auth = useAuth();

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
            {auth.user?.level != 2 && (
              <li>
                <NavLinkActive to="/user">
                  <UserIcon size={22} />Data User
                </NavLinkActive>
              </li>
            )}
            <li>
              <NavLinkActive to="/izin">
                <FileTextIcon size={22} />Data Izin
              </NavLinkActive>
            </li>
          </ul>
          <div>{auth.user?.nama}</div>
        </div>
      </nav>
    </header>

  )
}