'use client'
import Note from '@/components/note/Note';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>('Untitled')
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await axios.get('/api/notes');
      setNotes(fetchedNotes.data);
    }
    fetchNotes();
  }, [])

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
      <Sidebar notes={notes} setNotes={setNotes} newNoteTitle={newNoteTitle} />
      <Note id={params.noteId} content={content} setContent={setContent} newNoteTitle={title} setNewNoteTitle={setTitle} setNotes={setNotes} />
    </main>
  );
};

export default NotePage;