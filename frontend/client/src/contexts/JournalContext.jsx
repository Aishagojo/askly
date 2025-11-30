import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      setEntries([]);
      setLoading(false);
      setError('User not authenticated');
      return;
    }
    const unsubscribe = onSnapshot(
      collection(db, 'journalEntries', user.uid, 'entries'),
      (snapshot) => {
        const journalEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date()
        }));
        setEntries(journalEntries);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Error fetching entries: ", error);
        setError("Failed to load journal entries");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const addEntry = async (entry) => {
    if (!user?.uid) throw new Error('User not authenticated');
    setLoading(true);
    try {
      await addDoc(collection(db, 'journalEntries', user.uid, 'entries'), {
        content: entry.content,
        prompt: entry.prompt || null,
        date: serverTimestamp()
      });
      setError(null);
    } catch (error) {
      console.error("Error adding entry: ", error);
      setError("Failed to save entry. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    if (!user?.uid) throw new Error('User not authenticated');
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'journalEntries', user.uid, 'entries', id));
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
    if (!user?.uid) throw new Error('User not authenticated');
    setLoading(true);
    try {
      await updateDoc(doc(db, 'journalEntries', user.uid, 'entries', id), {
        content: newContent,
        lastUpdated: serverTimestamp()
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
        error
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