'use client';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteStart from '@/components/NoteStart';

const NoteStartPage = () => {
  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar />
      <NoteStart />
    </main>
  );
};

export default NoteStartPage;