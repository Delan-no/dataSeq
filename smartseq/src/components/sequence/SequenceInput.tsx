import { useState } from 'react';

interface SequenceInputProps {
  onAddNumber: (num: number) => void;
  onReset: () => void;
  disabled?: boolean;
}

export default function SequenceInput({ onAddNumber, onReset, disabled }: SequenceInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      onAddNumber(num);
      setInputValue('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        Ajouter un nombre
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="number"
            step="0.1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Entrez un nombre..."
            disabled={disabled}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-xl focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-50"></div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={disabled || !inputValue.trim()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
          
          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}