'use client';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteWelcome from '@/components/NoteWelcome';
import { useSession } from '@/context/SessionContext';
import NoteStart from '@/components/NoteStart';

const NoteStartPage = () => {

  const { session } = useSession();

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar />
      {session && session.isLoggedIn ? <NoteStart /> : <NoteWelcome />}
    </main>
  );
};

export default NoteStartPage;