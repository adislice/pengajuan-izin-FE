import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { AddIzinFormData } from "@/types";
import { ucfirst } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { createIzin } from "@/services/izinService";
import Select from "@/components/Select";

interface AddIzinModalProps {
  onCloseClicked: () => void,
  onSuccess: () => void
}

const AddIzinSchema = yup.object().shape({
  tanggal_mulai: yup.string().required(),
  tanggal_selesai: yup.string().nullable().optional(),
  jenis_izin: yup.string().required(),
  alasan: yup.string().required(),
})

export default function AddIzinModal({ onCloseClicked, onSuccess }: AddIzinModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AddIzinFormData>({
    resolver: yupResolver(AddIzinSchema)
  });

  function onSubmit(data: AddIzinFormData) {
    Swal.fire("Menyimpan data...")
    Swal.showLoading()
    createIzin(data).then(_res => {
      Swal.fire({
        title: 'Sukses',
        text: "Berhasil menambah user izin",
        icon: 'success'
      }).then((result) => {
        if (result.isConfirmed) {
          onSuccess();
          onCloseClicked();
        }
      });
    }).catch((error) => {
      Swal.fire({
        title: 'Kesalahan',
        text: error.message,
        icon: 'error'
      });
    });
  }

  return (
    <Modal>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-white flex flex-col rounded-lg w-full max-w-xl max-h-[calc(100vh-2rem)]">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold">Tambah Izin</h1>
            <button onClick={onCloseClicked} className="p-1 hover:bg-gray-200 rounded-full"><XIcon size={20} /></button>
          </div>
          <div className="grow overflow-y-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="mb-3">
                <TextInput name="tanggal_mulai" type="date" label="Tanggal Mulai" register={register} error={errors.tanggal_mulai?.message} />
              </div>
              <div className="mb-3">
                <TextInput name="tanggal_selesai" type="date" label="Tanggal Selesai (opsional)" register={register} error={errors.tanggal_selesai?.message}/>
              </div>
              <div className="mb-3">
                <Select name="jenis_izin" label="Jenis Izin" register={register} error={errors.jenis_izin?.message}>
                  <option value="Libur Sakit">Libur Sakit</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Urusan Keluarga">Urusan Keluarga</option>
                  <option value="Lainnya">Lainnya</option>
                </Select>
              </div>
              <div className="mb-3">
                <h6 className="text-sm font-medium mb-1">Alasan</h6>
                <textarea id="message" rows={4} {...register('alasan')} className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm focus:outline-none focus:ring-1" ></textarea>
                { errors.alasan?.message && <p className="text-red-500 text-sm">{ ucfirst(errors.alasan?.message ) }</p>}
              </div>
              <Button type="submit">Simpan</Button>
            </form>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
    </Modal>
  );
}