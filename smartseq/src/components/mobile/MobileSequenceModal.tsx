import SequenceManager from '../sequence/SequenceManager';
import SequenceInput from '../sequence/SequenceInput';
import EditableSequence from './EditableSequence';
import './MobileSequenceModal.css';

interface Sequence {
  id: number;
  name: string;
  sequence: number[];
  createdAt: Date;
  updatedAt: Date;
}

interface MobileSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sequences: Sequence[];
  currentSequenceId: number;
  onSequenceChange: (id: number) => void;
  onCreateSequence: (name: string) => void;
  onDeleteSequence: (id: number) => void;
  onAddNumber: (number: number) => void;
  onReset: () => void;
  onUpdateNumber: (index: number, newValue: number) => void;
  onMoveNumber: (fromIndex: number, toIndex: number) => void;
  onRemoveNumber: (index: number) => void;
}

export default function MobileSequenceModal({
  isOpen,
  onClose,
  sequences,
  currentSequenceId,
  onSequenceChange,
  onCreateSequence,
  onDeleteSequence,
  onAddNumber,
  onReset,
  onUpdateNumber,
  onMoveNumber,
  onRemoveNumber
}: MobileSequenceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 backdrop-enter"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-x-2 top-2 bottom-2 xs:inset-x-3 xs:top-3 xs:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl xs:rounded-3xl shadow-2xl overflow-hidden flex flex-col modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Gestion des séquences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 modal-content">
          <SequenceManager
            sequences={sequences}
            currentSequenceId={currentSequenceId}
            onSequenceChange={onSequenceChange}
            onCreateSequence={onCreateSequence}
            onDeleteSequence={onDeleteSequence}
          />
          
          <SequenceInput
            onAddNumber={onAddNumber}
            onReset={onReset}
            currentSequence={sequences.find(s => s.id === currentSequenceId)?.sequence || []}
          />
          
          {/* Affichage éditable de la séquence */}
          <EditableSequence
            sequence={sequences.find(s => s.id === currentSequenceId)?.sequence || []}
            onUpdateNumber={onUpdateNumber}
            onMoveNumber={onMoveNumber}
            onRemoveNumber={onRemoveNumber}
          />
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:from-green-700 active:to-emerald-800 text-white font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Terminer
          </button>
        </div>
      </div>
    </div>
  );
}