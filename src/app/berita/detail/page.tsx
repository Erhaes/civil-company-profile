import { News } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Pembangunan Jembatan Suramadu Fase 2 Dimulai | Teknik Sipil Unsoed",
  description:
    "Pembangunan fase kedua dari Jembatan Suramadu telah dimulai. Proyek ini diperkirakan akan selesai dalam waktu 3 tahun dan akan meningkatkan konektivitas antara Surabaya dan Madura.",
};

const news: News = {
  id: 1,
  title: "Pembangunan Jembatan Suramadu Fase 2 Dimulai",
  content:
    "Pembangunan fase kedua dari Jembatan Suramadu telah dimulai. Proyek ini diperkirakan akan selesai dalam waktu 3 tahun dan akan meningkatkan konektivitas antara Surabaya dan Madura.",
  thumbnail: "/images/news/suramadu-bridge.jpg",
  date: "2023-05-15",
  category: {
    id: 1,
    name: "Infrastruktur",
  },
  user: {
    id: 1,
    name: "Ahmad Faisal",
    email: "ahmad.faisal@example.com",
    photo: "/images/users/ahmad.jpg",
  },
};

export default function NewsDetail() {
  return (
    <main>
      {/* Header with Featured Image */}
      <section className="relative bg-sipil-base text-light-base pt-28 pb-12">
        <div className="max-w-screen-xl mx-auto section-padding-x">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Link
                href="/berita"
                className="inline-flex items-center text-blue-300 hover:text-white mb-4"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali ke Berita
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {news.title}
              </h1>

              <div className="inline-block px-3 py-1 text-xs font-medium bg-sipil-secondary text-white rounded-full mb-4">
                {news.category.name}
              </div>

              <div className="flex items-center text-white/90">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white/30">
                    <Image
                      src={news.user.photo}
                      alt={news.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{news.user.name}</p>
                    <p className="text-sm text-white/70">
                      {new Date(news.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src={news.thumbnail}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white text-dark-base section-padding-x py-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-screen-lg mx-auto">
            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <p>{news.content}</p>

              <p>
                Jembatan Suramadu merupakan jembatan terpanjang di Indonesia
                yang menghubungkan Pulau Jawa (Surabaya) dan Pulau Madura.
                Jembatan ini memiliki panjang sekitar 5,4 km dan telah menjadi
                ikon infrastruktur penting di Jawa Timur.
              </p>

              <p>
                Fase kedua pembangunan ini akan fokus pada peningkatan kapasitas
                jembatan dan infrastruktur pendukung di kedua sisi jembatan.
                Beberapa aspek yang akan dikembangkan meliputi:
              </p>

              <p>
                Menteri Pekerjaan Umum dan Perumahan Rakyat menyatakan bahwa
                proyek ini merupakan bagian dari program pemerintah untuk
                meningkatkan konektivitas antar pulau dan mendorong pemerataan
                pembangunan ekonomi.
              </p>

              <p>
                Proyek ini diperkirakan akan menyerap ribuan tenaga kerja selama
                masa konstruksi dan diharapkan dapat meningkatkan perekonomian
                masyarakat Madura secara signifikan setelah selesai.
              </p>

              <p>
                Pembangunan fase kedua ini juga memperhatikan aspek lingkungan
                dan berkelanjutan, dengan implementasi teknologi ramah
                lingkungan dan penggunaan material yang lebih tahan lama
                terhadap kondisi lingkungan laut.
              </p>
            </article>

            {/* Share Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-3">Bagikan</h3>
              <div className="flex space-x-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0a12 12 0 0 0-3.8 23.4c-.1-1.1-.2-2.8 0-4 .2-1.1 1.4-7 1.4-7s-.3-.8-.3-1.8c0-1.7 1-3 2.2-3 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1.1 4.2-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.3-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.8 8.5-7.8 4.5 0 7.9 3.2 7.9 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 5.9 0 10.8-4.3 11.6-10C23.9 6.1 18.7 0 12 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex md:flex-row md:items-center flex-col">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-sipil-base/20">
                  <Image
                    src={news.user.photo}
                    alt={news.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{news.user.name}</h4>
                  <p className="text-gray-600 small-font-size">Kontributor</p>
                  <p className="text-gray-600 extra-small-font-size mt-1">
                    Jurnalis spesialis bidang infrastruktur dengan pengalaman
                    peliputan proyek-proyek strategis nasional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
