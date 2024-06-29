'use client';
import { getSession } from '@/actions/session';
import { useNotes } from '@/context/NotesContext';
import { useSession } from '@/context/SessionContext';
import { DocumentPlusIcon, DocumentTextIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NoteStart = () => {
  const { notes, setNotes, notesLoading } = useNotes();
  const { session } = useSession();

  const { push } = useRouter();

  const newNote = async () => {
    if (session && session.isLoggedIn) {
      const note = await axios.post('/api/notes', { userId: session.email });
      setNotes([...notes, note.data]);
      push(`/notes/${note.data._id}`);
    }
  }

  const newWelcomeNote = async () => {
    if (session && session.isLoggedIn) {
      const note = await axios.post('/api/notes/template', { userId: session.email });
      setNotes([...notes, note.data]);
      push(`/notes/${note.data._id}`);
    }
  }

  return (
    <div className='ml-56 flex-1 flex-col p-2'>
      <div className='flex flex-col px-60 py-32'>
        <h1 className='text-4xl font-semibold mb-8'>NoteMarkdown</h1>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>Start</h1>
            <div className='flex items-center gap-1 p-2 w-fit rounded-md text-secondary hover:bg-base-100 hover:cursor-pointer' onClick={newNote}>
              <DocumentPlusIcon className='w-5 h-5 text-secondary' /> Create a new note
            </div>
            <div className='flex items-center gap-1 p-2 w-fit rounded-md text-secondary hover:bg-base-100 hover:cursor-pointer' onClick={newWelcomeNote}>
              <DocumentTextIcon className='w-5 h-5 text-secondary' /> Create a new note using template
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteStart;