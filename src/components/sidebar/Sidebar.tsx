'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNotes } from '@/context/NotesContext';
import SidebarItem from './SidebarItem';
import { ArrowRightStartOnRectangleIcon, DocumentPlusIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { logout } from '@/actions/session';
import { useSession } from '@/context/SessionContext';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useMobileView } from '@/context/MobileViewContext';

const Sidebar = () => {
  const { session, setSession, sessionLoading } = useSession();
  const [logOutLoading, setLogOutLoading] = useState(false);

  const { push } = useRouter();
  const pathName = usePathname();

  const { notes, setNotes, notesLoading } = useNotes();

  const { isMobileNavOpened, closeMobileNav } = useMobileView();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const getSelectedNoteId = () => {
    const segments = pathName.split('/');
    return segments.length > 2 && segments[1] === 'notes' ? segments[2] : '';
  };

  const newNote = async () => {
    if (session && session.email) {
      const note = await axios.post('/api/notes', { userId: session.email });
      setNotes([...notes, note.data]);
    } else {
      dialogRef.current?.showModal();
    }
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const deleteNote = async (e: React.MouseEvent, noteId: string) => {
    if (getSelectedNoteId() === noteId) push('/');
    e.preventDefault();
    setNotes(notes.filter((note) => note._id !== noteId));
    await axios.delete(`/api/notes/${noteId}`);
  };

  const handleLogout = async () => {
    setLogOutLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await logout();
    } finally {
      setSession(null);
      setNotes([]);
      setLogOutLoading(false);
    }
  };

  return (
    <ul className='menu fixed w-full md:w-60 h-full bg-base-200 border-r-2 border-base-100 gap-1'>
      {isMobileNavOpened ? (
        <div className='flex items-center justify-between px-1'>
          <Link className='my-2 font-bold text-2xl' href={'/'}>
            NoteMarkdown
          </Link>
          <div onClick={closeMobileNav}><XMarkIcon className='w-8 h-8' /></div>
        </div>
      ) : (
        <Link className='my-2 font-bold text-2xl text-center' href={'/'}>
          NoteMarkdown
        </Link>
      )}
      <button className='btn btn-sm h-10 w-full btn-neutral shadow-md mt-2 mb-8 no-animation focus:outline-none' onClick={newNote}>
        <DocumentPlusIcon className='w-5 h-5' />
        Create new note
      </button>
      <dialog className='modal' ref={dialogRef}>
        <div className='modal-box p-12'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={closeModal}>✕</button>
          </form>
          <h3 className='font-bold text-2xl mb-4'>Edit and view markdown for free</h3>
          <div className='flex flex-col items-center gap-2 w-full'>
            {/* <button type='submit' className='btn btn-sm h-12 w-full btn-neutral shadow-md no-animation'>
              <Image src={'/image.png'} width={20} height={20} alt={'Google'} /> SIGN UP WITH GOOGLE
            </button> */}
            <Link className='btn btn-sm h-12 w-full btn-primary no-animation' href={'/signup'}>
              <EnvelopeIcon width={20} height={20} /> SIGN UP WITH EMAIL
            </Link>
            <span className='text-base mt-4'>Already have an account? <Link className='text-primary underline' href={'/login'}>Login</Link></span>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      {notesLoading ? (
        <div className='flex flex-col gap-2'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='w-full h-10 leading-relaxed animate-pulse bg-code rounded-md'></div>
          ))}
        </div>
      ) : (
        <div className='overflow-y-auto flex flex-col flex-1 gap-1'>
          {notes.map((note) => (
            <SidebarItem key={note._id} note={note} deleteNote={deleteNote} getSelectedNoteId={getSelectedNoteId} />
          ))}
        </div>
      )}
      {!sessionLoading && (
        session && session.isLoggedIn ? (
          <div className='flex items-center justify-between w-full h-12 px-2 bg-neutral btn-neutral rounded-md mt-auto mb-4'>
            <div className='flex items-center w-5/6'>
              {/* <img className='w-6 h-6 mr-2 rounded-full' src={session.data.user.image} alt='User profile image' /> */}
              <span className='font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>{session.email}</span>
            </div>
            {logOutLoading ? (
              <span className='loading loading-spinner loading-sm md:loading-xs mr-2'></span>
            ) : (
              <form action={handleLogout}>
                <button className='flex items-center justify-center p-1 rounded hover:bg-code hover:cursor-pointer'>
                  <ArrowRightStartOnRectangleIcon className='w-5 h-5 sm:w-4 md:h-4 text-red-500' />
                </button>
              </form>
            )}
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