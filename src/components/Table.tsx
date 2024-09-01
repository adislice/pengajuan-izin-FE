import { ReactNode } from "react";


export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-auto  border">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b dark:bg-gray-700 dark:text-gray-400">
      {children}
    </thead>
  );
}

export function TableHeader({ text }: { text: string }) {
  return (
    <th scope="col" className="py-3 px-4">
      {text}
    </th>
  );
}

export function TableRow({ children }: { children: ReactNode }) {
  return (
    <tr>
      {children}
    </tr>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y">
      {children}
    </tbody>
  );
}

export function TableData({ children }: { children: ReactNode }) {
  return (
    <td className="py-3 px-4">
      {children}
    </td>
  );
}