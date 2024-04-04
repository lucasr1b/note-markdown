'use client';
import { useState } from 'react';
import NoteEditor from '@/components/note/Note';
import Sidebar from '@/components/Sidebar';

const NotesPage = () => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>('Untitled');

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar newNoteTitle={newNoteTitle} />
      <NoteEditor newNoteTitle={newNoteTitle} setNewNoteTitle={setNewNoteTitle} />
    </main>
  );
};

export default NotesPage;