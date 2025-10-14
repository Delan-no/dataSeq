import { useState, useEffect, useRef } from 'react';

interface VirtualizedListProps {
  items: number[];
  itemHeight: number;
  containerHeight: number;
  searchHistory: number[];
  className?: string;
}

export default function VirtualizedList({ 
  items, 
  itemHeight, 
  containerHeight, 
  searchHistory,
  className = '' 
}: VirtualizedListProps) {
  const isSearchedNumber = (num: number) => searchHistory.includes(num);

  return (
    <div
      className={`overflow-y-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2">
        {items.map((num, index) => (
          <div
            key={index}
            className={`group relative px-3 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex-shrink-0 ${
              isSearchedNumber(num)
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white ring-2 ring-yellow-300 animate-pulse'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }`}
          >
            {num}
            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-800 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              {index + 1}
            </div>
            {isSearchedNumber(num) && (
              <div className="absolute -top-0.5 sm:-top-1 -left-0.5 sm:-left-1">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}