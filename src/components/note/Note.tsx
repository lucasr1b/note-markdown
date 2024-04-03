'use client';
import { BookOpenIcon, PencilIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import MarkdownSample from '@/utils/markdownSample';
import NoteDisplay from './NoteDisplay';
import NoteEditor from './NoteEditor';

interface NoteEditorProps {
  newNoteTitle: string;
  setNewNoteTitle: React.Dispatch<React.SetStateAction<string>>;
};

const Note = (props: NoteEditorProps) => {
  const [content, setContent] = useState(MarkdownSample);
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
          <NoteEditor title={props.newNoteTitle} setTitle={props.setNewNoteTitle} content={content} setContent={setContent} />
          :
          <NoteDisplay title={props.newNoteTitle} content={content} />
        }
      </div>
    </div>
  );
};

export default Note;