'use client';
import { BookOpenIcon, PencilIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import NoteDisplay from './NoteDisplay';
import NoteEditor from './NoteEditor';
import { Note } from '@/utils/types';

type NoteProps = {
  id: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  isLoading: boolean;
};

const NoteItem = (props: NoteProps) => {
  const [isEditingMode, setIsEditingMode] = useState(true);

  useEffect(() => {
    if (props.id == '1') {
      setIsEditingMode(false);
    }
  }, [props.id]);

  return (
    <div className='md:ml-56 flex-1 flex flex-col p-2'>
      <div className='sticky top-0 bg-base-300 flex justify-end w-full px-4 py-2 z-10'>
        {props.id == '1' ? (
          <div className='relative flex items-center'>
            <label className='swap swap-rotate rounded p-2 hover:bg-neutral'>
              <input type='checkbox' onChange={() => setIsEditingMode(!isEditingMode)} />
              <div className='swap-on'><BookOpenIcon className='h-5 w-5' /></div>
              <div className='swap-off'><PencilIcon className='h-5 w-5' /></div>
            </label>
            <div className='absolute -left-4 tooltip tooltip-open tooltip-left'
              data-tip={isEditingMode ? 'Click the book to switch to Displaying!' : 'Click the pencil to switch to Editing!'}
            ></div>
          </div>
        ) : (
          <label className='swap swap-rotate rounded p-2 hover:bg-neutral'>
            <input type='checkbox' onChange={() => setIsEditingMode(!isEditingMode)} />
            <div className='swap-on'><PencilIcon className='h-5 w-5' /></div>
            <div className='swap-off'><BookOpenIcon className='h-5 w-5' /></div>
          </label>
        )}
      </div>
      <div className='flex flex-col px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-4 md:py-8 lg:py-16 xl:py-24 2xl:py-32'>
        {props.isLoading ? (
          <div>
            <div className='animate-pulse h-10 w-1/3 bg-neutral rounded'></div>
            {[...Array(9)].map((_, i) => (
              <div key={i} className='animate-pulse h-6 w-full bg-neutral rounded mt-4'></div>
            ))}
          </div>
        ) : (
          isEditingMode ? (
            <NoteEditor
              id={props.id}
              title={props.title}
              setTitle={props.setTitle}
              content={props.content}
              setContent={props.setContent}
              setNotes={props.setNotes}
            />
          ) : (
            <NoteDisplay
              title={props.title}
              content={props.content}
            />
          )
        )}
      </div>
    </div>
  );
};

export default NoteItem;