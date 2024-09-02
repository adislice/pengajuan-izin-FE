
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

export interface Izin {
    id: number
    user_id: number
    tanggal_mulai: string
    tanggal_selesai: string
    jenis_izin: string
    alasan: string
    komentar: any
    status: string
    created_at: string
    updated_at: string
    user: User
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