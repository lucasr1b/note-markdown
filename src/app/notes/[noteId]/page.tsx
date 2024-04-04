'use client'
import Note from '@/components/note/Note';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>('Untitled')
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      const note = await axios.get(`/api/notes/${params.noteId}`);
      setContent(note.data.content);
      setTitle(note.data.title);
    }
    fetchNote();
    console.log('Called');
  }, [params.noteId]);

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar newNoteTitle={newNoteTitle} />
      <Note content={content} setContent={setContent} newNoteTitle={title} setNewNoteTitle={setTitle} />
    </main>
  );
};

export default NotePage;