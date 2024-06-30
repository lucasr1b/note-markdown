'use client';
import NoteItem from '@/components/note/NoteItem';
import Sidebar from '@/components/sidebar/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import MobileNav from '@/components/MobileNav';

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await axios.get(`/api/notes/${params.noteId}`);
        setContent(note.data.content);
        setTitle(note.data.title);
        setUserId(note.data.userId);
      } catch (err: any) {
        console.error('Error fetching notes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [params.noteId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className='flex flex-col md:flex-row min-h-screen bg-base-300'>
      {isMobileView ? isMobileNavOpened && <Sidebar isMobileNavOpened={isMobileNavOpened} closeMobileNav={() => setIsMobileNavOpened(false)} /> : <Sidebar />}
      {isMobileView ? !isMobileNavOpened && <MobileNav toggleNav={() => setIsMobileNavOpened(true)} /> : null}
      <NoteItem id={params.noteId} userId={userId} content={content} setContent={setContent} title={title} setTitle={setTitle} setNotes={setNotes} isMobileView={isMobileView} isMobileNavOpened={isMobileNavOpened} isLoading={isLoading} />
    </main>
  );
};

export default NotePage;