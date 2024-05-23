'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNotes } from '@/context/NotesContext';
import SidebarItem from './SidebarItem';
import { ArrowRightStartOnRectangleIcon, DocumentPlusIcon } from '@heroicons/react/16/solid';
import { logout } from '@/actions/session';
import { useSession } from '@/context/SessionContext';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const { notes, setNotes, notesLoading } = useNotes();
  const { session, setSession, sessionLoading } = useSession();
  const { push } = useRouter();
  const pathName = usePathname();

  const getSelectedNoteId = () => {
    const segments = pathName.split('/');
    return segments.length > 2 && segments[1] === 'notes' ? segments[2] : '';
  };

  const newNote = async () => {
    if (session && session.email) {
      const note = await axios.post('/api/notes', { userId: session.email });
      setNotes([...notes, note.data]);
    } else {
      // handle not logged in new note creation
      console.log('Not logged in.');
    }
  };

  const deleteNote = async (e: React.MouseEvent, noteId: string) => {
    if (getSelectedNoteId() === noteId) push('/');
    e.preventDefault();
    setNotes(notes.filter((note) => note._id !== noteId));
    await axios.delete(`/api/notes/${noteId}`);
  };

  const handleLogout = async () => {
    await logout();
    setSession(null);
    setNotes([]);
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
        session && session.isLoggedIn ? (
          <div className='flex items-center justify-between w-full h-12 px-2 bg-neutral btn-neutral rounded-md mt-auto mb-4'>
            <div className='flex items-center w-5/6'>
              {/* <img className='w-6 h-6 mr-2 rounded-full' src={session.data.user.image} alt='User profile image' /> */}
              <span className='font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>{session.email}</span>
            </div>
            <form action={handleLogout}>
              <button className='flex items-center justify-center p-1 rounded hover:bg-code hover:cursor-pointer'><ArrowRightStartOnRectangleIcon className='w-4 h-4 text-red-500' /></button>
            </form>
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
        )
      )}
    </ul>
  );
};

export default Sidebar;