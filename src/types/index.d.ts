export interface Navigation {
  title: string;
  path: string;
}

export interface faq {
  answer: string;
  question: string;
}

export interface download {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  category: string;
  uploadDate: string;
}

export interface Dosen {
  id: number;
  nama: string;
  nip: string;
  bidangKeahlian: string;
  foto: string;
  email?: string;
}

export interface Laboratorium {
  id: number;
  nama: string;
  kepalaLab: string;
  teknisi: string[];
  fasilitas: string[];
  foto: string;
}

export interface StrukturJabatan {
  jabatan: string;
  nama: string;
  foto: string;
}

export interface Prestasi {
  id: number;
  judul: string;
  tahun: string;
  deskripsi: string;
  kategori: "mahasiswa" | "dosen" | "jurusan";
}

export interface Sertifikasi {
  id: number;
  nama: string;
  tahun: string;
  deskripsi: string;
  logo?: string;
}

export interface KerjasamaIndustri {
  id: number;
  namaPerusahaan: string;
  bidang: string;
  tahunMulai: string;
  logo: string;
}
