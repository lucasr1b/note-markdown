'use client';
import { BookOpenIcon, PencilIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import NoteDisplay from './NoteDisplay';
import NoteEditor from './NoteEditor';
import { Note } from '@/utils/types';

type NoteProps = {
  id: string;
  newNoteTitle: string;
  setNewNoteTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  isLoading: boolean;
};

const NoteItem = (props: NoteProps) => {
  const [isEditingMode, setIsEditingMode] = useState(true);

  return (
    <div className='ml-56 flex-1 flex-col p-2'>
      <div className='flex justify-end w-full'>
        <label className='swap swap-rotate rounded p-2 hover:bg-neutral'>
          <input type='checkbox' onChange={() => setIsEditingMode(!isEditingMode)} />
          <div className='swap-on'><BookOpenIcon className='h-5 w-5' /></div>
          <div className='swap-off'><PencilIcon className='h-5 w-5' /></div>
        </label>
      </div>
      <div className='flex flex-col px-60 py-32'>
        {props.isLoading ? (
          <div>
            <div className='animate-pulse h-10 w-1/3 bg-neutral rounded'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            <div className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
          </div>
        ) : (
          isEditingMode ? (
            <NoteEditor
              id={props.id}
              title={props.newNoteTitle}
              setTitle={props.setNewNoteTitle}
              content={props.content}
              setContent={props.setContent}
              setNotes={props.setNotes}
            />
          ) : (
            <NoteDisplay
              title={props.newNoteTitle}
              content={props.content}
            />
          )
        )}
      </div>
    </div>
  );
};

export default NoteItem;