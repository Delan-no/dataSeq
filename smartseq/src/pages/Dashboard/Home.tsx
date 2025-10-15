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
        title="Séquences"
        description="Gestion de séquences numériques"
      />
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Header */}
          <div className="text-center py-2">
            <h1 className="text-xl font-medium text-gray-800">Séquences</h1>
          </div>

          {/* Sélection séquence */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <select
              value={currentSequenceId}
              onChange={(e) => setCurrentSequenceId(Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-gray-400"
            >
              {sequences.map(seq => (
                <option key={seq.id} value={seq.id}>{seq.name}</option>
              ))}
            </select>
            
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={newSequenceName}
                onChange={(e) => setNewSequenceName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateSequence()}
                placeholder="Nouvelle séquence"
                className="flex-1 p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-gray-400"
              />
              <button
                onClick={handleCreateSequence}
                className="px-4 py-3 bg-gray-800 text-white rounded-lg text-sm font-medium"
              >
                +
              </button>
            </div>
            
            {sequences.length > 1 && (
              <button
                onClick={() => deleteSequence(currentSequenceId)}
                className="w-full mt-2 p-2 text-red-600 text-sm"
              >
                Supprimer cette séquence
              </button>
            )}
          </div>

          {/* Saisie nombre */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
                placeholder="Nombre"
                className="flex-1 p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-gray-400"
              />
              <button
                onClick={handleAddNumber}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium"
              >
                OK
              </button>
            </div>
            
            <button
              onClick={handleReset}
              className="w-full mt-3 p-2 text-gray-600 text-sm"
            >
              Vider la séquence
            </button>
          </div>

          {/* Recherche */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <input
              type="number"
              step="0.1"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher un nombre"
              className="w-full p-3 border border-gray-200 rounded-lg text-base focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Séquence actuelle */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">
                {sequences.find(s => s.id === currentSequenceId)?.name}
              </h3>
              <span className="text-sm text-gray-500">
                {currentSequence.length}
              </span>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 min-h-[80px] max-h-48 overflow-y-auto">
              {currentSequence.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentSequence.map((num, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center text-sm mt-6">
                  Aucun nombre
                </p>
              )}
            </div>
          </div>

          {/* Résultats recherche */}
          {searchValue && (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-3">
                Recherche: {searchValue}
              </h3>
              
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <div key={result.sequence.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 text-sm">
                          {result.sequence.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Position {result.firstIndex + 1}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {result.subsequence.map((num: number, index: number) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs ${
                              index === 0
                                ? 'bg-gray-800 text-white font-medium'
                                : 'bg-gray-100 text-gray-600'
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
                <p className="text-gray-400 text-center text-sm">
                  Aucun résultat
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}