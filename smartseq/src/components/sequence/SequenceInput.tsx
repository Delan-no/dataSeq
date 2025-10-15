import { useState } from 'react';
import { useToastContext } from '../ui/ToastProvider';

interface SequenceInputProps {
  onAddNumber: (num: number) => void;
  onReset: () => void;
  disabled?: boolean;
  currentSequence?: number[];
  onUpdateNumber?: (index: number, newValue: number) => void;
  onMoveNumber?: (fromIndex: number, toIndex: number) => void;
  onRemoveNumber?: (index: number) => void;
}

export default function SequenceInput({ onAddNumber, onReset, disabled, currentSequence = [], onUpdateNumber, onMoveNumber, onRemoveNumber }: SequenceInputProps) {
  const [inputValue, setInputValue] = useState('');
  const { success, error } = useToastContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      onAddNumber(num);
      setInputValue('');
      success(`Nombre ${num} ajouté avec succès !`);
    } else {
      error('Veuillez entrer un nombre valide');
    }
  };

  const handleReset = () => {
    onReset();
    success('Séquence réinitialisée avec succès !');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
        <span className="truncate">Ajouter un nombre</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="relative">
          <input
            type="number"
            step="0.1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Entrez un nombre..."
            disabled={disabled}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-xl focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-50"></div>
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <button
            type="submit"
            disabled={disabled || !inputValue.trim()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Ajouter</span>
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={disabled}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </form>
      
      {/* Affichage de la séquence en temps réel */}
      {currentSequence.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Nombres ajoutés ({currentSequence.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {currentSequence.map((num, index) => (
              <div key={index} className="relative group">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm hidden md:inline-block">
                  {num}
                </span>
                
                {/* Version éditable pour mobile */}
                <div className="md:hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm relative min-w-[50px] text-center">
                  {num}
                  
                  {onUpdateNumber && onRemoveNumber && (
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => {
                          const newValue = prompt('Nouveau nombre:', num.toString());
                          if (newValue && !isNaN(parseFloat(newValue))) {
                            onUpdateNumber(index, parseFloat(newValue));
                          }
                        }}
                        className="w-5 h-5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => onRemoveNumber(index)}
                        className="w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  {onMoveNumber && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      {index > 0 && (
                        <button
                          onClick={() => onMoveNumber(index, index - 1)}
                          className="w-5 h-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                        >
                          ←
                        </button>
                      )}
                      {index < currentSequence.length - 1 && (
                        <button
                          onClick={() => onMoveNumber(index, index + 1)}
                          className="w-5 h-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                        >
                          →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}