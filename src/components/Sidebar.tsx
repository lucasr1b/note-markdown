import { TrashIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface SidebarProps {
  newNoteTitle: string;
}

const Sidebar = (props: SidebarProps) => {

  const [notes, setNotes] = useState<any>([]);


  const fetchNotes = async () => {
    const fetchedNotes = await axios.get('/api/notes');
    setNotes(fetchedNotes.data);
  }

  const newNote = async () => {
    const note = await axios.post('/api/notes', { userId: '1' });
    setNotes([...notes, note.data]);
  }

  const deleteNote = async (noteId: string) => {
    setNotes(notes.filter((note: any) => note._id !== noteId));
    await axios.delete(`/api/notes/${noteId}`);
  }

  useEffect(() => {
    fetchNotes();
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
      <li>
        <a className='active flex justify-between items-center h-10 group hover:cursor-pointer'>
          {props.newNoteTitle}
          <div className='hidden group-hover:block p-1 rounded hover:bg-code'>
            <TrashIcon className='w-4 h-4 text-white opacity-75' />
          </div>
        </a>
      </li>
      {notes.map((note: any) => (
        <li key={note._id}>
          <a className='flex justify-between items-center h-10 group'>
            {note.title}
            <div className='hidden group-hover:block p-1 rounded hover:bg-code' onClick={() => deleteNote(note._id)}>
              <TrashIcon className='w-4 h-4 text-white opacity-75' />
            </div></a>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;