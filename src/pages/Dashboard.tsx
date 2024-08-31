import { useAuth } from "@/context/AuthProvider"

export default function Dashboard() {
  const auth = useAuth();

  return (
    <h1>Dashboard, {auth.user?.name}</h1>
  )
}