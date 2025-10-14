interface SequenceDisplayProps {
  sequence: number[];
  title: string;
  className?: string;
}

export default function SequenceDisplay({ sequence, title, className = '' }: SequenceDisplayProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          {title}
        </h3>
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
          {sequence.length} éléments
        </div>
      </div>
      
      <div className="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-4 min-h-[120px] max-h-60 overflow-y-auto">
        {sequence.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sequence.map((num, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {num}
                <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-center italic">Aucune séquence enregistrée</p>
          </div>
        )}
      </div>
    </div>
  );
}