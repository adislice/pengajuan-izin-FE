
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
    level: number,
    verified_at?: string
}

export type AddVerifikatorFormData = {
    nama: string;
    email: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat: string;
    password: string;
}