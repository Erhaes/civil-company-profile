"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import apiClient from "@/services/apiClient";
import { Carousel } from "@/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomepageHero() {
  const [carouselData, setCarouselData] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return "/images/backgrounds/gedung-lab.jpg"; // Default fallback image
    }
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"}/storage/${imagePath}`;
  };

  // Fetch carousel data
  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/carousel");
        const data = response.data.data || response.data;
        // Filter only active carousel items and sort by order
        const activeCarousel = data
          .filter((item: Carousel) => item.is_active)
          .sort((a: Carousel, b: Carousel) => a.order - b.order);
        setCarouselData(activeCarousel);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch carousel data:", err);
        setError("Gagal memuat data carousel.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarousel();
  }, []);

  return (
    <section
      id="hero"
      className="bg-light-base text-dark-base section-padding-x pt-24 lg:pt-32 pb-12 scroll-mt-12 relative"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E%3Cg fill=%27%2399a1af%27 fill-opacity=%270.1%27%3E%3Cpolygon fill-rule=%27evenodd%27 points=%278 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4%27/%3E%3C/g%3E%3C/svg%3E')",
      }}
    >
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
                Laboratorium Teknik Sipil Unsoed
              </p>
            </span>
            <h1 className="font-bold mb-2 md:text-left">
              Membangun Masa Depan Infrastruktur yang Berkelanjutan
            </h1>
            <p className="mb-4 mr-5 md:mb-8 mr-0 text-justify">
              Laboratorium Teknik Sipil Unsoed berfungsi sebagai pusat
              pembelajaran praktis dan eksperimental yang dipergunakan oleh
              civitas akademika dan pelayanan untuk mitra dari
              luar Laboratorium Teknik Sipil Unsoed yang mencakup &nbsp;
              <span className="text-dark-1000 font-bold">bidang Struktur dan Bahan Bangunan, Mekanika Tanah dan Hidraulika,
              Transportasi, Mekanika Keairan dan Teknik Lingkungan.</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="http://localhost:8000"
                className="rounded-md bg-blue-base text-light-base py-2 px-4 font-semibold hover:bg-blue-quaternary hover:text-blue-base transition duration-300 small-font-size"
              >
                Reservasi Laboratorium
              </a>
              <a
                href="https://www.youtube.com/watch?v=6rR5R_Tc_zE&t=14s&pp=0gcJCY0JAYcqIYzv"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-blue-base text-blue-base py-2 px-4 font-semibold hover:bg-blue-quaternary transition duration-300 small-font-size"
              >
                Tonton Video
              </a>
            </div>
          </div>
        </div>
        <div className="hero-animate-2">
          {loading ? (
            <div className="xl:max-w-xl rounded-lg bg-gray-200 animate-pulse h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
                <p>Memuat carousel...</p>
              </div>
            </div>
          ) : error ? (
            <div className="xl:max-w-xl rounded-lg bg-gray-200 h-64 flex items-center justify-center">
              <div className="text-center text-red-600">
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          ) : carouselData.length > 0 ? (
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="xl:max-w-xl rounded-lg"
            >
              {carouselData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="relative">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="w-full h-64 xl:h-80 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="xl:max-w-xl rounded-lg bg-gray-200 h-64 flex items-center justify-center">
              <p className="text-gray-500">Tidak ada data carousel</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
