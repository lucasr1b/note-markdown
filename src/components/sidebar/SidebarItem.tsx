import { Note } from '@/utils/types';
import { TrashIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

type SidebarItemProps = {
  note: Note;
  deleteNote: (e: React.MouseEvent, id: string) => void;
  getSelectedNoteId: () => string;
  isMobileNavOpened?: boolean;
};

const SidebarItem = ({ note, deleteNote, getSelectedNoteId, isMobileNavOpened }: SidebarItemProps) => {
  const selectedNoteId = getSelectedNoteId();
  const isWelcomeNote = selectedNoteId === '' && note._id === '1';
  const isActive = selectedNoteId === note._id || isWelcomeNote;

  return (
    note._id === '1' ? (
      <li key={note._id}>
        <Link className={`flex justify-between items-center h-10 ${isActive ? 'active' : ''}`} href='/'>
          <span className='overflow-hidden text-ellipsis whitespace-nowrap w-36'>{note.title}</span>
        </Link>
      </li>
    ) : (
      <li key={note._id}>
        <Link className={`flex justify-between items-center h-10 w-full group ${isActive ? 'active' : ''}`} href={`/notes/${note._id}`}>
          <span className='overflow-hidden text-ellipsis whitespace-nowrap w-56 xs:w-72 sm:w-96 md:w-36'>{note.title}</span>
          {isMobileNavOpened ? (
            <div className='p-1 rounded hover:bg-code' onClick={(e) => deleteNote(e, note._id)}>
              <TrashIcon className='w-4 h-4 text-white opacity-75' />
            </div>
          ) : (
            <div className='hidden group-hover:block p-1 rounded hover:bg-code' onClick={(e) => deleteNote(e, note._id)}>
              <TrashIcon className='w-4 h-4 text-white opacity-75' />
            </div>
          )}
        </Link>
      </li>
    )
  );
};

export default SidebarItem;