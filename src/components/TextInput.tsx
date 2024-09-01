import { ucfirst } from "@/utils/helper";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  register?: UseFormRegister<any>,
  error?: string
}

export default function TextInput({ name, label, error, register, ...props }: TextInputProps) {

  return (
    <>
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium dark:text-white">{label}</label>
      )}
      <input id={name} {...(register ? register(name) : {})} className={`border text-sm rounded-md focus:outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-400' : 'border-gray-300'}`} {...props} />
      { error && <p className="text-red-500 text-sm">{ ucfirst(error) }</p>}
    </>
  )
}