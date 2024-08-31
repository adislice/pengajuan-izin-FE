import { InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  value: string,
  label?: string,
  register?: UseFormRegister<any>,
  error?: string
}

export default function RadioButton({ name, label, value, error, register, ...props }: RadioButtonProps) {

  return (
    <div className="flex items-center">
      <input id={value} value={value} type="radio" {...(register ? register(name) : {})} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...props} />
      <label htmlFor={value} className="ms-2">{label}</label>
    </div>
  )
}