'use client';
import { BookOpenIcon, PencilIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import MarkdownSample from '@/utils/markdownSample';
import NoteDisplay from './NoteDisplay';
import NoteEditor from './NoteEditor';

interface NoteEditorProps {
  id: string;
  newNoteTitle: string;
  setNewNoteTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setNotes: any;
};

const Note = (props: NoteEditorProps) => {
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
        {isEditingMode ?
          <NoteEditor id={props.id} title={props.newNoteTitle} setTitle={props.setNewNoteTitle} content={props.content} setContent={props.setContent} setNotes={props.setNotes} />
          :
          <NoteDisplay title={props.newNoteTitle} content={props.content} />
        }
      </div>
    </div>
  );
};

export default Note;