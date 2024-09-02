import { AddIzinFormData } from "@/types";
import { parseErrors } from "@/utils/helper";
import axios, { AxiosError } from "axios";

export async function getAllIzin(page: string, filter: string) {
    const url = page ? page : 'izin';
    try {
        const res = await axios.get(`${url}?status=${filter}`);
        return res.data;
    } catch (error) {
        throw new Error("Gagal mengambil data izin!");
    }
}

export async function getIzin(id: number) {
    try {
        const res = await axios.get(`izin/${id}`);
        return res.data;
    } catch (error) {
        throw new Error("Gagal mengambil data izin!");
    }
}

export async function acceptIzin(id: number, comment: string) {
    try {
        const res = await axios.put(`izin/${id}/accept`, { komentar: comment });
        return res.data;
    } catch (error) {
        throw new Error("Gagal meng-ACC izin!");
    }
}

export async function rejectIzin(id: number, comment: string) {
    try {
        const res = await axios.put(`izin/${id}/reject`, { komentar: comment });
        return res.data;
    } catch (error) {
        throw new Error("Gagal menolak izin!");
    }
}

export async function reviseIzin(id: number, comment: string) {
    try {
        const res = await axios.put(`izin/${id}/revise`, { komentar: comment });
        return res.data;
    } catch (error) {
        throw new Error("Gagal revisi izin!");
    }
}

export async function createIzin(body: AddIzinFormData) {
    try {
        const res = await axios.post('izin', body);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status == 422) {
                const errorsMsg = parseErrors(err.response?.data.errors)
                throw new Error(errorsMsg);
            } else if (err.response?.data.message) {
                throw new Error(err.response?.data.message);
            }
        }
        throw new Error("Gagal menambah izin!");
    }
}