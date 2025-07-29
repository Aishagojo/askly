import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'moodEntries'), (snapshot) => {
      const moodEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate() // Convert Firestore timestamp to JS Date
      }));
      setEntries(moodEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addEntry = async (entry) => {
    try {
      await addDoc(collection(db, 'moodEntries'), {
        ...entry,
        date: new Date(entry.date) // Ensure date is properly stored
      });
    } catch (error) {
      console.error("Error adding mood entry: ", error);
    }
  };

  return (
    <MoodContext.Provider value={{ entries, addEntry, loading }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => React.useContext(MoodContext);