import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import { useAuth } from "@/context/AuthProvider";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { acceptIzin, cancelIzin, getIzin, rejectIzin, reviseIzin } from "@/services/izinService";
import { Izin } from "@/types";
import { ucfirst } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import * as yup from 'yup';

interface DetailIzinModalProps {
  id: number,
  onCloseClicked: () => void,
  shouldRefresh: () => void
}

const KomentarSchema = yup.object().shape({
  komentar: yup.string().required()
})

export default function DetailIzinModal({ id, onCloseClicked, shouldRefresh }: DetailIzinModalProps) {
  const [izin, setIzin] = useState<Izin | undefined>();
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<yup.InferType<typeof KomentarSchema>>({
    resolver: yupResolver(KomentarSchema),
    mode: 'onChange'
  });
  useDocumentTitle('Detail Izin');

  function fetchIzinDetail() {
    Swal.fire({ title: 'Loading...' });
    Swal.showLoading();
    getIzin(id).then(data => {
      setIzin(data);
      Swal.close()
    }).catch(err => {
      Swal.fire({
        title: 'Kesalahan',
        text: err.message,
        icon: 'error'
      });
      onCloseClicked();
    });
  }

  useEffect(() => {
    fetchIzinDetail();
  }, [id])

  useEffect(() => {
    trigger();
  }, [izin])

  function accIzin() {
    if (!izin) return;
    if (errors.komentar) return;
    Swal.fire({
      title: "Anda Yakin?",
      text: "Apakah Anda yakin ingin meng-ACC izin ini?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yakin'
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({ title: "Loading..." })
        Swal.showLoading();
        acceptIzin(izin?.id, getValues().komentar).then(() => {
          Swal.fire({
            title: 'Sukses',
            text: "Berhasil meng-ACC izin",
            icon: 'success',
          }).then(() => {
            fetchIzinDetail();
            shouldRefresh();
          });
        }).catch(err => {
          Swal.fire({
            title: "Kesalahan",
            text: "Gagal meng-ACC izin",
            icon: "error"
          })
        })
      }
    })
  }

  function tolakIzin() {
    if (!izin) return;
    if (errors.komentar) return;
    Swal.fire({
      title: "Anda Yakin?",
      text: "Apakah Anda yakin ingin menolak izin ini?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yakin'
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({ title: "Loading..." })
        Swal.showLoading();
        rejectIzin(izin?.id, getValues().komentar).then(() => {
          Swal.fire({
            title: 'Sukses',
            text: "Berhasil menolak izin",
            icon: 'success',
          }).then(() => {
            fetchIzinDetail();
            shouldRefresh();
          });
        }).catch(err => {
          Swal.fire({
            title: "Kesalahan",
            text: "Gagal menolak izin",
            icon: "error"
          })
        })
      }
    })
  }

  function revisiIzin() {
    if (!izin) return;
    if (errors.komentar) return;
    Swal.fire({
      title: "Anda Yakin?",
      text: "Apakah Anda yakin ingin meminta revisi izin ini?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yakin'
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({ title: "Loading..." })
        Swal.showLoading();
        reviseIzin(izin?.id, getValues().komentar).then(() => {
          Swal.fire({
            title: 'Sukses',
            text: "Berhasil meminta revisi izin",
            icon: 'success',
          }).then(() => {
            fetchIzinDetail();
            shouldRefresh();
          });
        }).catch(err => {
          Swal.fire({
            title: "Kesalahan",
            text: "Gagal meminta revisi izin",
            icon: "error"
          })
        })
      }
    })
  }

  function batalkanIzin() {
    if (!izin) return;
    Swal.fire({
      title: "Anda Yakin?",
      text: "Apakah Anda yakin ingin membatalkan izin ini?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yakin'
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({ title: "Loading..." })
        Swal.showLoading();
        cancelIzin(izin?.id).then(() => {
          Swal.fire({
            title: 'Sukses',
            text: "Berhasil membatalkan izin",
            icon: 'success',
          }).then(() => {
            fetchIzinDetail();
            shouldRefresh();
          });
        }).catch(err => {
          Swal.fire({
            title: "Kesalahan",
            text: "Gagal membatalkan izin",
            icon: "error"
          })
        })
      }
    });
  }

  return izin ? (
    <Modal>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-white flex flex-col rounded-lg w-full max-w-xl max-h-[calc(100vh-2rem)]">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold">Detail Izin</h1>
            <button onClick={onCloseClicked} className="p-1 hover:bg-gray-200 rounded-full"><XIcon size={20} /></button>
          </div>

          <div className="flex flex-col grow overflow-y-auto p-4">
            <div className="mb-3">
              <div className="font-semibold text-sm text-gray-500">Nama</div>
              <div>{izin.user.nama}</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-sm text-gray-500">Tanggal Mulai</div>
              <div>{izin.tanggal_mulai}</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-sm text-gray-500">Tanggal Selesai</div>
              <div>{izin.tanggal_selesai}</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-sm text-gray-500">Jenis Izin</div>
              <div>{izin.jenis_izin}</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-sm text-gray-500">Alasan</div>
              <div>{izin.alasan}</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold text-sm text-gray-500">Status</div>
              <div className={`rounded text-sm px-2 py-0.5 w-fit text-white ${izin.status == 'diajukan' ? 'bg-yellow-500' : izin.status == 'direvisi' ? 'bg-blue-500' : izin.status == 'diterima' ? 'bg-green-500' : 'bg-red-500'}`}>
                {ucfirst(izin.status)}
              </div>
            </div>
            {izin.komentar && (
              <div className="mb-3">
                <div className="font-semibold text-sm text-gray-500">Komentar</div>
                <p>{izin.komentar}</p>
              </div>
            )}

            {(['diajukan', 'direvisi'].includes(izin.status) && auth.user?.level == 2) && (
              <Button className="bg-red-500 hover:bg-red-600" onClick={batalkanIzin}>Batalkan</Button>
            )}

            {(['diajukan', 'direvisi'].includes(izin.status) && auth.user?.level == 1) && (<>
              <hr />
              <div className="mt-4">
                <div className="font-semibold  text-gray-700">ACC/Tolak/Minta Revisi</div>
                <div className="font-semibold text-sm text-gray-500">Komentar</div>
                <textarea id="message" rows={3} {...register('komentar')} disabled={izin.status == 'diterima' || izin.status == 'ditolak' || auth.user?.level != 1} className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm focus:outline-none focus:ring-1" >{izin.komentar}</textarea>
                {errors.komentar?.message && <p className="text-red-500 text-sm">{ucfirst(errors.komentar?.message)}</p>}
                
                  <div className="flex my-2 gap-1 justify-stretch">
                    <Button onClick={accIzin} className="bg-green-500 hover:bg-green-600 flex-1 basis-40">ACC</Button>
                    <Button onClick={tolakIzin} className="bg-red-500 hover:bg-red-600 flex-1 basis-40">Tolak</Button>
                    <Button onClick={revisiIzin} className="flex-1 basis-40">Minta Revisi</Button>
                  </div>
                
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
}