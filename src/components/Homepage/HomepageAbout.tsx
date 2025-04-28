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
              src="/images/backgrounds/civil-gathering.png"
              alt="Laboratorium Teknik Sipil Unsoed"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-sipil-base text-light-base py-1 px-3 rounded-md shadow-md small-font-size font-medium">
              Didirikan Tahun 1963
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-3 text-sipil-base dark:text-sipil-blue-accent">
                Visi
              </h3>
              <p className="">
                Menjadi institusi pendidikan dan riset bidang Teknik Sipil
                bertaraf internasional berbasis pada sumber daya dan kearifan
                lokal pada tahun 2034
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-3 text-sipil-base dark:text-sipil-blue-accent">
                Misi
              </h3>
              <ul className="list-disc list-outside pl-4 space-y-2">
                <li>
                  Menyelenggarakan pendidikan bidang Teknik Sipil yang
                  menekankan pada pembentukan karakter dan keahlian.
                </li>
                <li>
                  Melaksanakan penelitian bidang Teknik Sipil yang menekankan
                  pada pemanfaatan sumber daya dan kearifan lokal.
                </li>
                <li>
                  Melaksanakan pengabdian pada masyarakat melalui penerapan ilmu
                  bidang Teknik Sipil.
                </li>
                <li>Menjalin kerjasama dalam bidang Teknik Sipil.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/informasi#fasilitas"
                className="rounded-md bg-blue-base text-light-base py-2 px-4 font-semibold text-center hover:bg-blue-quaternary hover:text-blue-base transition duration-300 small-font-size"
              >
                Lihat Fasilitas
              </a>
              <a
                href="/informasi#mata-kuliah"
                className="rounded-md border border-blue-base text-blue-base py-2 px-4 font-semibold text-center hover:bg-blue-quaternary transition duration-300 small-font-size"
              >
                Mata Kuliah
              </a>
            </div>
          </div>
        </div>

        {/* Faculty Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Stat 1 */}
          <div className="bg-sipil-base text-light-base rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-light-base/20 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256V416zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Akreditasi Unggul</h3>
                <p className="text-light-base/80">
                  Telah terakreditasi unggul oleh BAN-PT dengan nilai terbaik di
                  tingkat nasional
                </p>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-blue-quaternary text-blue-base rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
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
                <h3 className="text-xl font-bold mb-2">Lulusan Berkualitas</h3>
                <p className="text-blue-base/80">
                  90% lulusan terserap di industri dalam 6 bulan pertama setelah
                  kelulusan
                </p>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-gray-100 text-dark-base rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-sipil-base rounded-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M416 176c0 97.2-93.1 176-208 176c-38.2 0-73.9-8.7-104.7-23.9c-7.5 4-16 7.9-25.2 11.4C59.8 346.4 37.8 352 16 352c-6.9 0-13.1-4.5-15.2-11.1s.2-13.8 5.8-17.9l0 0 0 0 .2-.2c.2-.2 .6-.4 1.1-.8c1-.8 2.5-2 4.3-3.7c3.6-3.3 8.5-8.1 13.3-14.3c5.5-7 10.7-15.4 14.2-24.7C14.7 250.3 0 214.6 0 176C0 78.8 93.1 0 208 0S416 78.8 416 176zM231.5 383C348.9 372.9 440 288.3 440 176c0-5.2-.2-10.4-.6-15.5C555.1 167.1 640 243.2 640 336c0 38.6-14.7 74.3-39.6 103.4c3.5 9.4 8.7 17.7 14.2 24.7c4.8 6.2 9.7 11 13.3 14.3c1.8 1.6 3.3 2.9 4.3 3.7c.5 .4 .9 .7 1.1 .8l.2 .2 0 0 0 0c5.6 4.1 7.9 11.3 5.8 17.9c-2.1 6.6-8.3 11.1-15.2 11.1c-21.8 0-43.8-5.6-62.1-12.5c-9.2-3.5-17.8-7.4-25.2-11.4C505.9 503.3 470.2 512 432 512c-95.6 0-176.2-54.6-200.5-129z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Kolaborasi Industri</h3>
                <p className="text-dark-base/70">
                  Bekerjasama dengan 50+ perusahaan konstruksi dan infrastruktur
                  terkemuka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
