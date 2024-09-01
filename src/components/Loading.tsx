import { LoaderCircleIcon } from "lucide-react";


export default function Loading() {

  return (
    <div className="fixed min-h-screen w-full flex items-center justify-center">
      <LoaderCircleIcon size={40} className="animate-spin text-blue-600" />
    </div>
  )
}