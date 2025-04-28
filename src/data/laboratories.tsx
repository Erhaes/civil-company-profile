import { RuangLaboratorium } from "@/types";

const laboratories: RuangLaboratorium[] = [
  {
    id: 1,
    nama: "Laboratorium Struktur",
    deskripsi:
      "Melakukan pengujian material bangunan, analisis struktur, dan simulasi gempa untuk konstruksi bangunan.",
    foto: "/images/labs/lab-struktur.jpg",
  },
  {
    id: 2,
    nama: "Laboratorium Geoteknik",
    deskripsi:
      "Fokus pada penelitian tanah, fondasi, dan geologi teknik untuk konstruksi bangunan dan infrastruktur.",
    foto: "/images/labs/lab-geoteknik.jpg",
  },
  {
    id: 3,
    nama: "Laboratorium Hidrolika",
    deskripsi:
      "Meneliti aliran air, sistem drainase, dan desain struktur hidraulik untuk infrastruktur pengendalian air.",
    foto: "/images/labs/lab-hidrolika.jpg",
  },
  {
    id: 4,
    nama: "Laboratorium Transportasi",
    deskripsi:
      "Mengkaji sistem transportasi, perkerasan jalan, dan manajemen lalu lintas untuk infrastruktur transportasi.",
    foto: "/images/labs/lab-transportasi.jpg",
  },
];

export default laboratories;
