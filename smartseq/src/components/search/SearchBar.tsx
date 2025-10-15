import { useState } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Rechercher un nombre..." }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Recherche
      </h2>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="number"
          step="0.1"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-xl focus:border-green-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <div className="absolute inset-y-0 right-8 flex items-center pr-3">
          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
}