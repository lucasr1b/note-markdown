import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NoteDisplayProps {
  title: string;
  content: string;
};

const NoteDisplay = (props: NoteDisplayProps) => {
  return (
    <>
      <p className='text-4xl font-bold mb-1'>{props.title}</p>
      <div className='note-display bg-inherit'><Markdown remarkPlugins={[remarkGfm]}>{props.content}</Markdown></div>
    </>
  );
};

export default NoteDisplay;