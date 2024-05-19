'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNotes } from '@/context/NotesContext';
import SidebarItem from './SidebarItem';
import { DocumentPlusIcon, PencilIcon } from '@heroicons/react/16/solid';

const Sidebar = () => {
  const { notes, setNotes, notesLoading } = useNotes();
  const { push } = useRouter();

  const getSelectedNoteId = () => {
    return window.location.pathname.split('/').pop() as string;
  };

  const newNote = async () => {
    const note = await axios.post('/api/notes', { userId: '1' });
    setNotes([...notes, note.data]);
  };

  const deleteNote = async (e: React.MouseEvent, noteId: string) => {
    if (getSelectedNoteId() === noteId) push('/');
    e.preventDefault();
    setNotes(notes.filter((note) => note._id !== noteId));
    await axios.delete(`/api/notes/${noteId}`);
  };

  return (
    <ul className='menu fixed w-56 h-full bg-base-200 border-r-2 border-base-100 gap-1'>
      <Link className='my-2 font-bold text-2xl text-center' href={'/'}>
        NoteMarkdown
      </Link>
      <button className='btn btn-sm h-10 btn-neutral shadow-md mt-2 mb-8 no-animation' onClick={newNote}>
        <DocumentPlusIcon className='w-5 h-5' />
        Create new note
      </button>
      {
        notesLoading ? (
          <div className='flex flex-col gap-2'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='w-full h-10 leading-relaxed animate-pulse bg-code rounded-md'></div>
            ))}
          </div>
        ) : (
          notes.map((note) => (
            <SidebarItem key={note._id} note={note} deleteNote={deleteNote} getSelectedNoteId={getSelectedNoteId} />
          ))
        )
      }
      <div className='flex flex-col gap-2 mt-auto mb-4'>
        <li className='btn btn-sm h-10 btn-primary no-animation '>
          Sign up
        </li>
        <li className='btn btn-sm h-10 border-neutral no-animation hover:bg-neutral hover:border-neutral'>
          Log in
        </li>
      </div>
    </ul >
  );
};

export default Sidebar;