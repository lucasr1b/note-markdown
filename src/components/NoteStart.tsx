import { useNotes } from '@/context/NotesContext';
import { DocumentPlusIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NoteStart = () => {
  const { notes, setNotes, notesLoading } = useNotes();
  const session = useSession();

  const { push } = useRouter();

  const newNote = async () => {
    const note = await axios.post('/api/notes', { userId: session.data?.user?.email });
    setNotes([...notes, note.data]);
    push(`/notes/${note.data._id}`);
  }

  return (
    <div className='ml-56 flex-1 flex-col p-2'>
      <div className='flex flex-col px-60 py-32'>
        <h1 className='text-4xl font-semibold mb-8'>NoteMarkdown</h1>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>Start</h1>
            <div className='flex items-center gap-1 p-2 w-fit rounded-md text-secondary hover:bg-base-100 hover:cursor-pointer' onClick={newNote}>
              <DocumentPlusIcon className='w-5 h-5 text-secondary' /> Create a new note...
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>Recent</h1>
            <div className='flex flex-col gap-1 px-2'>
              <p className='flex items-center gap-1 text-secondary hover:text-primary hover:cursor-pointer w-fit'>Hello World</p>
              <p className='flex items-center gap-1 text-secondary hover:text-primary hover:cursor-pointer w-fit'>Lucas Ribeiro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteStart;