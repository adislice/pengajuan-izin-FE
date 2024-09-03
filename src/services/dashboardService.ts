import axios, { AxiosError } from "axios";

export async function getDashboard() {
    try {
        const res = await axios.get('dashboard');
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.data.message) {
                throw new Error(err.response?.data.message);
            }
        }
        throw new Error("Gagal mengambil dashboard!");
    }
}