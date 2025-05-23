import React from "react";
import Link from "next/link";

type AccreditationItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  issueDate: string;
  downloadUrl: string;
};

const accreditationData: AccreditationItem[] = [
  {
    id: "acc1",
    image: "/images/accreditations/iso-certification.jpg",
    title: "ISO 17025:2017 Certification",
    description:
      "Standar internasional untuk kompetensi laboratorium pengujian dan kalibrasi",
    issueDate: "15 Januari 2022",
    downloadUrl: "/docs/ISO-17025-certification.pdf",
  },
  {
    id: "acc2",
    image: "/images/accreditations/bnsp-certification.jpg",
    title: "Sertifikasi BNSP",
    description:
      "Sertifikasi kompetensi dari Badan Nasional Sertifikasi Profesi",
    issueDate: "3 Maret 2023",
    downloadUrl: "/docs/BNSP-certification.pdf",
  },
  {
    id: "acc3",
    image: "/images/accreditations/kemenpu-certification.jpg",
    title: "Akreditasi Kementerian PUPR",
    description:
      "Pengakuan resmi dari Kementerian Pekerjaan Umum dan Perumahan Rakyat",
    issueDate: "20 Mei 2022",
    downloadUrl: "/docs/PUPR-accreditation.pdf",
  },
];

const HomepageAccreditation = () => {
  return (
    <section
      id="fitur"
      className="section-padding-x pt-12 pb-12 text-dark-base dark:text-light-base bg-light-base dark:bg-dark-base scroll-mt-12 bg-gradient-to-br dark:from-dark-base dark:via-dark-base/80 dark:to-blue-imphnen-secondary/10 from-light-base via-light-base/70 to-blue-imphnen-secondary/10 relative"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="px-2 py-0.5 mb-2 rounded-md text-blue-base bg-blue-tertiary font-semibold w-fit mx-auto">
            Akreditasi dan Sertifikasi
          </p>
          <h2 className="font-bold mb-2">
            Laboratorium Teknik Sipil Unsoed Memenuhi Standar Nasional dan
            Internasional
          </h2>
        </div>
        <div className="flex flex-nowrap overflow-x-auto gap-4">
          {accreditationData.map((item) => (
            <div
              key={item.id}
              className="flex-none w-64 border border-gray-200 bg-white p-4"
            >
              <div className="w-full mb-2 max-h-40 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover max-h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Terbit: {item.issueDate}
                </p>
                <Link
                  href={item.downloadUrl}
                  className="text-blue-600 text-sm font-medium flex items-center"
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Unduh Sertifikat
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-4">
          <Link href="/accreditations" className="text-blue-600 font-medium normal-font-size">
            Lihat Semua Sertifikasi →
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default HomepageAccreditation;
