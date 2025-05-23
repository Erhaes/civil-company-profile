export default function HomepageAbout() {
  return (
    <section
      id="about"
      className="bg-light-base text-dark-base dark:bg-dark-base dark:text-light-base section-padding-x py-20 scroll-mt-12 relative"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="gradient-to-r text-light-base from-sipil-base to-sipil-secondary bg-gradient-to-br flex items-center gap-2 mb-2 w-fit py-1 px-3 rounded-md mx-auto">
            <svg
              className="w-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
            </svg>
            <h2 className="extra-small-font-size">Tentang Teknik Sipil</h2>
          </span>
          <h2 className="font-bold">
            Keunggulan Program Studi Teknik Sipil Unsoed
          </h2>
          <p className="max-w-3xl mx-auto">
            Program Studi Teknik Sipil Universitas Jenderal Soedirman didirikan
            untuk menjawab kebutuhan akan tenaga profesional di bidang teknik
            sipil yang kompeten dan berintegritas.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Image */}
          <div className="relative rounded-lg overflow-hidden h-full">
            <img
              src="/images/backgrounds/ufuk-unsoed.webp"
              alt="Gedung Teknik Unsoed"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-sipil-base text-light-base py-1 px-3 rounded-md shadow-md small-font-size font-medium">
              Didirikan Tahun 1963
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3 text-sipil-base dark:text-sipil-blue-accent">
                Visi
              </h3>
              <p className="">
                Menjadi laboratorium Teknik Sipil yang bermutu dan maju untuk
                mendukung kegiatan akademik, penelitian dan industri konstruksi
                sehingga dapat berkontribusi bagi pembangunan bangsa dan negara.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3 text-sipil-base dark:text-sipil-blue-accent">
                Misi
              </h3>
              <ul className="list-disc list-outside pl-4 space-y-2">
                <li>Memberikan pelayanan praktikum kepada mahasiswa</li>
                <li>
                  Memberikan pelayanan penelitian kepada dosen dan mahasiswa
                </li>
                <li>
                  Memberi pelayanan pengujian kepada kontraktor dan konsultan
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#"
                className="rounded-md bg-blue-base text-light-base py-2 px-4 font-semibold text-center hover:bg-blue-quaternary hover:text-blue-base transition duration-300 small-font-size"
              >
                Lihat Fasilitas
              </a>
              <a
                href="#"
                className="rounded-md border border-blue-base text-blue-base py-2 px-4 font-semibold text-center hover:bg-blue-quaternary transition duration-300 small-font-size"
              >
                Lihat Pengujian
              </a>
            </div>
          </div>
        </div>

        {/* Faculty Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
          {/* Stat 1 */}
          <div className="bg-sipil-base text-light-base rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start flex-col gap-4">
              <div className="p-3 bg-blue-base/20 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tenaga Berpengalaman</h3>
                <p className="text-light-base/80">
                  Pengujian dilakukan oleh tenaga ahli yang berpengalaman dan
                  profesional dalam bidangnya.
                </p>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-blue-quaternary text-blue-base rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start flex-col gap-4">
              <div className="p-3 bg-blue-base/20 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-8 h-8"
                  fill="currentColor"
                >
                  <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4l54.1 0 109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109 0-54.1c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7L352 176c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Kalibrasi Alat Rutin</h3>
                <p className="text-blue-base/80">
                  Alat pengujian dikalibrasi setiap tahun untuk memastikan
                  keakuratan hasil pengujian.
                </p>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-gray-100 text-dark-base rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start flex-col gap-4">
              <div className="p-3 bg-sipil-base rounded-lg text-light-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="w-8 h-8"
                  fill="currentColor"
                >
                  <path d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2l-256 0c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7l32 0 22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-74.9-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Melayani 60 Jenis Pengujian
                </h3>
                <p className="text-dark-base/70">
                  Melayani hingga 60 jenis pengujian yang berbeda untuk memenuhi
                  kebutuhan penelitian dan industri.
                </p>
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-gray-100 text-dark-base rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start flex-col gap-4">
              <div className="p-3 bg-sipil-base text-light-base rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M416 176c0 97.2-93.1 176-208 176c-38.2 0-73.9-8.7-104.7-23.9c-7.5 4-16 7.9-25.2 11.4C59.8 346.4 37.8 352 16 352c-6.9 0-13.1-4.5-15.2-11.1s.2-13.8 5.8-17.9c0 0 0 0 0 0s0 0 0 0l.2-.2c.2-.2 .6-.4 1.1-.8c1-.8 2.5-2 4.3-3.7c3.6-3.3 8.5-8.1 13.3-14.3c5.5-7 10.7-15.4 14.2-24.7C14.7 250.3 0 214.6 0 176C0 78.8 93.1 0 208 0S416 78.8 416 176zM231.5 383C348.9 372.9 448 288.3 448 176c0-5.2-.2-10.4-.6-15.5C555.1 167.1 640 243.2 640 336c0 38.6-14.7 74.3-39.6 103.4c3.5 9.4 8.7 17.7 14.2 24.7c4.8 6.2 9.7 11 13.3 14.3c1.8 1.6 3.3 2.9 4.3 3.7c.5 .4 .9 .7 1.1 .8l.2 .2s0 0 0 0s0 0 0 0c5.6 4.1 7.9 11.3 5.8 17.9c-2.1 6.6-8.3 11.1-15.2 11.1c-21.8 0-43.8-5.6-62.1-12.5c-9.2-3.5-17.8-7.4-25.2-11.4C505.9 503.3 470.2 512 432 512c-95.6 0-176.2-54.6-200.5-129zM228 72c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7L228 72z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Harga Bersaing</h3>
                <p className="text-dark-base/70">
                  Harga bersaing dan hasil sudah teruji. Dapat diskon bila
                  membeli pengujian secara paket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
