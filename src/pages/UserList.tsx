import AddVerificationModal from "@/components/AddVerificatorModal";
import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { User } from "@/types";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function UserList() {
  const [isAddVerifModalOpen, setIsAddVerifModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nama: "Adi",
      email: 'adi@gmail.com',
      alamat: 'jl kaliurang',
      jenis_kelamin: 'L',
      tanggal_lahir: '2001-09-01',
      tempat_lahir: 'Pekalongan',
      level: 1,
    },
    {
      id: 2,
      nama: "Adi",
      email: 'adi@gmail.com',
      alamat: 'jl kaliurang',
      jenis_kelamin: 'L',
      tanggal_lahir: '2001-09-01',
      tempat_lahir: 'Pekalongan',
      level: 1,
    },
    {
      id: 3,
      nama: "Adi",
      email: 'adi@gmail.com',
      alamat: 'jl kaliurang',
      jenis_kelamin: 'L',
      tanggal_lahir: '2001-09-01',
      tempat_lahir: 'Pekalongan',
      level: 1,
    },
    {
      id: 4,
      nama: "Adi",
      email: 'adi@gmail.com',
      alamat: 'jl kaliurang',
      jenis_kelamin: 'L',
      tanggal_lahir: '2001-09-01',
      tempat_lahir: 'Pekalongan',
      level: 1,
    }
  ])

  return (
    <div className="flex w-full mx-auto bg-gray-100">
      <div className="w-4/5 flex flex-col px-10 py-8 mx-auto">
        <div className="flex">
          <div>
            <h1 className="text-xl font-bold">Daftar User</h1>
            <p className="text-gray-500">Kelola data user terdaftar</p>
          </div>
          <div className="ms-auto">
            <Button onClick={() => setIsAddVerifModalOpen(true)}>Tambah Verifikator</Button>
          </div>
        </div>

        <div className="relative my-2 overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Nama
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Level Pengguna
                </th>
                <th scope="col" className="py-3 px-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-3 px-4">
                    {user.nama}
                  </td>
                  <td className="py-3 px-4">
                    {user.email}
                  </td>
                  <td className="py-3 px-4">
                    {user.level}
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/user/${user.id}`} key={user.id} className="rounded p-1 flex hover:bg-gray-100">Lihat</Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {isAddVerifModalOpen && (
        <AddVerificationModal onCloseClicked={() => setIsAddVerifModalOpen(false)} />
      )}
    </div>
  )
}