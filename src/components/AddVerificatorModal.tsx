import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import RadioButton from "@/components/RadioButton";
import TextInput from "@/components/TextInput";
import { AddVerificatorFormData } from "@/types";
import { ucfirst } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

interface AddVerificationModalProps {
  onCloseClicked: () => void
}

const AddVerificatorSchema = yup.object().shape({
  nama: yup.string().required(),
  email: yup.string().email().required(),
  tempat_lahir: yup.string().required(),
  tanggal_lahir: yup.string().required(),
  jenis_kelamin: yup.string().required(),
  alamat: yup.string().required(),
  password: yup.string().required()
})

export default function AddVerificationModal({ onCloseClicked }: AddVerificationModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AddVerificatorFormData>({
    resolver: yupResolver(AddVerificatorSchema)
  });

  function onSubmit(data: AddVerificatorFormData) {
    console.log(data);
  }
  return (
    <Modal>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-white flex flex-col rounded-lg w-full max-w-xl max-h-[calc(100vh-2rem)]">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold">Tambah Verifikator</h1>
            <button onClick={onCloseClicked} className="p-1 hover:bg-gray-200 rounded-full"><XIcon size={20} /></button>
          </div>
          <div className="grow overflow-y-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="mb-3">
                <TextInput name="nama" label="Nama" register={register} error={errors.nama?.message} />
              </div>
              <div className="mb-3">
                <TextInput name="email" label="Email" register={register} error={errors.email?.message}/>
              </div>
              <div className="mb-3">
                <TextInput name="tempat_lahir" label="Tempat Lahir" register={register} error={errors.tempat_lahir?.message}/>
              </div>
              <div className="mb-3">
                <TextInput name="tanggal_lahir" label="Tanggal Lahir" type="date" register={register} error={errors.tanggal_lahir?.message}/>
              </div>
              <div className="mb-3">
                <h6 className="text-sm font-medium mb-1">Jenis Kelamin</h6>
                <div className="flex gap-8">
                    <RadioButton name="jenis_kelamin" value="L" label="Laki-laki" register={register} />
                    <RadioButton name="jenis_kelamin" value="P" label="Perempuan" register={register} />
                </div>
                { errors.jenis_kelamin?.message && <p className="text-red-500 text-sm">{ ucfirst(errors.jenis_kelamin?.message ) }</p>}
              </div>
              <div className="mb-3">
                <h6 className="text-sm font-medium mb-1">Alamat</h6>
                <textarea id="message" rows={4} {...register('alamat')} className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm focus:outline-none focus:ring-1" ></textarea>
                { errors.alamat?.message && <p className="text-red-500 text-sm">{ ucfirst(errors.alamat?.message ) }</p>}
              </div>
              <div className="mb-3">
                <TextInput name="password" label="Password" type="password" register={register} error={errors.password?.message} />
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