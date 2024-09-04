import TextInput from "@/components/TextInput";
import LoginIllustration from '@/assets/login_illustration.svg';
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { LoginFormData } from "@/types";
import Swal from 'sweetalert2';
import Loading from "@/components/Loading";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ChevronRightIcon } from "lucide-react";

const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema)
  });
  useDocumentTitle("Login");

  function onSubmit(data: LoginFormData) {
    setLoading(true);
    auth.login(data).then((user) => {
      Swal.fire({
        title: "Login Berhasil",
        text: "Selamat datang, " + user.nama + '!',
        icon: 'success'
      });
      navigate(from, { replace: true });
    }).catch(() => {
      Swal.fire({
        title: "Login Gagal",
        text: "Silahkan perika kembali email dan password",
        icon: 'error'
      });
    })
    .finally(() => setLoading(false));
  }

  if (auth.authStatus == 'configuring') {
    return <Loading />
  } else {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="flex md:max-w-2xl flex-col md:flex-row rounded-lg shadow-xl w-full">
          <div className="w-full flex items-center justify-center">
            <img src={LoginIllustration} className="max-w-md" alt="Login Illustration" />
          </div>
          <div className="w-full flex flex-col p-5">
            <h1 className="font-bold text-2xl mb-5">Login</h1>
            <p className="text-gray-500 mb-4">Silahkan masukkan email dan password untuk login</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="mb-3">
                <TextInput name="email" label="Email" placeholder="Masukkan Email" register={register} error={errors.email?.message} />
              </div>
              <div className="mb-3">
                <TextInput type="password" name="password" label="Password" placeholder="Masukkan Password" register={register} error={errors.password?.message} />
              </div>
              <Button type="submit" disabled={loading}>{ loading ? 'Sedang login...' : 'Login' }</Button>
              <p className="text-sm mt-2 flex">Belum punya akun? <Link to='/register' className="w-fit inline-flex items-center justify-center ms-1 rounded gap-1 text-blue-500 hover:underline">Register</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
}