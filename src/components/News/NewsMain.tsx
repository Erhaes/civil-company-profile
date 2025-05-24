'use client';
import { useState, useRef, useEffect } from 'react';
import newsData from '@/data/news';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatter';

export default function NewsMain() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  // Extract unique categories
  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    ...Array.from(
      new Set(newsData.map(item => item.category.id))
    ).map(categoryId => {
      const category = newsData.find(n => n.category.id === categoryId)?.category;
      return { id: categoryId.toString(), name: category?.name || '' };
    })
  ];

  // Filter news based on active category, search query, and featured flag
  useEffect(() => {
    let result = newsData;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category.id.toString() === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query) ||
        item.category.name.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (newest first)
    result = [...result].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setFilteredNews(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery]);

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
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Get selected category name for display
  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'Semua Kategori';

  return (
    <section className="bg-light-base text-dark-base section-padding-x py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Berita & Artikel</h1>
          <p className="text-gray-600">
            Informasi terbaru seputar teknik sipil, proyek, dan perkembangan industri konstruksi
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari berita..."
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
            
            {/* Category Filter Dropdown */}
            <div className="relative w-full md:w-48" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-sipil-base"
              >
                <span>{selectedCategoryName}</span>
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
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedCategory === category.id ? 'bg-gray-100 text-sipil-base font-medium' : 'text-gray-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                dari {filteredNews.length} berita ({indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, totalItems)})
              </span>
            </div>
          </div>
        </div>

        {/* All News Grid */}
        {(currentItems.length > 0 || filteredNews.length > 0) && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {searchQuery 
                ? "Hasil Pencarian" 
                : selectedCategory !== 'all' 
                  ? `Kategori: ${selectedCategoryName}` 
                  : "Semua Berita"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map(item => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-sipil-base text-white text-xs px-3 py-1">
                      {item.category.name}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-center mb-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                          <Image
                            src={item.user.photo}
                            alt={item.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>{item.user.name}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-sipil-base mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow text-sm line-clamp-2">
                      {item.content}
                    </p>
                    <Link 
                      href={`/berita/${item.id}`}
                      className="inline-flex items-center text-sipil-base font-medium hover:underline mt-auto"
                    >
                      Baca Selengkapnya
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state when no news match the filter */}
        {filteredNews.length === 0 && (
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada berita ditemukan
            </h3>
            <p className="text-gray-500">
              Tidak ada berita yang sesuai dengan filter Anda. Coba ubah kriteria pencarian.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredNews.length > 0 && totalPages > 1 && (
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