import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useIndexedDB } from "../../hooks/useIndexedDB";

export default function Home() {
  const { sequences, currentSequenceId, setCurrentSequenceId, getCurrentSequence, createSequence, deleteSequence, addNumber, resetSequence, searchInAllSequences } = useIndexedDB();
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [newSequenceName, setNewSequenceName] = useState("");
  
  const currentSequence = getCurrentSequence();

  const handleAddNumber = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      addNumber(num);
      setInputValue("");
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        const results = searchInAllSequences(num);
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleCreateSequence = () => {
    if (newSequenceName.trim()) {
      createSequence(newSequenceName.trim());
      setNewSequenceName("");
    }
  };

  const handleReset = () => {
    resetSequence();
    setSearchResults([]);
    setSearchValue("");
  };

  return (
    <>
      <PageMeta
        title="Séquences de Chiffres"
        description="Application de gestion de séquences numériques"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Séquences de Chiffres
            </h1>
            
            {/* Gestion des séquences */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex gap-3 mb-4">
                <select
                  value={currentSequenceId}
                  onChange={(e) => setCurrentSequenceId(Number(e.target.value))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                >
                  {sequences.map(seq => (
                    <option key={seq.id} value={seq.id}>{seq.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => deleteSequence(currentSequenceId)}
                  disabled={sequences.length <= 1}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Supprimer
                </button>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSequenceName}
                  onChange={(e) => setNewSequenceName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateSequence()}
                  placeholder="Nom de la nouvelle séquence"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <button
                  onClick={handleCreateSequence}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Créer
                </button>
              </div>
            </div>
            
            {/* Saisie */}
            <div className="mb-6">
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
                  placeholder="Entrez un nombre (ex: 1.5)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  onClick={handleAddNumber}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Recherche */}
            <div className="mb-6">
              <input
                type="number"
                step="0.1"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Rechercher un nombre dans la séquence"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Affichage séquence complète */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {sequences.find(s => s.id === currentSequenceId)?.name} ({currentSequence.length} éléments)
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[60px] max-h-40 overflow-y-auto">
                {currentSequence.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentSequence.map((num, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    Aucune séquence enregistrée
                  </p>
                )}
              </div>
            </div>

            {/* Résultats de recherche */}
            {searchValue && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Résultats de recherche pour "{searchValue}" ({searchResults.length} séquence{searchResults.length > 1 ? 's' : ''} trouvée{searchResults.length > 1 ? 's' : ''})
                </h3>
                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((result, resultIndex) => (
                      <div key={result.sequence.id} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {result.sequence.name}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Position: {result.firstIndex + 1}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.subsequence.map((num: number, index: number) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-sm ${
                                index === 0
                                  ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 font-bold'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Nombre non trouvé dans aucune séquence
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}