import NavLinkActive from "@/components/NavLinkActive";
import { useAuth } from "@/context/AuthProvider";
import { ucfirst } from "@/utils/helper";
import { FileTextIcon, HouseIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    Swal.fire({
      title: "Logout?",
      text: "Anda yakin ingin logout?",
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Sedang keluar...",
        });
        Swal.showLoading();
        auth.logout().then(() => {
          navigate('/login');
          Swal.fire({
            title: "Sukses",
            text: "Logout berhasil",
            icon: 'success',
          });
        });
      }
    });
  }
  return (
    <header className="antialiased flex shadow bg-white z-10">
      <nav className="w-full container mx-auto h-16 flex items-center justify-center">
        <a href="https://flowbite.com" className="flex mr-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Adi Shop
          </span>
        </a>
        <div className="flex-grow flex items-center gap-2">
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
          <div className="relative">
            <button 
            onClick={() => setUserDropdownOpen(state => !state)}
            className="bg-blue-400 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-blue-500">
              {ucfirst(auth.user?.nama.charAt(0) ?? '')}
            </button>
            {userDropdownOpen && (
              <div className="absolute w-40 bg-white flex flex-col shadow-lg rounded-md p-2 border right-0 top-full mt-1">
                <Link to={'/profil'} className="px-2 py-1 text-start hover:bg-gray-100 rounded">Profil</Link>
                <button className="px-2 py-1 text-start hover:bg-gray-100 rounded" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>

  )
}