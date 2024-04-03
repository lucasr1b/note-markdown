import { useEffect, useRef, useState } from 'react';

interface NoteEditorProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const NoteEditor = (props: NoteEditorProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.selectionStart = titleRef.current.selectionEnd = titleRef.current.value.length;
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') return props.setTitle('Untitled');
    props.setTitle(e.target.value || '');
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setContent(e.target.value || '');
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
    if (props.content != '') setIsPlaceholderVisible(false);
    contentRef.current!.value = props.content;
    adjustTextareaHeight();
  }, [props.content, contentRef]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [props.content]);

  return (
    <>
      <input
        ref={titleRef}
        placeholder={'Untitled'}
        defaultValue={props.title == 'Untitled' ? '' : props.title} // Make default value '' and dipsplay untilted on sidebar?
        type='text'
        className='bg-inherit text-4xl font-bold mb-1 outline-none placeholder:text-accent'
        onChange={handleTitleChange}
      />
      <textarea
        ref={contentRef}
        className={`bg-inherit resize-none outline-none mt-4 ${isPlaceholderVisible ? 'text-accent' : ''}`}
        onFocus={handleContentFocus}
        onBlur={() => setIsPlaceholderVisible(props.content === '')}
        value={isPlaceholderVisible ? 'Start typing...' : props.content}
        onChange={handleContentChange}
      />
    </>
  );
};

export default NoteEditor;