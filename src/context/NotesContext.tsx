'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notesLoading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await axios.get('/api/notes');
        setNotes(fetchedNotes.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setNotesLoading(false);
      }
    };
    fetchNotes();
  }, []);

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