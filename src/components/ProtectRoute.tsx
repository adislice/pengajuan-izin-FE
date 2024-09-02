import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthProvider"
import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedUser: number[],
  children: ReactNode
}
export default function ProtectRoute({ allowedUser, children }: ProtectedRouteProps) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.authStatus == 'configuring') {
    return <Loading />;
  } else if (auth.authStatus == 'unauthenticated' || !auth.user) {
    return <Navigate to={'/login'} replace state={{ from: location }} />
  } 

  if (allowedUser.includes(auth.user.level)) {
    return (
      children
    )
  } else {
    return <h1>You don't have permission</h1>;
  }
}