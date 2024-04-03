interface SidebarProps {
  newNoteTitle: string;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <ul className='menu fixed w-56 h-full bg-base-200 border-r-2 border-base-100 gap-1'>
      <div className='p-2 flex items-center gap-2'>
        <div className='bg-base-300 rounded-lg py-1 px-2 w-fit'>NM</div>
        <h1 className='font-bold'>NoteMarkdown</h1>
      </div>
      <li className='btn btn-sm h-10 btn-primary mt-2 mb-8'>
        Create new note
      </li>
      <li>
        <a className='active'>{props.newNoteTitle}</a>
      </li>
      <li>
        <a>Note 1</a>
      </li>
      <li>
        <a>Note 2</a>
      </li>
      <li>
        <a>Note 3</a>
      </li>
    </ul>
  );
};

export default Sidebar;