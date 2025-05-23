'use client';
import { useState, useEffect, useRef } from 'react';
import facilitiesData from '@/data/facilities';
import Image from 'next/image';
import Link from 'next/link';

export default function FacilityMain() {
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [filteredFacilities, setFilteredFacilities] = useState(facilitiesData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get unique facility types
  const facilityTypes = [
    { id: 'all', name: 'Semua Fasilitas' },
    ...Array.from(
      new Set(facilitiesData.map(facility => facility.type.id))
    ).map(typeId => {
      const facilityType = facilitiesData.find(f => f.type.id === typeId)?.type;
      return { id: typeId, name: facilityType?.name || '' };
    })
  ];

  // Filter facilities based on active type and search query
  useEffect(() => {
    let result = facilitiesData;
    
    // Filter by type
    if (activeType !== 'all') {
      result = result.filter(facility => facility.type.id === Number(activeType));
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(facility => 
        facility.name.toLowerCase().includes(query) || 
        facility.description.toLowerCase().includes(query) ||
        facility.room.toLowerCase().includes(query) ||
        facility.type.name.toLowerCase().includes(query)
      );
    }
    
    setFilteredFacilities(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeType, searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate pagination values
  const totalItems = filteredFacilities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFacilities.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Get active type name for display
  const activeTypeName = facilityTypes.find(type => type.id.toString() === activeType)?.name || 'Semua Fasilitas';

  return (
    <section className="bg-light-base section-padding-x py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Combined Control Bar */}
        <div className="bg-white rounded-lg mb-8 flex flex-col md:flex-row gap-4 md:items-center">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Cari fasilitas..."
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
          
          {/* Type Filter Dropdown */}
          <div className="relative w-full md:w-48" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-sipil-base"
            >
              <span>{activeTypeName}</span>
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
                  {facilityTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setActiveType(type.id.toString());
                        setDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        activeType === type.id.toString() ? 'bg-gray-100 text-sipil-base font-medium' : 'text-gray-700'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Items Per Page Selector & Pagination Info */}
          <div className="flex text-sm items-center gap-2 whitespace-nowrap">
            <span className="hidden md:inline text-gray-600">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} dari {totalItems}
            </span>
            <select 
              id="itemsPerPage" 
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded px-2 py-2 text-sm"
              aria-label="Items per page"
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
            <span className="text-gray-600">per halaman</span>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((facility) => (
            <div 
              key={facility.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-sipil-base">{facility.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">
                    {facility.room}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {facility.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                    />
                  </svg>
                  <span>{facility.type.name}</span>
                  <span className="mx-2">•</span>
                  <span>{facility.gears.length} Peralatan</span>
                </div>
                <Link 
                  href={`/fasilitas/${facility.id}`} 
                  className="inline-flex items-center text-sipil-base font-medium hover:underline"
                >
                  Lihat Detail
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when no facilities match the filter */}
        {filteredFacilities.length === 0 && (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada fasilitas ditemukan
            </h3>
            <p className="text-gray-500">
              Tidak ada fasilitas yang sesuai dengan filter atau pencarian Anda.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredFacilities.length > 0 && totalPages > 1 && (
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