'use client';
import { useEffect, useState } from "react";
import downloadsData from "@/data/download";


export default function DownloadMain() {
      // State untuk menyimpan data yang ditampilkan
    //   const [data, setData] = useState(downloadsData);
      const [filteredData, setFilteredData] = useState(downloadsData);
      const [searchTerm, setSearchTerm] = useState("");
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const [currentPage, setCurrentPage] = useState(1);
      const [selectedCategory, setSelectedCategory] = useState("Semua");
    
      // Daftar kategori unik dari data
      const categories = [
        "Semua",
        ...Array.from(new Set(downloadsData.map((item) => item.category))),
      ];
    
      // Filter data berdasarkan pencarian dan kategori
      useEffect(() => {
        let result = downloadsData;
    
        // Filter berdasarkan kategori
        if (selectedCategory !== "Semua") {
          result = result.filter((item) => item.category === selectedCategory);
        }
    
        // Filter berdasarkan pencarian
        if (searchTerm) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          result = result.filter(
            (item) =>
              item.title.toLowerCase().includes(lowerSearchTerm) ||
              item.description.toLowerCase().includes(lowerSearchTerm)
          );
        }
    
        setFilteredData(result);
        setCurrentPage(1); // Reset halaman saat filter berubah
      }, [searchTerm, selectedCategory]);
    
      // Menghitung total halaman
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    
      // Data yang ditampilkan pada halaman saat ini
      const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );
    
      // Fungsi untuk mengubah halaman
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
    
      // Fungsi untuk mengubah jumlah baris per halaman
      const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset ke halaman pertama saat mengubah jumlah baris
      };
    
    
  return (
    <section className="py-16 bg-light-base text-dark-base section-padding-x">
      <div className="max-w-screen-xl mx-auto">
        {/* Filter dan Pencarian */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md mb-8 small-font-size">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block mb-2 text-gray-700 font-medium"
              >
                Cari Dokumen
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                  placeholder="Cari berdasarkan judul atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
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
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 extra-small-font-size">
            <div className="text-gray-600 flex items-center">
              <span>Menampilkan </span>
              <select
                className="mx-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span>dari {filteredData.length} dokumen</span>
            </div>
          </div>
        </div>

        {/* Tabel Dokumen */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden extra-small-font-size">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sipil-base text-white">
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left w-12">No</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">Judul</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">Keterangan</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">Ukuran</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 md:px-6 md:py-3 whitespace-nowrap">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <div className="font-medium text-sipil-base">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Kategori: {item.category} | Tanggal:{" "}
                          {new Date(item.uploadDate).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <p className="text-gray-600 line-clamp-2 extra-small-font-size">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center whitespace-nowrap">
                        <span className="text-gray-600 extra-small-font-size">{item.fileSize}</span>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center whitespace-nowrap">
                        <a
                          href={item.fileUrl}
                          className="inline-flex items-center gap-1 bg-sipil-base text-white py-2 px-4 rounded-md hover:bg-sipil-secondary transition-colors duration-200"
                          download
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32z" />
                            <path d="M64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64z" />
                          </svg>
                          Unduh
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">
                          Tidak ada dokumen yang ditemukan
                        </p>
                        <p className="text-gray-400 mt-1">
                          Coba ubah filter pencarian Anda
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                className="px-3 py-1 md:px-4 md:py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed small-font-size"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </button>

              <div className="hidden md:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === page
                          ? "bg-sipil-base text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                className="px-3 py-1 md:px-4 md:py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed small-font-size"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
