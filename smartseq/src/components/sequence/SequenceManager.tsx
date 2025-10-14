interface Sequence {
  id: number;
  name: string;
  sequence: number[];
  createdAt: Date;
  updatedAt: Date;
}

import { useState } from 'react';
import { useToastContext } from '../ui/ToastProvider';
import ConfirmDialog from '../ui/ConfirmDialog';

interface SequenceManagerProps {
  sequences: Sequence[];
  currentSequenceId: number;
  onSequenceChange: (id: number) => void;
  onCreateSequence: (name: string) => void;
  onDeleteSequence: (id: number) => void;
}

export default function SequenceManager({
  sequences,
  currentSequenceId,
  onSequenceChange,
  onCreateSequence,
  onDeleteSequence
}: SequenceManagerProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<number | null>(null);
  const { success, error } = useToastContext();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('sequenceName') as string;
    if (name?.trim()) {
      onCreateSequence(name.trim());
      e.currentTarget.reset();
      success(`Séquence "${name.trim()}" créée avec succès !`);
    } else {
      error('Veuillez entrer un nom pour la séquence');
    }
  };

  const handleDeleteClick = (sequenceId: number) => {
    if (sequences.length <= 1) {
      error('Impossible de supprimer la dernière séquence');
      return;
    }
    setSequenceToDelete(sequenceId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (sequenceToDelete) {
      const sequenceName = sequences.find(seq => seq.id === sequenceToDelete)?.name;
      onDeleteSequence(sequenceToDelete);
      success(`Séquence "${sequenceName}" supprimée avec succès !`);
    }
    setShowDeleteConfirm(false);
    setSequenceToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSequenceToDelete(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
        <span className="truncate">Gestion des séquences</span>
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {/* Sélection de séquence */}
        <div className="flex gap-2 sm:gap-3">
          <select
            value={currentSequenceId}
            onChange={(e) => onSequenceChange(Number(e.target.value))}
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-xl focus:border-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-800 dark:text-white text-sm sm:text-base truncate"
          >
            {sequences.map(seq => (
              <option key={seq.id} value={seq.id}>
                {seq.name} ({seq.sequence.length})
              </option>
            ))}
          </select>
          
          <button
            onClick={() => handleDeleteClick(currentSequenceId)}
            disabled={sequences.length <= 1}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Création de nouvelle séquence */}
        <form onSubmit={handleCreate} className="flex gap-2 sm:gap-3">
          <input
            name="sequenceName"
            type="text"
            placeholder="Nouvelle séquence..."
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-xl focus:border-green-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
          />
          
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center gap-2 flex-shrink-0 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Créer</span>
          </button>
        </form>

        {/* Statistiques */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {sequences.length}
            </div>
            <div className="text-xs text-blue-500 dark:text-blue-300 font-medium">
              Séquences
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
              {sequences.reduce((sum, seq) => sum + seq.sequence.length, 0)}
            </div>
            <div className="text-xs text-green-500 dark:text-green-300 font-medium">
              Total
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(sequences.reduce((sum, seq) => sum + seq.sequence.length, 0) / sequences.length) || 0}
            </div>
            <div className="text-xs text-purple-500 dark:text-purple-300 font-medium">
              Moyenne
            </div>
          </div>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Supprimer la séquence"
        message={`Êtes-vous sûr de vouloir supprimer la séquence "${sequences.find(seq => seq.id === sequenceToDelete)?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
}