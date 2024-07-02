'use client';
import NoteItem from '@/components/note/NoteItem';
import Sidebar from '@/components/sidebar/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import MobileNav from '@/components/MobileNav';
import { useRouter } from 'next/navigation';
import { useMobileView } from '@/context/MobileViewContext';

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const { notes, setNotes } = useNotes();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const { isMobileView, isMobileNavOpened } = useMobileView();

  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await axios.get(`/api/notes/${params.noteId}`);
        setContent(note.data.content);
        setTitle(note.data.title);
        setUserId(note.data.userId);
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          router.push('/');
        } else {
          console.error('Error fetching notes:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [params.noteId, router]);

  return (
    <main className='flex flex-col md:flex-row min-h-screen bg-base-300'>
      {isMobileView ? (isMobileNavOpened && <Sidebar />) : <Sidebar />}
      {isMobileView ? (!isMobileNavOpened && <MobileNav />) : null}
      <NoteItem id={params.noteId} userId={userId} content={content} setContent={setContent} title={title} setTitle={setTitle} setNotes={setNotes} isLoading={isLoading} />
    </main>
  );
};

export default NotePage;