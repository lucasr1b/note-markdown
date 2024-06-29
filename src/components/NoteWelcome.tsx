'use client';
import NoteItem from '@/components/note/NoteItem';
import Sidebar from '@/components/sidebar/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import welcomeNote from '@/utils/welcomeNote';

const NoteWelcome = () => {
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setContent(welcomeNote.content);
        setTitle(welcomeNote.title);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, []);

  return (
    <main className='flex min-h-screen bg-base-300 w-full'>
      <Sidebar />
      <NoteItem id={welcomeNote._id} content={content} setContent={setContent} title={title} setTitle={setTitle} setNotes={setNotes} isLoading={isLoading} />
    </main>
  );
};

export default NoteWelcome;