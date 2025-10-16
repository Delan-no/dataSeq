import { useMemo, useState } from 'react';
import VirtualizedList from '../ui/VirtualizedList';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface OptimizedSequenceDisplayProps {
  sequence: number[];
  title: string;
  searchHistory: number[];
  className?: string;
}

export default function OptimizedSequenceDisplay({ 
  sequence, 
  title, 
  searchHistory,
  className = '' 
}: OptimizedSequenceDisplayProps) {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Mémorisation des calculs coûteux
  const stats = useMemo(() => {
    if (sequence.length === 0) return { total: 0, avg: 0, min: 0, max: 0 };
    
    const sum = sequence.reduce((a, b) => a + b, 0);
    return {
      total: sequence.length,
      avg: Math.round((sum / sequence.length) * 100) / 100,
      min: Math.min(...sequence),
      max: Math.max(...sequence)
    };
  }, [sequence]);

  // Détection si on a besoin de virtualisation (> 100 éléments)
  const needsVirtualization = sequence.length > 100;

  return (
    <div className={`bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl border border-white/20 ${className}`}>
      {/* Header cliquable sur mobile */}
      <div 
        className={`flex items-center justify-between p-4 sm:p-6 gap-2 ${isMobile ? 'cursor-pointer' : 'cursor-default md:mb-3 sm:md:mb-4'}`}
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <span className="truncate">{title}</span>
        </h3>
        <div className="flex gap-1 sm:gap-2 flex-shrink-0 items-center">
          <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {stats.total}
          </div>
          {sequence.length > 1000 && (
            <div className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hidden sm:block">
              Grande
            </div>
          )}
          {/* Icône d'expansion sur mobile */}
          <div className="md:hidden ml-2">
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contenu extensible */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded || !isMobile ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Statistiques rapides */}
          {sequence.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 text-center">
                <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                <div className="text-xs text-blue-500 dark:text-blue-300">Total</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2 text-center">
                <div className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">{stats.avg}</div>
                <div className="text-xs text-green-500 dark:text-green-300">Moy</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-2 text-center">
                <div className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">{stats.min}</div>
                <div className="text-xs text-purple-500 dark:text-purple-300">Min</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-2 text-center">
                <div className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400">{stats.max}</div>
                <div className="text-xs text-orange-500 dark:text-orange-300">Max</div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4">
            {sequence.length > 0 ? (
              needsVirtualization ? (
                // Virtualisation pour grandes séquences
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    Affichage optimisé pour {sequence.length} éléments
                  </div>
                  <VirtualizedList
                    items={sequence}
                    itemHeight={50}
                    containerHeight={320}
                    searchHistory={searchHistory}
                    className="border rounded-lg bg-white dark:bg-gray-800"
                  />
                </div>
              ) : (
                // Affichage normal pour petites séquences avec scroll
                <div className="max-h-60 sm:max-h-80 overflow-y-auto">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1">
                    {sequence.map((num, index) => (
                      <div
                        key={index}
                        className={`group relative px-3 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex-shrink-0 ${
                          searchHistory.includes(num)
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white ring-2 ring-yellow-300 animate-pulse'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        }`}
                      >
                        {num}
                        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-800 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          {index + 1}
                        </div>
                        {searchHistory.includes(num) && (
                          <div className="absolute -top-0.5 sm:-top-1 -left-0.5 sm:-left-1">
                            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
                            <div className="absolute top-0 left-0 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-24 sm:h-32 text-gray-500 dark:text-gray-400">
                <svg className="w-8 sm:w-12 h-8 sm:h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-center italic text-sm sm:text-base">Aucune séquence enregistrée</p>
              </div>
            )}
          </div>

          {/* Indicateur de performance */}
          {sequence.length > 500 && (
            <div className="mt-3 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="font-medium">
                  Performance optimisée pour {sequence.length} éléments
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}