'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNotes } from '@/context/NotesContext';
import SidebarItem from './SidebarItem';

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
    if (getSelectedNoteId() === noteId) push('/notes');
    e.preventDefault();
    setNotes(notes.filter((note) => note._id !== noteId));
    await axios.delete(`/api/notes/${noteId}`);
  };

  return (
    <ul className='menu fixed w-56 h-full bg-base-200 border-r-2 border-base-100 gap-1'>
      <Link className='p-2 flex items-center gap-2' href={'/notes'}>
        <div className='bg-base-300 rounded-lg py-1 px-2 w-fit'>NM</div>
        <h1 className='font-bold'>NoteMarkdown</h1>
      </Link>
      <li className='btn btn-sm h-10 btn-primary mt-2 mb-8 no-animation' onClick={newNote}>
        Create new note
      </li>
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
    </ul>
  );
};

export default Sidebar;