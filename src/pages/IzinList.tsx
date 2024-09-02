import Button from "@/components/Button";
import DetailIzinModal from "@/components/DetailIzinModal";
import { Dropdown } from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from "@/components/Table";
import { useAuth } from "@/context/AuthProvider";
import { getAllIzin } from "@/services/izinService";
import { Izin, User } from "@/types";
import { ucfirst } from "@/utils/helper";
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';

type FilterStatus = '' | 'diajukan' | 'direvisi' | 'diterima' | 'ditolak';

export default function IzinList() {
  const [isAddIzinModalOpen, setIsAddIzinModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [pagination, setPagination] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState('');
  const [izins, setIzins] = useState<Izin[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('');
  const auth = useAuth();

  function fetchIzin() {
    const page = currentPage;
    getAllIzin(page, filter).then((data) => {
      setIzins(data.data);
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
    fetchIzin();
  }, [currentPage, filter])

  return (
    <div className="flex w-full mx-auto bg-gray-100">
      <div className="w-4/5 flex flex-col px-10 py-8 mx-auto">
        <div className="flex">
          <div>
            <h1 className="text-xl font-bold">Daftar Izin</h1>
            <p className="text-gray-500">Kelola data izin yang diajukan</p>
          </div>
          <div className="ms-auto">
            {auth.user?.level == 2 &&
              <Button onClick={() => setIsAddIzinModalOpen(true)}>Ajukan Izin</Button>
            }
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white my-4 shadow">
          <div className="my-2 ">
            <Dropdown text={ucfirst(filter == '' ? 'Semua' : filter)}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <div onClick={() => setFilter('')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Semua
                  </div>
                  <div onClick={() => setFilter('diajukan')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Diajukan
                  </div>
                  <div onClick={() => setFilter('direvisi')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Direvisi
                  </div>
                  <div onClick={() => setFilter('diterima')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Diterima
                  </div>
                  <div onClick={() => setFilter('ditolak')} className="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Ditolak
                  </div>
                </li>

              </ul>
            </Dropdown>

          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader text="Nama" />
                <TableHeader text="Tanggal Mulai" />
                <TableHeader text="Tanggal Selesai" />
                <TableHeader text="Jenis Izin" />
                <TableHeader text="Status" />
                <TableHeader text="Aksi" />
              </TableRow>
            </TableHead>
            <TableBody>
              {izins.map(izin => (
                <TableRow key={izin.id}>
                  <TableData>
                    {izin.user.nama}
                  </TableData>
                  <TableData>
                    {izin.tanggal_mulai}
                  </TableData>
                  <TableData>
                    {izin.tanggal_selesai}
                  </TableData>
                  <TableData>
                    {izin.jenis_izin}
                  </TableData>
                  <TableData>
                    <span className={`rounded text-sm px-2 py-0.5 text-white ${izin.status == 'diajukan' ? 'bg-yellow-500' : izin.status == 'direvisi' ? 'bg-blue-500' : izin.status == 'diterima' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {ucfirst(izin.status)}
                    </span>
                  </TableData>
                  <TableData>
                    <button onClick={() => {
                      setIsDetailModalOpen(true);
                      setCurrentId(izin.id)
                    }} className="text-blue-600 hover:underline">
                      Lihat
                    </button>
                  </TableData>
                </TableRow>
              ))}
              {izins.length == 0 && (
                <TableRow>
                  <td colSpan={6} className="text-center p-3">Tidak ada data</td>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-2 flex justify-end">
            <Pagination links={pagination} onBtnClick={setCurrentPage} />
          </div>
        </div>
      </div>
      {/* {isAddVerifModalOpen && (
        <AddVerifikatorModal onCloseClicked={() => setIsAddVerifModalOpen(false)} />
      )} */}

      {isDetailModalOpen && <DetailIzinModal id={currentId}
        onCloseClicked={() => setIsDetailModalOpen(false)}
        shouldRefresh={() => fetchIzin()}
      />}
    </div >
  )
}