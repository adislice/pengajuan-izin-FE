import TextInput from "@/components/TextInput";
import LoginIllustration from '@/assets/login_illustration.svg';
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { LoginFormData } from "@/types";

const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema)
  });

  function onSubmit(data: LoginFormData) {
    console.log(data);
    auth.login({
      email: 'adi',
      password:'ass'
    }, 0).then(() => {
      navigate(from, { replace: true });
    })
    
  }

  useEffect(() => {
    document.title = "Login";
  }, [])

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
            <Button type="submit" disabled={auth?.isLoading}>{ auth?.isLoading ? 'Loading...' : 'Login' }</Button>
          </form>
        </div>
      </div>


    </div>
  );
}