import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useIndexedDB } from "../../hooks/useIndexedDB";
import { useMobileModal } from "../../hooks/useMobileModal";
import SequenceInput from "../../components/sequence/SequenceInput";
import OptimizedSequenceDisplay from "../../components/sequence/OptimizedSequenceDisplay";
import SequenceManager from "../../components/sequence/SequenceManager";
import SearchBar from "../../components/search/SearchBar";
import SearchResults from "../../components/search/SearchResults";
import GradientBackground from "../../components/ui/GradientBackground";
import FloatingActionButton from "../../components/ui/FloatingActionButton";
import MobileSequenceModal from "../../components/mobile/MobileSequenceModal";
import InstallButton from "../../components/ui/InstallButton";


export default function Home() {
  const { 
    sequences, 
    currentSequenceId, 
    setCurrentSequenceId, 
    getCurrentSequence, 
    createSequence, 
    deleteSequence, 
    addNumber, 
    resetSequence, 
    searchInAllSequences,
    updateNumberAt,
    moveNumber,
    removeNumberAt
  } = useIndexedDB();
  
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { isOpen: isMobileModalOpen, openModal, closeModal } = useMobileModal();
  
  const currentSequence = getCurrentSequence();
  const currentSequenceName = sequences.find(s => s.id === currentSequenceId)?.name || "Séquence";

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

  const handleReset = () => {
    resetSequence();
    setSearchResults([]);
    setSearchValue("");
  };

  return (
    <>
      <PageMeta
        title="SmartSeq - Séquences Intelligentes"
        description="Application moderne de gestion de séquences numériques"
      />
      
      <GradientBackground>
        <div className="min-h-screen w-full overflow-x-hidden">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl md:pt-4 pt-16">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                SmartSeq
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-xl lg:max-w-2xl mx-auto px-4">
                Gérez vos séquences numériques avec élégance et efficacité
              </p>
            </div>


        
        {/* Bouton mobile pour ouvrir le modal */}
        <button
          onClick={openModal}
          className="md:hidden fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

            {/* Layout principal */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Colonne gauche - Contrôles (cachée sur mobile) */}
              <div className="hidden md:block xl:col-span-1 space-y-4 sm:space-y-6">
                <SequenceManager
                  sequences={sequences}
                  currentSequenceId={currentSequenceId}
                  onSequenceChange={setCurrentSequenceId}
                  onCreateSequence={createSequence}
                  onDeleteSequence={deleteSequence}
                />
                
                <SequenceInput
                  onAddNumber={addNumber}
                  onReset={handleReset}
                  currentSequence={currentSequence}
                  onUpdateNumber={updateNumberAt}
                  onMoveNumber={moveNumber}
                  onRemoveNumber={removeNumberAt}
                />
              </div>

              {/* Colonne droite - Affichage */}
              <div className="xl:col-span-2 md:col-span-1 space-y-4 sm:space-y-6 min-w-0">
                {/* Barre de recherche - visible sur toutes les tailles */}
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Rechercher un nombre..."
                />

                <OptimizedSequenceDisplay
                  sequence={currentSequence}
                  title={currentSequenceName}
                  searchHistory={JSON.parse(localStorage.getItem('searchHistory') || '[]')}
                />
                
                <SearchResults
                  searchValue={searchValue}
                  results={searchResults}
                />
              </div>
            </div>
          </div>
          
          {/* Bouton d'actions flottant (caché sur mobile) */}
          <div className="hidden md:block">
            <FloatingActionButton
              actions={[
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
                  label: "Nouvelle séquence",
                  onClick: () => createSequence(`Séquence ${sequences.length + 1}`),
                  color: "bg-green-500 hover:bg-green-600"
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
                  label: "Réinitialiser",
                  onClick: handleReset,
                  color: "bg-red-500 hover:bg-red-600"
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                  label: "Statistiques",
                  onClick: () => console.log('Statistiques'),
                  color: "bg-purple-500 hover:bg-purple-600"
                }
              ]}
            />
          </div>

          {/* Modal mobile */}
          <MobileSequenceModal
            isOpen={isMobileModalOpen}
            onClose={closeModal}
            sequences={sequences}
            currentSequenceId={currentSequenceId}
            onSequenceChange={setCurrentSequenceId}
            onCreateSequence={createSequence}
            onDeleteSequence={deleteSequence}
            onAddNumber={addNumber}
            onReset={handleReset}
            onUpdateNumber={updateNumberAt}
            onMoveNumber={moveNumber}
            onRemoveNumber={removeNumberAt}
          />

        </div>
      </GradientBackground>
    </>
  );
}