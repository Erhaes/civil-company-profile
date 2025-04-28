export default function HomepageHero() {
  return (
    <section
      id="hero"
      className="bg-light-base text-dark-base section-padding-x pt-24 lg:pt-32 pb-24 scroll-mt-12 relative"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E%3Cg fill=%27%2399a1af%27 fill-opacity=%270.1%27%3E%3Cpolygon fill-rule=%27evenodd%27 points=%278 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4%27/%3E%3C/g%3E%3C/svg%3E')",
      }}
    >
      <div className="absolute inset-0 bg-light-base dark:bg-dark-base">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl top-0 left-0 -z-10"></div>
      </div>
      <div className="max-w-screen-xl mx-auto flex gap-4 flex-col xl:flex-row justify-between relative">
        <div className="hero-animate-1">
          <div className="text-dark-base dark:text-light-base rounded-lg mb-4">
            <span className="gradient-to-r text-light-base from-sipil-base to-sipil-secondary bg-gradient-to-br flex items-center gap-2 mb-2 w-fit py-1 px-3 rounded-md">
              <svg
                className="w-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M256 32c-17.7 0-32 14.3-32 32l0 2.3 0 99.6c0 5.6-4.5 10.1-10.1 10.1c-3.6 0-7-1.9-8.8-5.1L157.1 87C83 123.5 32 199.8 32 288l0 64 512 0 0-66.4c-.9-87.2-51.7-162.4-125.1-198.6l-48 83.9c-1.8 3.2-5.2 5.1-8.8 5.1c-5.6 0-10.1-4.5-10.1-10.1l0-99.6 0-2.3c0-17.7-14.3-32-32-32l-64 0zM16.6 384C7.4 384 0 391.4 0 400.6c0 4.7 2 9.2 5.8 11.9C27.5 428.4 111.8 480 288 480s260.5-51.6 282.2-67.5c3.8-2.8 5.8-7.2 5.8-11.9c0-9.2-7.4-16.6-16.6-16.6L16.6 384z" />
              </svg>
              <p className="extra-small-font-size">
                Pusat Keunggulan Teknik Sipil Indonesia
              </p>
            </span>
            <h1 className="font-bold mb-2 md:text-left">
              Membangun Masa Depan Infrastruktur yang Berkelanjutan
            </h1>
            <p className="mb-4 md:mb-8">
              Bergabunglah bersama kami di{" "}
              <span className="bg-sipil-base text-light-base">
                Teknik Sipil Unsoed
              </span>
              , tempat di mana inovasi dan keunggulan dalam bidang teknik sipil
              bertemu. Kami menyediakan berbagai program pelatihan, penelitian,
              dan kolaborasi untuk mendukung pengembangan infrastruktur yang
              berkualitas dan berkelanjutan.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://facebook.com"
                className="rounded-md bg-blue-base text-light-base py-2 px-4 font-semibold hover:bg-blue-quaternary hover:text-blue-base transition duration-300 small-font-size"
              >
                Reservasi Laboratorium
              </a>
              <a
                href="https://discord.gg"
                className="rounded-md border border-blue-base text-blue-base py-2 px-4 font-semibold hover:bg-blue-quaternary transition duration-300 small-font-size"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row xl:justify-between gap-4">
            <div className="text-dark-base dark:text-light-base flex gap-8 justify-between items-center p-4 rounded-lg text-center">
              <div className="flex flex-col gap-2 border-r-2 border-gray-200 pr-4">
                <h4 className="font-semibold">30+</h4>
                <p className="small-font-size">Dosen Ahli</p>
              </div>
              <div className="flex flex-col gap-2 border-r-2 border-gray-200 pr-4">
                <h4 className="font-semibold">500+</h4>
                <p className="small-font-size">Lulusan Berkualitas</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold">10K+</h4>
                <p className="small-font-size">Mahasiswa Aktif</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-animate-2">
          <img
            src="/images/backgrounds/gedung-ft.jpg"
            alt="Gedung Fakultas Teknik Unsoed"
            className="xl:max-w-xl rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
