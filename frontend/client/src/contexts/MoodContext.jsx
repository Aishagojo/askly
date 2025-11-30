import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = onSnapshot(collection(db, 'moodTracker', user.uid, 'entries'), (snapshot) => {
      const moodEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date()
      }));
      setEntries(moodEntries);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const addEntry = async (entry) => {
    if (!user?.uid) throw new Error('User not authenticated');
    try {
      await addDoc(collection(db, 'moodTracker', user.uid, 'entries'), {
        ...entry,
        date: new Date(entry.date)
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