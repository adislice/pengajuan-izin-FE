import { InputHTMLAttributes, ReactNode } from "react"
import { UseFormRegister } from "react-hook-form"

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  register?: UseFormRegister<any>,
  error?: string
}

export default function Select({ children, label, name, register, error }: SelectProps) {

  return (
    <form className="mx-auto">
      <label htmlFor={name} className="block mb-1 text-sm font-medium dark:text-white">{label}</label>
      <select id={name} {...(register ? register(name) : {})} className={`bg-white border text-gray-900 focus:outline-0 focus:ring-1 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-400' : 'border-gray-300'}`}>
        {children}
      </select>
    </form>
  )
}