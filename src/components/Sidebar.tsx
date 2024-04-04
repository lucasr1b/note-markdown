import { TrashIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SidebarProps {
  newNoteTitle: string;
  notes: string[];
  setNotes: any;
}

const Sidebar = (props: SidebarProps) => {

  const [selectedNoteId, setSelectedNoteId] = useState<any>(null);

  const newNote = async () => {
    const note = await axios.post('/api/notes', { userId: '1' });
    props.setNotes([...props.notes, note.data]);
  }

  const deleteNote = async (noteId: string) => {
    props.setNotes(props.notes.filter((note: any) => note._id !== noteId));
    await axios.delete(`/api/notes/${noteId}`);
  }

  useEffect(() => {
    setSelectedNoteId(window.location.pathname.split('/').pop());
  }, []);

  return (
    <ul className='menu fixed w-56 h-full bg-base-200 border-r-2 border-base-100 gap-1'>
      <div className='p-2 flex items-center gap-2'>
        <div className='bg-base-300 rounded-lg py-1 px-2 w-fit'>NM</div>
        <h1 className='font-bold'>NoteMarkdown</h1>
      </div>
      <li className='btn btn-sm h-10 btn-primary mt-2 mb-8' onClick={newNote}>
        Create new note
      </li>
      {/* <li>
        <Link className={`flex justify-between items-center h-10 group ${selectedNoteId === null ? 'active' : ''}`} onClick={() => setSelectedNoteId(null)} href={'/notes'}>
          {props.newNoteTitle}
          <div className='hidden group-hover:block p-1 rounded hover:bg-code'>
            <TrashIcon className='w-4 h-4 text-white opacity-75' />
          </div>
        </Link>
      </li> */}
      {props.notes.map((note: any) => (
        <li key={note._id}>
          <Link className={`flex justify-between items-center h-10 group ${selectedNoteId === note._id ? 'active' : ''}`} href={`/notes/${note._id}`} onClick={() => setSelectedNoteId(note._id)}>
            {note.title}
            <div className='hidden group-hover:block p-1 rounded hover:bg-code' onClick={() => deleteNote(note._id)}>
              <TrashIcon className='w-4 h-4 text-white opacity-75' />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;