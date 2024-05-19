'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import axios from 'axios';
import NoteStart from '@/components/NoteStart';

const NoteStartPage = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await axios.get('/api/notes');
      setNotes(fetchedNotes.data);
    }
    fetchNotes();
  }, [])

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar />
      <NoteStart />
    </main>
  );
};

export default NoteStartPage;