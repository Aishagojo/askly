import React, { createContext, useContext, useState } from 'react';

const MoodContext = createContext(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries(prev => [entry, ...prev.sort((a, b) => b.date.getTime() - a.date.getTime())]);
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <MoodContext.Provider value={{ entries, addEntry, deleteEntry }}>
      {children}
    </MoodContext.Provider>
  );
};