import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import 'highlight.js/styles/atom-one-dark.css';
import remarkBreaks from 'remark-breaks';

type NoteDisplayProps = {
  title: string;
  content: string;
};

const NoteDisplay = (props: NoteDisplayProps) => {

  document.querySelector('#content');

  return (
    <>
      <p className='text-4xl font-bold mb-1 w-80 break-words md:w-full'>{props.title}</p>
      <div className='note-display bg-inherit'>
        <Markdown
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
          remarkPlugins={[remarkGfm, remarkToc, remarkBreaks]}>{props.content}
        </Markdown>
      </div>
    </>
  );
};

export default NoteDisplay;