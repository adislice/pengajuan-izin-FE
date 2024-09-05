import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/context/AuthProvider";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { changePassword } from "@/services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from 'yup';

const UbahPasswordSchema = yup.object().shape({
  old_password: yup.string().required(),
  new_password: yup.string().min(6).required()
});

type UbahPasswordFormData = yup.InferType<typeof UbahPasswordSchema>;

export default function Profil() {
  const { user } = useAuth();
  const {register, handleSubmit, formState: { errors }, reset} = useForm<UbahPasswordFormData>({
    resolver: yupResolver(UbahPasswordSchema)
  });
  useDocumentTitle("Profil");

  function handleChangePassword(data: UbahPasswordFormData) {
    Swal.fire({title: 'Mengubah password...'});
    Swal.showLoading();
    changePassword(data.old_password, data.new_password).then(() => {
      Swal.fire({
        title: "Sukses",
        text: "Berhasil mengubah password",
        icon: 'success'
      });
      reset();
    }).catch(err => {
      Swal.fire({
        title: "Kesalahan",
        text: err.message,
        icon: 'error'
      });
    })
  }

  return (
    <div className="flex w-full mx-auto bg-gray-100">
      <div className="w-full md:w-4/5 flex flex-col px-6 py-6 md:px-10 md:py-8 mx-auto">
        <div className="flex">
          <div>
            <h1 className="text-xl font-bold">Profil</h1>
            <p className="text-gray-500">Profil Akun Anda</p>
          </div>
        </div>
        <div className="p-5 rounded-lg bg-white my-4 shadow flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Nama</div>
                <div>{user?.nama}</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Email</div>
                <div>{user?.email}</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Jenis Kelamin</div>
                <div>{user?.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'}</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Tempat Lahir</div>
                <div>{user?.tempat_lahir}</div>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Tanggal Lahir</div>
                <div>{user?.tanggal_lahir}</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Alamat</div>
                <div>{user?.alamat}</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Level</div>
                <div>{user?.level == 0 ? 'Admin' : user?.level == 1 ? 'Verifikator' : 'User'}</div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm text-gray-500">Status Verifikasi</div>
                <div><span className={`${user?.verified_at ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-lg px-2 text-sm py-0.5`}>{user?.verified_at ? 'Diverifikasi' : 'Belum Diverifikasi'}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-white shadow flex flex-col">
          <h1 className="font-semibold">Ubah Password</h1>
          <p className="text-gray-500 mb-4 text-sm ">Masukkan password lama dan password baru untuk mengubah password Anda</p>
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="mb-2 flex-1">
                <TextInput name="old_password" label="Password Lama" placeholder="Masukkan password lama" register={register} error={errors.old_password?.message} />
              </div>
              <div className="mb-2 flex-1">
                <TextInput name="new_password" label="Password Baru" placeholder="Masukkan password baru" register={register} error={errors.new_password?.message}/>
              </div>
              <div className="mb-2 flex-1">
              <label className="block mb-1 text-sm font-medium dark:text-white">&nbsp;</label>
              <Button type="submit">Update</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}