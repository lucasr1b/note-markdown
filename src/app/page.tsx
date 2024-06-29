'use client';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteWelcome from '@/components/NoteWelcome';
import { useSession } from '@/context/SessionContext';
import NoteStart from '@/components/NoteStart';

const NoteStartPage = () => {

  const { session, sessionLoading } = useSession();

  return (
    <main className='flex min-h-screen bg-base-300'>
      <Sidebar />

      {sessionLoading ? null : (
        session && session.isLoggedIn ? <NoteStart /> : <NoteWelcome />
      )}
    </main>
  );
};

export default NoteStartPage;