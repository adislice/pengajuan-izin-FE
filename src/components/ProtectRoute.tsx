import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthProvider"
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedUserLevel: number[]
}
export default function ProtectRoute({ allowedUserLevel }: ProtectedRouteProps) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user == null) {
    return <Navigate to={'/login'} replace state={{ from: location }} />
  }

  if (allowedUserLevel.includes(auth.user.level)) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-blue-100">

        <Navbar />
        <div className="flex flex-row w-full flex-1">
          <Outlet />
        </div>
      </div>
    )
  } else {
    return <h1>You don't have permission</h1>;
  }



}