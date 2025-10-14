import { useState, useEffect } from 'react';

interface SequenceData {
  id: number;
  name: string;
  sequence: number[];
  createdAt: Date;
  updatedAt: Date;
}

export const useIndexedDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [sequences, setSequences] = useState<SequenceData[]>([]);
  const [currentSequenceId, setCurrentSequenceId] = useState<number>(1);

  useEffect(() => {
    const openDB = () => {
      const request = indexedDB.open('SequenceDB', 1);
      
      request.onerror = () => console.error('Erreur IndexedDB');
      
      request.onsuccess = () => {
        const database = request.result;
        setDb(database);
        loadSequences(database);
      };
      
      request.onupgradeneeded = () => {
        const database = request.result;
        const store = database.createObjectStore('sequences', { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      };
    };
    
    openDB();
  }, []);

  const createSequence = async (name: string) => {
    if (!db) return;
    
    const newId = Date.now();
    const newSequence: SequenceData = {
      id: newId,
      name,
      sequence: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const transaction = db.transaction(['sequences'], 'readwrite');
    const store = transaction.objectStore('sequences');
    store.add(newSequence);
    
    setSequences(prev => [...prev, newSequence]);
    setCurrentSequenceId(newId);
  };

  const deleteSequence = async (id: number) => {
    if (!db) return;
    
    const transaction = db.transaction(['sequences'], 'readwrite');
    const store = transaction.objectStore('sequences');
    store.delete(id);
    
    setSequences(prev => prev.filter(seq => seq.id !== id));
    if (currentSequenceId === id) {
      const remaining = sequences.filter(seq => seq.id !== id);
      setCurrentSequenceId(remaining.length > 0 ? remaining[0].id : 0);
    }
  };

  const loadSequences = async (database: IDBDatabase) => {
    const transaction = database.transaction(['sequences'], 'readonly');
    const store = transaction.objectStore('sequences');
    const request = store.getAll();
    
    request.onsuccess = () => {
      const results = request.result || [];
      setSequences(results);
      if (results.length === 0) {
        createSequence('Séquence 1');
      }
    };
  };

  const updateSequence = async (id: number, newSequence: number[]) => {
    if (!db) return;
    
    const currentSeq = sequences.find(seq => seq.id === id);
    if (!currentSeq) return;
    
    const updatedSeq = {
      ...currentSeq,
      sequence: newSequence,
      updatedAt: new Date()
    };
    
    const transaction = db.transaction(['sequences'], 'readwrite');
    const store = transaction.objectStore('sequences');
    store.put(updatedSeq);
    
    setSequences(prev => prev.map(seq => seq.id === id ? updatedSeq : seq));
  };

  const addNumber = (num: number) => {
    const currentSeq = sequences.find(seq => seq.id === currentSequenceId);
    if (!currentSeq) return;
    
    const newSequence = [...currentSeq.sequence, num];
    updateSequence(currentSequenceId, newSequence);
  };

  const resetSequence = () => {
    updateSequence(currentSequenceId, []);
  };

  const searchInAllSequences = (searchNum: number) => {
    // Sauvegarder dans l'historique de recherche
    const currentHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    if (!currentHistory.includes(searchNum)) {
      const newHistory = [...currentHistory, searchNum].slice(-20); // Garder les 20 dernières recherches
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
    
    return sequences
      .map(seq => {
        const index = seq.sequence.indexOf(searchNum);
        return {
          sequence: seq,
          found: index !== -1,
          subsequence: index !== -1 ? seq.sequence.slice(index) : [],
          firstIndex: index
        };
      })
      .filter(result => result.found)
      .sort((a, b) => a.firstIndex - b.firstIndex); // Tri par ordre d'apparition
  };

  const getCurrentSequence = () => {
    return sequences.find(seq => seq.id === currentSequenceId)?.sequence || [];
  };

  return {
    sequences,
    currentSequenceId,
    setCurrentSequenceId,
    getCurrentSequence,
    createSequence,
    deleteSequence,
    addNumber,
    resetSequence,
    searchInAllSequences
  };
};