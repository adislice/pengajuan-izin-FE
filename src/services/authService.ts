import { LoginFormData, RegisterFormData } from "@/types";
import { parseErrors } from "@/utils/helper";
import axios, { AxiosError } from "axios";


export async function login(body: LoginFormData) {
    try {
        const response = await axios.post('/auth/login', body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status == 422) {
                const errorsMsg = parseErrors(error.response?.data.errors)
                throw new Error(errorsMsg);
            }
        }
        throw error;
    }
}

export async function register(body: RegisterFormData) {
    try {
        await axios.post('/auth/register', body);
        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status == 422) {
                const errorsMsg = parseErrors(error.response?.data.errors)
                throw new Error(errorsMsg);
            }
        }
        throw error;
    }
}

export async function changePassword(oldPassword: string, newPassword: string) {
    try {
        await axios.put('/auth/change-password', { old_password: oldPassword, new_password: newPassword });
        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status == 422) {
                const errorsMsg = parseErrors(error.response?.data.errors)
                throw new Error(errorsMsg);
            }
            if (error.response?.data?.message) {
                throw new Error(error.response?.data?.message);
            }
        }
        throw new Error("Gagal mengubah password");
    }
}