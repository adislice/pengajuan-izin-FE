import { useAuth } from "@/context/AuthProvider"
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function Dashboard() {
  const auth = useAuth();
  useDocumentTitle("Dashboard");

  return (
    <h1>Dashboard, {auth.user?.name}</h1>
  )
}