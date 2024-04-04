'use client';
import { useState } from 'react';
import Note from '@/components/note/Note';
import Sidebar from '@/components/Sidebar';
import MarkdownSample from '@/utils/markdownSample';

const NotesPage = () => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>('Untitled');
  const [content, setContent] = useState(MarkdownSample);

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar newNoteTitle={newNoteTitle} />
      <Note content={content} setContent={setContent} newNoteTitle={newNoteTitle} setNewNoteTitle={setNewNoteTitle} />
    </main>
  );
};

export default NotesPage;