'use client';
import Note from '@/components/note/Note';
import Sidebar from '@/components/sidebar/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNotes } from '@/context/NotesContext';

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await axios.get(`/api/notes/${params.noteId}`);
        setContent(note.data.content);
        setTitle(note.data.title);
      } catch (err) {
        console.error('Error fetching notes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [params.noteId]);

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar />
      <Note id={params.noteId} content={content} setContent={setContent} newNoteTitle={title} setNewNoteTitle={setTitle} setNotes={setNotes} isLoading={isLoading} />
    </main>
  );
};

export default NotePage;