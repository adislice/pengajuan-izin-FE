import { Modal } from "@/components/Modal";
import { getUser, promoteUser } from "@/services/userService";
import { User } from "@/types";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

interface DetailUserModalProps {
  id: number,
  onCloseClicked: () => void,
  shouldRefresh: () => void
}

export default function DetailUserModal({ id, onCloseClicked, shouldRefresh }: DetailUserModalProps) {
  const [user, setUser] = useState<User | undefined>();

  function fetchUserDetail() {
    Swal.fire({title: 'Loading...'});
    Swal.showLoading();
    getUser(id).then(data => {
      setUser(data);
    }).catch(err => {
      Swal.fire({
        title: 'Kesalahan',
        text: err.message,
        icon: 'error'
      });
    }).finally(() => Swal.close())
  }
  useEffect(() => {
    fetchUserDetail();
  }, [id])
  
  function changeUserLevel() {
    if (!user) return;
    Swal.fire({
      title: "Anda Yakin?",
      text: "Apakah Anda yakin ingin mengubah level user menjadi verifikator?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yakin'
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({ title: "Loading..."})
        Swal.showLoading();
        promoteUser(user?.id).then(() => {
          Swal.fire({
            title: 'Sukses',
            text: "Berhasil mengubah level",
            icon: 'success',
          }).then(() => {
            fetchUserDetail();
            shouldRefresh();
          });
          
        }).catch(err => {
          Swal.fire({
            title: "Kesalahan",
            text: "Gagal mengubah level",
            icon: "error"
          })
        })
      }
    })
  }
  return user ? (
    <Modal>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-white flex flex-col rounded-lg w-full max-w-xl max-h-[calc(100vh-2rem)]">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold">Detail User</h1>
            <button onClick={onCloseClicked} className="p-1 hover:bg-gray-200 rounded-full"><XIcon size={20} /></button>
          </div>

          
          <div className="flex flex-col grow overflow-y-auto p-4">
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Nama</div>
                <div>{user.nama}</div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Email</div>
                <div>{user.email}</div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Jenis Kelamin</div>
                <div>{user.jenis_kelamin}</div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Tempat, Tanggal Lahir</div>
                <div>{user.tempat_lahir}, {user.tanggal_lahir}</div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Alamat</div>
                <div>{user.alamat}</div>
              </div>
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Level Pengguna</div>
                <div>{user.level == 0 ? 'Admin' : user.level == 1 ? 'Verifikator' : 'Pengguna Biasa'}</div>
                {user.level == 2 && (
                  <button onClick={changeUserLevel} className="text-sm p-2 text-blue-600 rounded bg-blue-100">Ubah ke Verifikator</button>
                )}
              </div>
            </div>
        </div>
      </div>
    </Modal>
  ) : null;
}