import Image from "next/image";
import Link from "next/link";
import type { Facility } from "@/types";

const facility: Facility = {
  id: 1,
  name: "Laboratorium Geoteknik",
  description:
    "Laboratorium Geoteknik adalah fasilitas yang digunakan untuk penelitian dan pengujian material tanah, serta analisis stabilitas lereng dan pondasi.",
  image: "/images/facilities/geoteknik.jpg",
  type: {
    id: 1,
    name: "Laboratorium",
  },
  gears: [
    {
      id: 1,
      name: "Alat Uji Tanah",
      description:
        "Alat yang digunakan untuk menguji sifat fisik dan mekanik tanah.",
      image: "/images/facilities/alat-uji-tanah.jpg",
    },
    {
      id: 2,
      name: "Alat Uji Pondasi",
      description:
        "Alat yang digunakan untuk menguji kekuatan dan stabilitas pondasi.",
      image: "/images/facilities/alat-uji-pondasi.jpg",
    },
  ],
  room: "D.101",
};

export default function FacilityDetail() {
  return (
    <main>
      {/* Header */}
      <section className="bg-sipil-base text-light-base section-padding-x pt-28 pb-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Facility Image */}
            <div className="md:w-1/2">
              <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Facility Details */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <Link 
                  href="/fasilitas" 
                  className="text-blue-300 hover:text-white flex items-center text-sm"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                  </svg>
                  Kembali ke Fasilitas
                </Link>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500 bg-opacity-20 text-blue-100 rounded-full">
                  {facility.type.name}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{facility.name}</h1>
              
              <div className="flex items-center text-sm mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
                <span>Ruangan: {facility.room}</span>
              </div>
              
              <p className="text-light-base/80 mb-6 leading-relaxed">
                {facility.description}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Jumlah Peralatan:</span>
                <span className="bg-blue-500 bg-opacity-20 text-xs font-medium px-2 py-1 rounded-full">
                  {facility.gears.length} Peralatan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="bg-light-base text-dark-base section-padding-x py-12">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Daftar Peralatan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facility.gears.map((gear) => (
              <div 
                key={gear.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={gear.image}
                    alt={gear.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-sipil-base mb-2">{gear.name}</h3>
                  <p className="text-gray-600 text-sm">{gear.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-gray-50 text-dark-base section-padding-x py-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Informasi Penggunaan</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Prosedur Peminjaman</h3>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>Ajukan permohonan peminjaman melalui sistem informasi laboratorium</li>
                  <li>Tunggu persetujuan dari kepala laboratorium</li>
                  <li>Isi formulir peminjaman peralatan</li>
                  <li>Serahkan KTM/kartu identitas sebagai jaminan</li>
                  <li>Peralatan dapat digunakan sesuai jadwal yang telah disetujui</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Jadwal Operasional</h3>
                <table className="min-w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Senin - Jumat</td>
                      <td className="py-2">08:00 - 16:00 WIB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Sabtu</td>
                      <td className="py-2">08:00 - 12:00 WIB</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Minggu & Hari Libur</td>
                      <td className="py-2">Tutup</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Kepala Laboratorium</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden relative">
                  <Image 
                    src="/images/staff/placeholder-profile.jpg" 
                    alt="Kepala Laboratorium" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Dr. Ir. Ahmad Fauzi, M.T.</p>
                  <p className="text-sm text-gray-600">NIP. 198505152010121002</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Hubungi Kami</h3>
              <div className="flex flex-wrap gap-y-3">
                <a 
                  href="mailto:geoteknik.sipil@unsoed.ac.id" 
                  className="flex items-center mr-6 text-sipil-base hover:text-sipil-secondary"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>geoteknik.sipil@unsoed.ac.id</span>
                </a>
                <a 
                  href="tel:+62281123456" 
                  className="flex items-center text-sipil-base hover:text-sipil-secondary"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>(0281) 123456</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}