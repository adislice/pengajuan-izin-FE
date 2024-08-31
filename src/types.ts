
export type LoginFormData = {
    email: string;
    password: string;
}

export interface User {
    id: number,
    nama: string,
    email: string,
    tempat_lahir: string,
    tanggal_lahir: string,
    jenis_kelamin: string,
    alamat: string,
    level: number
}

export type AddVerificatorFormData = {
    nama: string;
    email: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat: string;
    password: string;
}