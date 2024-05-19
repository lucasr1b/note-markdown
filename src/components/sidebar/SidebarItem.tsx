import { TrashIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

type SidebarItemProps = {
  note: any;
  deleteNote: any;
  getSelectedNoteId: any;
};

const SidebarItem = ({ note, deleteNote, getSelectedNoteId }: SidebarItemProps) => {
  return (
    <li key={note._id}>
      <Link className={`flex justify-between items-center h-10 group ${getSelectedNoteId() === note._id ? 'active' : ''}`} href={`/notes/${note._id}`}>
        {note.title}
        <div className='hidden group-hover:block p-1 rounded hover:bg-code' onClick={(e) => deleteNote(e, note._id)}>
          <TrashIcon className='w-4 h-4 text-white opacity-75' />
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;