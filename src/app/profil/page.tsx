"use client";

import { NextPage } from "next";
import { useState } from "react";
import {
  strukturOrganisasi,
  dosenList,
  kerjasamaList,
  labList,
  prestasiList,
  sertifikasiList,
} from "@/data/profile";
import ProfileHeader from "@/components/Profile/ProfileHeader";

const ProfilPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>("struktur");

  return (
    <>
      <ProfileHeader />
      <section className="bg-light-base text-dark-base dark:bg-dark-base dark:text-light-base section-padding-x">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide py-2 space-x-4">
            <button
              onClick={() => setActiveTab("struktur")}
              className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "struktur"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Struktur Organisasi
            </button>
            <button
              onClick={() => setActiveTab("dosen")}
              className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "dosen"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Dosen dan Tenaga Pengajar
            </button>
            <button
              onClick={() => setActiveTab("laboratorium")}
              className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "laboratorium"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pengurus Laboratorium
            </button>
            <button
              onClick={() => setActiveTab("prestasi")}
              className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "prestasi"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Prestasi dan Pencapaian
            </button>
            <button
              onClick={() => setActiveTab("sertifikasi")}
              className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "sertifikasi"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sertifikasi & Akreditasi
            </button>
            <button
              onClick={() => setActiveTab("kerjasama")}
              className={`py-2 px-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "kerjasama"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Kerjasama Industri dan Alumni
            </button>
          </div>
          {/* Struktur Organisasi */}
          {activeTab === "struktur" && (
            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                Struktur Organisasi
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Diagram Struktur Organisasi
                  </h3>
                  <div className="bg-gray-100 p-4 rounded flex justify-center">
                    {/* Placeholder untuk diagram struktur organisasi */}
                    <div className="w-full max-w-3xl h-80 bg-white border rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Diagram Struktur Organisasi Teknik Sipil UNSOED
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Pejabat Struktural
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {strukturOrganisasi.map((pejabat, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                          {/* Placeholder foto */}
                          <span className="text-gray-500">
                            Foto {pejabat.nama}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-800">
                          {pejabat.nama}
                        </h4>
                        <p className="text-blue-600">{pejabat.jabatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dosen dan Tenaga Pengajar */}
          {activeTab === "dosen" && (
            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                Dosen dan Tenaga Pengajar
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dosenList.map((dosen) => (
                    <div
                      key={dosen.id}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                          {/* Placeholder foto */}
                          <span className="text-gray-500">
                            Foto {dosen.nama}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {dosen.nama}
                        </h3>
                        <p className="text-gray-600 text-sm mb-1">
                          NIP: {dosen.nip}
                        </p>
                        <p className="text-blue-600 font-medium">
                          {dosen.bidangKeahlian}
                        </p>
                        {dosen.email && (
                          <p className="text-gray-600 text-sm mt-2">
                            <a
                              href={`mailto:${dosen.email}`}
                              className="hover:text-blue-600"
                            >
                              {dosen.email}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pengurus Laboratorium */}
          {activeTab === "laboratorium" && (
            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                Pengurus Laboratorium
              </h2>
              <div className="space-y-8">
                {labList.map((lab) => (
                  <div
                    key={lab.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                        <div className="w-full h-48 bg-gray-300 rounded flex items-center justify-center">
                          {/* Placeholder foto */}
                          <span className="text-gray-500">{lab.nama}</span>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-3">
                          {lab.nama}
                        </h3>
                        <div className="mb-4">
                          <p className="font-medium text-gray-700">
                            Kepala Laboratorium:
                          </p>
                          <p className="text-gray-600">{lab.kepalaLab}</p>
                        </div>

                        <div className="mb-4">
                          <p className="font-medium text-gray-700">Teknisi:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {lab.teknisi.map((teknisi, index) => (
                              <li key={index}>{teknisi}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium text-gray-700">
                            Fasilitas:
                          </p>
                          <ul className="list-disc list-inside text-gray-600">
                            {lab.fasilitas.map((fasilitas, index) => (
                              <li key={index}>{fasilitas}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prestasi dan Pencapaian */}
          {activeTab === "prestasi" && (
            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                Prestasi dan Pencapaian
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  {prestasiList.map((prestasi) => (
                    <div
                      key={prestasi.id}
                      className="border-l-4 border-blue-600 pl-4 py-2"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {prestasi.judul}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {prestasi.tahun}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{prestasi.deskripsi}</p>
                      <span className="text-sm text-gray-500 italic">
                        Kategori:{" "}
                        {prestasi.kategori === "mahasiswa"
                          ? "Prestasi Mahasiswa"
                          : prestasi.kategori === "dosen"
                          ? "Prestasi Dosen"
                          : "Prestasi Jurusan"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sertifikasi & Akreditasi */}
          {activeTab === "sertifikasi" && (
            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                Sertifikasi & Akreditasi
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sertifikasiList.map((sertifikasi) => (
                    <div
                      key={sertifikasi.id}
                      className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm p-4"
                    >
                      <div className="w-16 h-16 bg-white rounded-md flex-shrink-0 flex items-center justify-center border">
                        {/* Placeholder logo */}
                        <span className="text-xs text-gray-500 text-center">
                          Logo
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {sertifikasi.nama}
                        </h3>
                        <p className="text-blue-600 text-sm">
                          {sertifikasi.tahun}
                        </p>
                        <p className="text-gray-600 mt-2 text-sm">
                          {sertifikasi.deskripsi}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Kerjasama Industri dan Alumni */}
          {activeTab === "kerjasama" && (
            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                Kerjasama Industri dan Alumni
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Mitra Industri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {kerjasamaList.map((kerjasama) => (
                    <div
                      key={kerjasama.id}
                      className="bg-white border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                    >
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        {/* Placeholder logo */}
                        <span className="text-xs text-gray-500">Logo</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">
                        {kerjasama.namaPerusahaan}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {kerjasama.bidang}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Sejak {kerjasama.tahunMulai}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Ikatan Alumni
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border mb-4 md:mb-0 md:mr-6">
                        {/* Placeholder logo */}
                        <span className="text-xs text-gray-500">
                          Logo Alumni
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          Ikatan Alumni Teknik Sipil UNSOED
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Ikatan Alumni Teknik Sipil UNSOED menjadi jembatan
                          penghubung antara alumni, mahasiswa, dan jurusan untuk
                          meningkatkan kualitas pendidikan dan karir lulusan
                          Teknik Sipil UNSOED.
                        </p>
                        <a
                          href="/alumni"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          Lihat halaman alumni
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfilPage;
