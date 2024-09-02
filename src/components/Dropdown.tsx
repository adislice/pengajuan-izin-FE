import { ChevronDownIcon } from "lucide-react";
import { ReactNode, useState } from "react"

interface DropdownProps {
  text: string,
  children: ReactNode
}

export function Dropdown({text, children}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(old => !old)} className="bg-white relative hover:bg-gray-100 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      {text} <ChevronDownIcon className={`ms-1 ${isOpen ? 'rotate-180' : ''}`} size={18} />
      {isOpen && (
        <div className="z-10 absolute top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          {children}
        </div>
      )}
    </button>
  )
}