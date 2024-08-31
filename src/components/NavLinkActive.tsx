import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavLinkActiveProps {
  to: string,
  children: ReactNode,
}
export default function NavLinkActive({ to, children, ...props }: NavLinkActiveProps) {

  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "text-blue-600 bg-blue-50" : "") + " flex px-4 py-2.5 rounded-full gap-2 items-center justify-center hover:bg-gray-100"} >
      { children }
    </NavLink>
  );
}