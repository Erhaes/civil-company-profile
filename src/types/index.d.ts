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

export interface RuangLaboratorium {
  id: number;
  ruang: string;
  kode: string;
  nama: string;
  deskripsi: string;
  foto: string;
}

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  image: string;
}

export interface Research {
  id: number;
  title: string;
  abstract: string;
  authors: string[];
  year: number;
  keywords: string[];
  publication: string;
  link: string;
}

export interface FacilityType {
  id: number;
  name: string;
}

export interface Gear {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  image: string;
  type: FacilityType;
  room: string;
  gears: Gear[];
}

export interface TestImage {
  id: number;
  image: string;
}

export interface TestUnit {
  id: number;
  name: string;
}

export interface Test {
  id: number;
  name: string;
  description: string;
  images: TestImage[];
  minimum_unit: number;
  daily_slot: number;
  is_active: boolean;
  laboratory: Facility;
  unit: TestUnit;
}