import { Note } from '@/utils/types';
import { TrashIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

type SidebarItemProps = {
  note: Note;
  deleteNote: (e: React.MouseEvent, id: string) => void;
  getSelectedNoteId: () => string;
};

const SidebarItem = ({ note, deleteNote, getSelectedNoteId }: SidebarItemProps) => {
  const isActive = getSelectedNoteId() === note._id;

  return (

    note._id == '1' ? (
      <li key={note._id}>
        <div className='flex justify-between items-center h-10 active'>
          {note.title}
        </div>
      </li>
    ) : (
      <li key={note._id}>
        <Link className={`flex justify-between items-center h-10 group ${isActive ? 'active' : ''}`} href={`/notes/${note._id}`}>
          {note.title}
          <div className='hidden group-hover:block p-1 rounded hover:bg-code' onClick={(e) => deleteNote(e, note._id)}>
            <TrashIcon className='w-4 h-4 text-white opacity-75' />
          </div>
        </Link>
      </li>
    )
  );
};

export default SidebarItem;