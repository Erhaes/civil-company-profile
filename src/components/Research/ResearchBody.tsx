'use client';
import { useEffect, useState } from "react";
import researchesData from "@/data/researches";
import Link from "next/link";

export default function ResearchMain() {
  const [filteredData, setFilteredData] = useState(researchesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("Semua");

  // Extract unique years from research data
  const years = ["Semua", ...Array.from(new Set(researchesData.map((item) => item.year.toString())))];

  // Filter data based on search term and year
  useEffect(() => {
    let result = researchesData;

    // Filter based on selected year
    if (selectedYear !== "Semua") {
      result = result.filter((item) => item.year.toString() === selectedYear);
    }

    // Filter based on search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearchTerm) ||
          item.abstract.toLowerCase().includes(lowerSearchTerm) ||
          item.authors.some(author => author.toLowerCase().includes(lowerSearchTerm)) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm))
      );
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset page when filters change
  }, [searchTerm, selectedYear]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Get data for current page
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Page change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Rows per page change handler
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <section className="py-16 bg-light-base text-dark-base section-padding-x">
      <div className="max-w-screen-xl mx-auto">
        {/* Filter and Search */}
        <div className="bg-light-base rounded-lg p-4 md:p-6 shadow-md mb-8 small-font-size">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block mb-2 text-gray-700 font-medium"
              >
                Cari Penelitian
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base"
                  placeholder="Cari berdasarkan judul, abstrak, penulis, atau kata kunci..."
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
                htmlFor="year"
                className="block mb-2 text-gray-700 font-medium"
              >
                Filter Tahun
              </label>
              <select
                id="year"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sipil-base appearance-none bg-light-base"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
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
              <span>dari {filteredData.length} penelitian</span>
            </div>
          </div>
        </div>

        {/* Research Table */}
        <div className="bg-light-base rounded-lg shadow-md overflow-hidden extra-small-font-size">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sipil-base text-light-base">
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left w-12">No</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">Judul & Penulis</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">Abstrak</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-left">Kata Kunci</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">Publikasi</th>
                  <th className="px-4 py-2 md:px-6 md:py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 md:px-6 md:py-3 light-basespace-nowrap">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <div className="font-medium text-sipil-base">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <div>Penulis: {item.authors.join(", ")}</div>
                          <div>Tahun: {item.year}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <p className="text-gray-600 line-clamp-3 extra-small-font-size">
                          {item.abstract}
                        </p>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3">
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, idx) => (
                            <span 
                              key={idx}
                              className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center">
                        <span className="text-gray-600 extra-small-font-size line-clamp-2">{item.publication}</span>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-3 text-center light-basespace-nowrap">
                        <Link
                          href={item.link}
                          className="inline-flex items-center gap-1 bg-sipil-base text-light-base py-2 px-4 rounded-md hover:bg-sipil-secondary transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none" 
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                          </svg>
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
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
                          Tidak ada penelitian yang ditemukan
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
                className="px-3 py-1 md:px-4 md:py-2 text-sm bg-light-base border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed small-font-size"
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
                          ? "bg-sipil-base text-light-base"
                          : "bg-light-base border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                className="px-3 py-1 md:px-4 md:py-2 text-sm bg-light-base border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed small-font-size"
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