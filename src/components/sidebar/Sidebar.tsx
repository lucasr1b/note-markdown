'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNotes } from '@/context/NotesContext';
import SidebarItem from './SidebarItem';
import { ArrowRightStartOnRectangleIcon, DocumentPlusIcon } from '@heroicons/react/16/solid';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
  const { notes, setNotes, notesLoading } = useNotes();
  const session = useSession();
  const sessionLoading = session.status === 'loading';
  const { push } = useRouter();

  const getSelectedNoteId = () => {
    return window.location.pathname.split('/').pop() as string;
  };

  const newNote = async () => {
    const note = await axios.post('/api/notes', { userId: session.data?.user?.email });
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
      {notesLoading ? (
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='w-full h-10 leading-relaxed animate-pulse bg-code rounded-md'></div>
          ))}
        </div>
      ) : (
        notes.map((note) => (
          <SidebarItem key={note._id} note={note} deleteNote={deleteNote} getSelectedNoteId={getSelectedNoteId} />
        ))
      )}
      {!sessionLoading && (
        session.data?.user ? (
          <div className='flex items-center px-2 bg-neutral h-12 btn-neutral rounded-md mt-auto mb-4 group justify-between'>
            <div className='flex items-center'>
              <img className='w-6 h-6 mr-2 rounded-full' src={session.data.user.image} alt='User profile image' />
              <span className='font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-32'>{session.data.user.email}</span>
            </div>
            <div className='hidden group-hover:block p-1 rounded hover:bg-code hover:cursor-pointer' onClick={() => signOut()}>
              <ArrowRightStartOnRectangleIcon className='w-4 h-4 text-red-500' />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2 mt-auto mb-4'>
            <Link className='btn btn-sm h-10 btn-primary no-animation' href={'/signup'}>
              Sign up
            </Link>
            <Link className='btn btn-sm h-10 border-neutral no-animation hover:bg-neutral hover:border-neutral' href={'/login'}>
              Log in
            </Link>
          </div>
        ))}
    </ul>
  );
};

export default Sidebar;