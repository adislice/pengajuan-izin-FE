import AddVerifikatorModal from "@/components/AddVerifikatorModal";
import Button from "@/components/Button";
import DetailUserModal from "@/components/DetailUserModal";
import Pagination from "@/components/Pagination";
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from "@/components/Table";
import { getAllUser } from "@/services/userService";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function UserList() {
  const [isAddVerifModalOpen, setIsAddVerifModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [pagination, setPagination] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  function fetchUser() {
    const page = currentPage;
    getAllUser(page).then((data) => {
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

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    fetchUser();
  }, [currentPage])
  
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

        <div className="p-3 rounded-lg bg-white my-4 shadow">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader text="Nama" />
                <TableHeader text="Email" />
                <TableHeader text="Level Pengguna" />
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
                    <button onClick={() => {
                      setIsDetailModalOpen(true);
                      setCurrentId(user.id)
                    }}>
                      Lihat
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