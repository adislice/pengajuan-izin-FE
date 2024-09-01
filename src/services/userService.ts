import { AddVerifikatorFormData, User } from "@/types";
import { parseErrors } from "@/utils/helper";
import axios, { AxiosError } from "axios";

export async function createVerifikator(body: AddVerifikatorFormData) {
    try {
        const res = await axios.post('user/create-verifikator', body);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status == 403) 
                throw new Error("Anda tidak memiliki izin untuk melakukan operasi ini!");
            else if (err.response?.status == 422) {
                const errorsMsg = parseErrors(err.response?.data.errors)
                throw new Error(errorsMsg);
            }
        }
        throw new Error("Gagal menambah user verifikator!");
    }
}

export async function getAllUser(page?: string) {
    const url = page ? page : 'user';
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw new Error("Gagal mengambil data user!");
    }
}

export async function getUser(id:number) {
    try {
        const res = await axios.get(`user/${id}`);
        return res.data;
    } catch (error) {
        throw new Error("Gagal mengambil data user!");
    }
}

export async function promoteUser(id:number) {
    try {
        const res = await axios.put(`user/${id}/promote`);
        return res.data;
    } catch (error) {
        throw new Error("Gagal mengambil data user!");
    }
}