'use client';
import { useState, useRef, useEffect } from "react";
import testsData from "@/data/tests";
import Image from "next/image";
import Link from "next/link";

export default function TestsMain() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLab, setSelectedLab] = useState<string>("all");
  const [showActiveOnly, setShowActiveOnly] = useState<boolean>(true);
  const [filteredTests, setFilteredTests] = useState(testsData);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // Extract unique laboratories
  const laboratories = [
    { id: "all", name: "Semua Laboratorium" },
    ...Array.from(new Set(testsData.map((test) => test.laboratory.id))).map(
      (labId) => {
        const lab = testsData.find(
          (t) => t.laboratory.id === labId
        )?.laboratory;
        return { id: labId.toString(), name: lab?.name || "" };
      }
    ),
  ];

  // Filter tests based on search, lab, and active status
  useEffect(() => {
    let result = testsData;

    // Filter by laboratory
    if (selectedLab !== "all") {
      result = result.filter(
        (test) => test.laboratory.id.toString() === selectedLab
      );
    }

    // Filter by active status
    if (showActiveOnly) {
      result = result.filter((test) => test.is_active);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (test) =>
          test.name.toLowerCase().includes(query) ||
          test.description.toLowerCase().includes(query) ||
          test.laboratory.name.toLowerCase().includes(query)
      );
    }

    setFilteredTests(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedLab, showActiveOnly, searchQuery]);

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

  // Calculate pagination values
  const totalItems = filteredTests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTests.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Get selected lab name for display
  const selectedLabName =
    laboratories.find((lab) => lab.id === selectedLab)?.name ||
    "Semua Laboratorium";

  return (
    <section className="bg-light-base text-dark-base section-padding-x py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Filter Controls */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari pengujian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sipil-base"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

            {/* Laboratory Filter Dropdown */}
            <div className="relative w-full md:w-64" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-sipil-base"
              >
                <span>{selectedLabName}</span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto focus:outline-none">
                  <div className="py-1">
                    {laboratories.map((lab) => (
                      <button
                        key={lab.id}
                        onClick={() => {
                          setSelectedLab(lab.id);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedLab === lab.id
                            ? "bg-gray-100 text-sipil-base font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {lab.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active Only Toggle */}
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={() => setShowActiveOnly(!showActiveOnly)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-sipil-base rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sipil-base"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">
                  Aktif saja
                </span>
              </label>
            </div>
          </div>

          {/* Pagination Info and Controls */}
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="text-gray-600 flex items-center mb-2 md:mb-0">
              <span>Menampilkan </span>
              <select
                className="mx-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sipil-base"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
              </select>
              <span>
                dari {filteredTests.length} pengujian ({indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, totalItems)})
              </span>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((test) => (
            <div
              key={test.id}
              className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                !test.is_active ? "opacity-70" : ""
              }`}
            >
              <div className="relative h-48">
                <Image
                  src={test.images[0].image}
                  alt={test.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!test.is_active && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                      Tidak Tersedia
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-sipil-base">
                    {test.name}
                  </h2>
                  {test.is_active && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Tersedia
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {test.description}
                </p>

                <div className="flex flex-col gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>{test.laboratory.name}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>
                      Min. {test.minimum_unit} {test.unit.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{test.daily_slot} slot per hari</span>
                  </div>
                </div>

                <Link
                  href={`/layanan-pengujian/${test.id}`}
                  className={`inline-flex items-center px-4 py-2 bg-sipil-base text-white rounded-md hover:bg-sipil-secondary transition-colors ${
                    !test.is_active
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : ""
                  }`}
                >
                  <span>Detail Pengujian</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when no tests match the filter */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
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
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada layanan pengujian ditemukan
            </h3>
            <p className="text-gray-500">
              Tidak ada layanan pengujian yang sesuai dengan filter Anda. Coba
              ubah kriteria pencarian.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredTests.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 bg-white rounded-l-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo; Prev
              </button>
              
              <div className="hidden md:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                  if (
                    number === 1 ||
                    number === totalPages ||
                    number === currentPage ||
                    number === currentPage - 1 ||
                    number === currentPage + 1
                  ) {
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 border-t border-b border-gray-300 ${
                          currentPage === number
                            ? "bg-sipil-base text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {number}
                      </button>
                    );
                  }
                  
                  if (
                    number === currentPage - 2 ||
                    number === currentPage + 2
                  ) {
                    return (
                      <span
                        key={`ellipsis-${number}`}
                        className="px-4 py-2 border-t border-b border-gray-300 bg-white"
                      >
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}
              </div>
              
              <span className="md:hidden px-4 py-2 border-t border-b border-gray-300 bg-white">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 bg-white rounded-r-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}