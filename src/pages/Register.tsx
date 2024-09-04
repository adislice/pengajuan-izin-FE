import TextInput from "@/components/TextInput";
import LoginIllustration from '@/assets/login_illustration.svg';
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { RegisterFormData } from "@/types";
import Swal from 'sweetalert2';
import Loading from "@/components/Loading";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import * as authService from '@/services/authService';
import { ucfirst } from "@/utils/helper";
import RadioButton from "@/components/RadioButton";
import { ChevronLeftIcon } from "lucide-react";

const RegisterFormSchema = yup.object().shape({
  nama: yup.string().required(),
  email: yup.string().email().required(),
  jenis_kelamin: yup.string().required(),
  tempat_lahir: yup.string().required(),
  tanggal_lahir: yup.string().required(),
  alamat: yup.string().required(),
  password: yup.string().required(),
  password_confirm: yup.string().oneOf([yup.ref("password")], "Password don't match").required()
})


export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterFormSchema)
  });
  useDocumentTitle("Register");

  function onSubmit(data: RegisterFormData) {
    setLoading(true);
    authService.register(data).then((user) => {
      Swal.fire({
        title: "Register Berhasil",
        text: "Register berhasil. Anda bisa melakukan login sekarang",
        icon: 'success'
      });
    }).catch((err) => {
      Swal.fire({
        title: "Register Gagal",
        text: err.message,
        icon: 'error'
      });
    })
      .finally(() => setLoading(false));
  }

  if (auth.authStatus == 'configuring') {
    return <Loading />
  } else {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-8">
        <div className="flex md:max-w-3xl flex-col md:flex-row rounded-lg shadow-xl w-full">
          <div className="w-full lg:w-5/6 flex items-center justify-center">
            <img src={LoginIllustration} className="max-w-md" alt="Login Illustration" />
          </div>
          <div className="w-full flex flex-col p-5">
            <Link to='/login' className="w-fit flex items-center justify-center py-1 rounded gap-2 hover:text-blue-500"><ChevronLeftIcon size={24} className="text-blue-500"/> Kembali ke Login</Link>
            <h1 className="font-bold text-2xl mb-5">Register</h1>
            <p className="text-gray-500 mb-4">Silahkan lengkapi form berikut untuk register</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="mb-2">
                  <TextInput name="nama" label="Nama" placeholder="Masukkan Nama" register={register} error={errors.nama?.message} />
                </div>
                <div className="mb-2">
                  <TextInput name="email" label="Email" placeholder="Masukkan Email" register={register} error={errors.email?.message} />
                </div>
                <div className="mb-2">
                  <h6 className="text-sm font-medium mb-1">Jenis Kelamin</h6>
                  <div className="flex gap-8">
                    <RadioButton name="jenis_kelamin" value="L" label="Laki-laki" register={register} />
                    <RadioButton name="jenis_kelamin" value="P" label="Perempuan" register={register} />
                  </div>
                  {errors.jenis_kelamin?.message && <p className="text-red-500 text-sm">{ucfirst(errors.jenis_kelamin?.message)}</p>}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="mb-2">
                    <TextInput name="tempat_lahir" label="Tempat Lahir" placeholder="Masukkan Tempat Lahir" register={register} error={errors.tempat_lahir?.message} />
                  </div>
                  <div className="mb-2">
                    <TextInput name="tanggal_lahir" type="date" label="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" register={register} error={errors.tanggal_lahir?.message} />
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor='alamat' className="block mb-1 text-sm font-medium dark:text-white">Alamat</label>
                  <textarea id="alamat"  {...register('alamat')} placeholder="Masukkan Alamat" className={`block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm focus:outline-none focus:ring-1 ${errors.alamat?.message ? 'border-red-400' : 'border-gray-300'}`}></textarea>
                  {errors.alamat?.message && <p className="text-red-500 text-sm">{ucfirst(errors.alamat?.message)}</p>}
                </div>
                <div className="mb-2">
                  <TextInput type="password" name="password" label="Password" placeholder="Masukkan Password" register={register} error={errors.password?.message} />
                </div>
                <div className="mb-2">
                  <TextInput type="password" name="password_confirm" label="Konfirmasi Password" placeholder="Masukkan Konfirmasi Password" register={register} error={errors.password_confirm?.message} />
                </div>

              <Button type="submit" disabled={loading}>{loading ? 'Sedang register...' : 'Register'}</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}