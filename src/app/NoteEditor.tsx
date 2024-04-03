'use client';
import { BookOpenIcon, PencilIcon } from '@heroicons/react/16/solid';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownSample from './markdownSample';

interface NoteEditorProps {
  setNewNoteTitle: React.Dispatch<React.SetStateAction<string>>;
}

const NoteEditor = (props: NoteEditorProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState(MarkdownSample);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const [isEditingMode, setIsEditingMode] = useState(true);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.selectionStart = titleRef.current.selectionEnd = titleRef.current.value.length;
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') return props.setNewNoteTitle('Untitled');
    props.setNewNoteTitle(e.target.value || '');
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value || '');
  }

  const handleContentFocus = () => {
    setIsPlaceholderVisible(false);
  }

  const adjustTextareaHeight = () => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto'; // Reset height
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  useEffect(() => {
    if (content != '') setIsPlaceholderVisible(false);
    contentRef.current!.value = content;
    adjustTextareaHeight();
  }, [content, contentRef]);

  useEffect(() => {
    adjustTextareaHeight();
    console.log(content);
  }, [content, isEditingMode]);

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
        {isEditingMode ? (
          <>
            <input
              ref={titleRef}
              defaultValue={'Untitled'}
              type='text'
              className='bg-inherit text-4xl font-bold mb-1 outline-none'
              onChange={handleTitleChange}
            />
            <textarea
              ref={contentRef}
              className={`bg-inherit resize-none outline-none mt-4 ${isPlaceholderVisible ? 'text-accent' : ''}`}
              onFocus={handleContentFocus}
              onBlur={() => setIsPlaceholderVisible(content === '')}
              value={isPlaceholderVisible ? 'Start typing...' : content}
              onChange={handleContentChange}
            />
          </>
        ) : (
          <>
            <p className='text-4xl font-bold mb-1'>Untitled</p>
            <div className='note-display bg-inherit'><Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown></div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;