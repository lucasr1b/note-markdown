'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Note } from '@/utils/types';
import { useSession } from './SessionContext';
import welcomeNote from '@/utils/welcomeNote';

type NotesContextType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notesLoading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const { session, sessionLoading } = useSession();

  useEffect(() => {
    const fetchNotes = async () => {
      if (sessionLoading) return;

      if (session && session.isLoggedIn) {
        try {
          const fetchedNotes = await axios.get('/api/notes');
          setNotes(fetchedNotes.data);
        } catch (err: any) {
          console.error('Error fetching notes:', err);
        } finally {
          setNotesLoading(false);
        }
      } else {
        setNotes([welcomeNote]);
        setNotesLoading(false);
      }
    };

    fetchNotes();
  }, [session, sessionLoading]);

  return (
    <NotesContext.Provider value={{ notes, setNotes, notesLoading }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};