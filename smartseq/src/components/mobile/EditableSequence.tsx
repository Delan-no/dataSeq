import React, { useState } from 'react';

interface EditableSequenceProps {
  sequence: number[];
  onUpdateNumber: (index: number, newValue: number) => void;
  onMoveNumber: (fromIndex: number, toIndex: number) => void;
  onRemoveNumber: (index: number) => void;
}

export default function EditableSequence({ 
  sequence, 
  onUpdateNumber, 
  onMoveNumber, 
  onRemoveNumber 
}: EditableSequenceProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (index: number, value: number) => {
    setEditingIndex(index);
    setEditValue(value.toString());
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const newValue = parseFloat(editValue);
      if (!isNaN(newValue)) {
        onUpdateNumber(editingIndex, newValue);
      }
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  if (sequence.length === 0) return null;

  return (
    <div className="bg-white/90 dark:bg-gray-700/90 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Séquence actuelle ({sequence.length})
      </h3>
      
      <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto p-2">
        {sequence.map((num, index) => (
          <div key={index} className="relative group">
            {editingIndex === index ? (
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg p-1">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-16 px-2 py-1 text-xs rounded border"
                  autoFocus
                />
                <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-100 rounded">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-100 rounded">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-md relative min-w-[60px] text-center">
                {num}
                
                {/* Boutons d'action */}
                <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => handleEdit(index, num)}
                    className="w-6 h-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => onRemoveNumber(index)}
                    className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                  >
                    ×
                  </button>
                </div>
                
                {/* Boutons de déplacement */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  {index > 0 && (
                    <button
                      onClick={() => onMoveNumber(index, index - 1)}
                      className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                    >
                      ←
                    </button>
                  )}
                  {index < sequence.length - 1 && (
                    <button
                      onClick={() => onMoveNumber(index, index + 1)}
                      className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}