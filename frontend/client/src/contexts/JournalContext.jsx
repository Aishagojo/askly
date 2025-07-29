import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'journalEntries'),
      (snapshot) => {
        const journalEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date()
        }));
        setEntries(journalEntries);
        setLoading(false);
        setError(null); // Clear error on successful load
      },
      (error) => {
        console.error("Error fetching entries: ", error);
        setError("Failed to load journal entries");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addEntry = async (entry) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'journalEntries'), {
        content: entry.content,
        prompt: entry.prompt || null, // Handle undefined prompt
        date: serverTimestamp() // Use server timestamp instead of client-side
      });
      setError(null); // Clear error on success
    } catch (error) {
      console.error("Error adding entry: ", error);
      setError("Failed to save entry. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'journalEntries', id));
      setError(null);
    } catch (error) {
      console.error("Error deleting entry: ", error);
      setError("Failed to delete entry");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (id, newContent) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'journalEntries', id), {
        content: newContent,
        lastUpdated: serverTimestamp() // Add update timestamp
      });
      setError(null);
    } catch (error) {
      console.error("Error updating entry: ", error);
      setError("Failed to update entry");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <JournalContext.Provider 
      value={{ 
        entries, 
        addEntry, 
        deleteEntry, 
        updateEntry, 
        loading,
        error // Make error available to components
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};