import { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import { useIndexedDB } from '../../hooks/useIndexedDB';
import GradientBackground from '../../components/ui/GradientBackground';

export default function SequencesPage() {
  const { sequences, setCurrentSequenceId } = useIndexedDB();
  const [selectedSequence, setSelectedSequence] = useState<number | null>(null);
  const [searchHistory] = useState<number[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSequenceClick = (sequenceId: number) => {
    setSelectedSequence(sequenceId);
    setCurrentSequenceId(sequenceId);
  };

  const selectedSeq = sequences.find(seq => seq.id === selectedSequence);

  const isSearchedNumber = (num: number) => {
    return searchHistory.includes(num);
  };

  return (
    <>
      <PageMeta
        title="Mes Séquences - SmartSeq"
        description="Vue d'ensemble de toutes vos séquences numériques"
      />
      
      <GradientBackground>
        <div className="min-h-screen w-full overflow-x-hidden">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                Mes Séquences
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg px-4">
                Vue d'ensemble et gestion de vos séquences numériques
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="xl:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="truncate">Toutes les séquences ({sequences.length})</span>
                </h2>
                
                <div className="space-y-2 sm:space-y-3 max-h-96 sm:max-h-none overflow-y-auto">
                  {sequences.map((seq) => (
                    <div
                      key={seq.id}
                      onClick={() => handleSequenceClick(seq.id)}
                      className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                        selectedSequence === seq.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <h3 className="font-semibold truncate min-w-0 text-sm sm:text-base">{seq.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          selectedSequence === seq.id
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        }`}>
                          {seq.sequence.length}
                        </div>
                      </div>
                      
                      <div className="text-xs sm:text-sm opacity-75 mb-2">
                        Créée le {new Date(seq.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      
                      {seq.sequence.length > 0 && (
                        <div className="flex gap-1 overflow-hidden">
                          {seq.sequence.slice(0, 4).map((num, idx) => (
                            <span
                              key={idx}
                              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs flex-shrink-0 ${
                                selectedSequence === seq.id
                                  ? 'bg-white/20 text-white'
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {num}
                            </span>
                          ))}
                          {seq.sequence.length > 4 && (
                            <span className="text-xs opacity-50 flex-shrink-0">...</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:col-span-2 min-w-0">
              {selectedSeq ? (
                <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
                  <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="truncate">{selectedSeq.name}</span>
                    </h2>
                    <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                      <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {selectedSeq.sequence.length}
                      </div>
                      {searchHistory.length > 0 && (
                        <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hidden sm:block">
                          {searchHistory.length}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedSeq.sequence.length}
                      </div>
                      <div className="text-sm text-blue-500 dark:text-blue-300">Total</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedSeq.sequence.length > 0 ? Math.round((selectedSeq.sequence.reduce((a, b) => a + b, 0) / selectedSeq.sequence.length) * 100) / 100 : 0}
                      </div>
                      <div className="text-sm text-green-500 dark:text-green-300">Moyenne</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedSeq.sequence.length > 0 ? Math.min(...selectedSeq.sequence) : 0}
                      </div>
                      <div className="text-sm text-purple-500 dark:text-purple-300">Min</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {selectedSeq.sequence.length > 0 ? Math.max(...selectedSeq.sequence) : 0}
                      </div>
                      <div className="text-sm text-orange-500 dark:text-orange-300">Max</div>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4">
                    {selectedSeq.sequence.length > 0 ? (
                      <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1">
                          {selectedSeq.sequence.map((num, index) => (
                            <div
                              key={index}
                              className={`group relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex-shrink-0 ${
                                isSearchedNumber(num)
                                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white ring-1 sm:ring-2 ring-yellow-300 animate-pulse'
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
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p>Cette séquence est vide</p>
                      </div>
                    )}
                  </div>

                  {searchHistory.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="font-medium">Nombres recherchés précédemment</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-6 sm:p-12 shadow-xl border border-white/20 text-center">
                  <svg className="w-16 sm:w-24 h-16 sm:h-24 mx-auto mb-4 sm:mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Sélectionnez une séquence
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Cliquez sur une séquence dans la liste pour voir ses détails
                  </p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </GradientBackground>
    </>
  );
}