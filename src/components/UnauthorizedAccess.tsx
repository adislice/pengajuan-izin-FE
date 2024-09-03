import { ShieldXIcon } from "lucide-react";

export default function UnauthorizedAccess() {

  return (
    <div className="flex-1 h-full w-full flex items-start py-10 justify-center">
      <div className="max-w-sm w-full bg-white flex flex-col items-center justify-center rounded-lg shadow p-5">
        <ShieldXIcon size={56} className="text-red-500"/>
        <h1 className="text-xl font-bold mt-2 text-gray-800">Stop!</h1>
        <h5 className="text-center mt-4">Anda tidak memiliki akses untuk melihat halaman ini!</h5>
      </div>
    </div>
  )
}