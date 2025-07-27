import React, { createContext, useContext, useState } from 'react';

const JournalContext = createContext(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries(prev => [entry, ...prev]);
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const updateEntry = (id, content) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, content } : entry
    ));
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, deleteEntry, updateEntry }}>
      {children}
    </JournalContext.Provider>
  );
};