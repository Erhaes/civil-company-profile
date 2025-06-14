"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import apiClient from "@/services/apiClient";

interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  author_id: number;
  news_category_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
  news_category: {
    id: number;
    name: string;
    slug: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

interface ApiResponse {
  current_page: number;
  data: News[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

const fetchNews = async (
  page: number = 1,
  perPage: number = 8,
  search: string = "",
  categoryId: string = ""
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search.trim() !== "") {
    params.append("search", search);
  }

  if (categoryId && categoryId !== "all") {
    params.append("news_category_id", categoryId);
  }

  const response = await apiClient.get(`/news?${params.toString()}`);
  return response.data;
};

export default function NewsMain() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([{ id: "all", name: "Semua Kategori" }]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/images/default-news.jpg"; // fallback image
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
    }/storage/${imagePath}`;
  };

  // Helper function to get avatar URL
  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return "/images/default-avatar.jpg"; // fallback avatar
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
    }/storage/${avatarPath}`;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // Fetch categories for filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/news-categories");
        const cats = response.data.data.map((cat: NewsCategory) => ({
          id: cat.id.toString(),
          name: cat.name,
        }));
        setCategories([{ id: "all", name: "Semua Kategori" }, ...cats]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch news data from API
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(
          currentPage,
          itemsPerPage,
          searchQuery,
          selectedCategory
        );
        setApiData(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Gagal memuat data berita. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [currentPage, itemsPerPage, selectedCategory]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      const loadSearchResults = async () => {
        try {
          setLoading(true);
          setError(null);
          setCurrentPage(1); // Reset to first page when searching
          const data = await fetchNews(
            1,
            itemsPerPage,
            searchQuery,
            selectedCategory
          );
          setApiData(data);
        } catch (err) {
          console.error("Failed to fetch news:", err);
          setError("Gagal memuat data berita. Silakan coba lagi.");
        } finally {
          setLoading(false);
        }
      };

      loadSearchResults();
    }, 500); // 500ms debounce

    setSearchTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [searchQuery, itemsPerPage, selectedCategory]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!apiData) return [];

    const totalPages = apiData.last_page;
    const current = apiData.current_page;
    const pages = [];

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Show pages around current page
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(totalPages - 1, current + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages.sort((a, b) => a - b);
  };

  // Get selected category name for display
  const selectedCategoryName =
    categories.find((cat) => cat.id === selectedCategory)?.name ||
    "Semua Kategori";

  const pageNumbers = generatePageNumbers();
  const news = apiData?.data || [];

  console.log("News data:", news);

  return (
    <section className="bg-light-base text-dark-base section-padding-x py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Berita</h1>
          <p className="text-gray-600">
            Temukan berita terbaru seputar dunia teknik sipil dan konstruksi
          </p>
        </div>

        {/* Filters */}
        {/* <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block mb-2 text-gray-700 font-medium"
              >
                Cari Berita
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                  placeholder="Cari berdasarkan judul atau konten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-64">
              <label
                htmlFor="category"
                className="block mb-2 text-gray-700 font-medium"
              >
                Filter Kategori
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-sipil-base"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="block truncate">{selectedCategoryName}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                          selectedCategory === cat.id
                            ? "bg-sipil-base text-white"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <select
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base text-sm"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="8">8 per halaman</option>
                <option value="12">12 per halaman</option>
                <option value="16">16 per halaman</option>
                <option value="24">24 per halaman</option>
              </select>
            </div>

            {apiData && (
              <div className="text-sm text-gray-600">
                Menampilkan {apiData.from || 0} - {apiData.to || 0} dari{" "}
                {apiData.total} berita
              </div>
            )}
          </div>
        </div> */}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sipil-base mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data berita...</p>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(item.thumbnail)}
                    alt={item.title}
                    className="object-cover w-full"
                  />
                  <div className="absolute top-0 left-0 bg-sipil-base text-white text-xs px-3 py-1">
                    {item.news_category.name}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                        <img
                          src={getAvatarUrl(item.author.avatar)}
                          alt={item.author.name}
                          className="object-cover w-full"
                        />
                      </div>
                      <span>{item.author.name}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                  <a href={`/berita/${item.slug}`} className="block mb-2">
                    <h3 className="text-lg font-bold text-sipil-base mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                  </a>
                  <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-2">
                    {item.content}
                  </p>
                  <a
                    href={`/berita/${item.slug}`}
                    className="inline-flex items-center text-sipil-base font-medium hover:underline mt-auto"
                  >
                    Baca Selengkapnya
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && news.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Tidak ada berita ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah filter pencarian atau kata kunci Anda.
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && apiData && apiData.last_page > 1 && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!apiData.prev_page_url}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm rounded-md ${
                    page === apiData.current_page
                      ? "bg-sipil-base text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!apiData.next_page_url}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
