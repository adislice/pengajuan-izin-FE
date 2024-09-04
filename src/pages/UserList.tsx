import AddVerifikatorModal from "@/components/AddVerifikatorModal";
import Button from "@/components/Button";
import DetailUserModal from "@/components/DetailUserModal";
import Pagination from "@/components/Pagination";
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from "@/components/Table";
import { useAuth } from "@/context/AuthProvider";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { getAllUser } from "@/services/userService";
import { User } from "@/types";
import { ucfirst } from "@/utils/helper";
import { ChevronDownIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

type FilterVerified = 'all' | 'verified' | 'unverified';

export default function UserList() {
  const [isAddVerifModalOpen, setIsAddVerifModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [pagination, setPagination] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [verifiedFilter, setVerifiedFilter] = useState<FilterVerified>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const auth = useAuth();
  useDocumentTitle("Daftar User");

  function fetchUser() {
    const page = currentPage;
    getAllUser(page, verifiedFilter).then((data) => {
      setUsers(data.data);
      setPagination(data.links);
    }).catch((err) => {
      Swal.fire({
        title: "Kesalahan",
        text: err.message,
        icon: 'error'
      });
    });
  }

  function toggleFilter() {
    setFilterOpen(old => !old);
  }
  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    fetchUser();
  }, [currentPage, verifiedFilter])

  return (
    <div className="flex w-full mx-auto bg-gray-100">
      <div className="w-4/5 flex flex-col px-10 py-8 mx-auto">
        <div className="flex">
          <div>
            <h1 className="text-xl font-bold">Daftar User</h1>
            <p className="text-gray-500">Kelola data user terdaftar</p>
          </div>
          <div className="ms-auto">
            {auth.user?.level == 0 &&
              <Button onClick={() => setIsAddVerifModalOpen(true)}>Tambah Verifikator</Button>
            }
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white my-4 shadow">
          <div className="my-2 ">
            <button onClick={toggleFilter} className="bg-white relative hover:bg-gray-100 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              {ucfirst(verifiedFilter)} <ChevronDownIcon size={18} />
              {filterOpen && (
                <div className="z-10 absolute top-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <div onClick={() => setVerifiedFilter('all')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      All
                    </div>
                    <div onClick={() => setVerifiedFilter('verified')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Verified
                    </div>
                    <div onClick={() => setVerifiedFilter('unverified')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Unverified
                    </div>
                  </li>

                </ul>
              </div>
              )}
            </button>

          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader text="Nama" />
                <TableHeader text="Email" />
                <TableHeader text="Level Pengguna" />
                <TableHeader text="Verifikasi" />
                <TableHeader text="Aksi" />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableData>
                    {user.nama}
                  </TableData>
                  <TableData>
                    {user.email}
                  </TableData>
                  <TableData>
                    {user.level == 0 ? 'Admin' : user.level == 1 ? 'Verifikator' : 'Pengguna Biasa'}
                  </TableData>
                  <TableData>
                    {user.verified_at ? 'Verified' : 'Unverified'}
                  </TableData>
                  <TableData>
                    <button onClick={() => {
                      setIsDetailModalOpen(true);
                      setCurrentId(user.id)
                    }} className="text-blue-600 font-medium hover:underline inline-flex items-center gap-0.5">
                      <EyeIcon size={16} />Lihat
                    </button>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-2 flex justify-end">
            <Pagination links={pagination} onBtnClick={setCurrentPage} />
          </div>
        </div>
      </div>
      {isAddVerifModalOpen && (
        <AddVerifikatorModal onCloseClicked={() => setIsAddVerifModalOpen(false)} />
      )}

      {isDetailModalOpen && <DetailUserModal id={currentId}
        onCloseClicked={() => setIsDetailModalOpen(false)}
        shouldRefresh={() => fetchUser()}
      />}
    </div >
  )
}