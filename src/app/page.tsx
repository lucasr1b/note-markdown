'use client';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteWelcome from '@/components/NoteWelcome';
import { useSession } from '@/context/SessionContext';
import NoteStart from '@/components/NoteStart';
import MobileNav from '@/components/MobileNav';
import { useMobileView } from '@/context/MobileViewContext';

const NoteMarkdown = () => {
  const { session, sessionLoading } = useSession();

  const { isMobileView, isMobileNavOpened } = useMobileView();

  return (
    <main className='flex min-h-screen bg-base-300'>
      {isMobileView ? (isMobileNavOpened && <Sidebar />) : <Sidebar />}
      <div className='w-full'>
        {isMobileView ? !isMobileNavOpened && <MobileNav /> : null}

        {sessionLoading ? null : (
          session && session.isLoggedIn ? <NoteStart /> : <NoteWelcome />
        )}
      </div>
    </main>
  );
};

export default NoteMarkdown;