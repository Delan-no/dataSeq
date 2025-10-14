interface SearchResult {
  sequence: {
    id: number;
    name: string;
  };
  found: boolean;
  subsequence: number[];
  firstIndex: number;
}

interface SearchResultsProps {
  searchValue: string;
  results: SearchResult[];
}

export default function SearchResults({ searchValue, results }: SearchResultsProps) {
  if (!searchValue) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
          <span className="truncate">Résultats pour "{searchValue}"</span>
        </h3>
        <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0">
          {results.length}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {results.map((result) => (
            <div
              key={result.sequence.id}
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-3 sm:p-4 border-l-4 border-green-500 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-2 sm:mb-3 gap-2">
                <h4 className="font-bold text-gray-800 dark:text-white text-base sm:text-lg min-w-0">
                  <span className="truncate">{result.sequence.name}</span>
                </h4>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-semibold">
                    Pos. {result.firstIndex + 1}
                  </div>
                </div>
              </div>
              
              <div className="max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1">
                  {result.subsequence.map((num, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                        index === 0
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-110'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
            Nombre non trouvé
          </p>
          <p className="text-red-500 dark:text-red-300 text-sm mt-1">
            Le nombre "{searchValue}" n'existe dans aucune séquence
          </p>
        </div>
      )}
    </div>
  );
}