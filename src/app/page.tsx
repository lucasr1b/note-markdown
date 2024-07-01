'use client';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteWelcome from '@/components/NoteWelcome';
import { useSession } from '@/context/SessionContext';
import NoteStart from '@/components/NoteStart';
import { useEffect, useState } from 'react';
import MobileNav from '@/components/MobileNav';

const NoteStartPage = () => {

  const { session, sessionLoading } = useSession();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className='flex min-h-screen bg-base-300'>
      {isMobileView ? isMobileNavOpened && <Sidebar isMobileNavOpened={isMobileNavOpened} closeMobileNav={() => setIsMobileNavOpened(false)} /> : <Sidebar />}
      <div className='w-full'>
        {isMobileView ? !isMobileNavOpened && <MobileNav toggleNav={() => setIsMobileNavOpened(true)} /> : null}

        {sessionLoading ? null : (
          session && session.isLoggedIn ? <NoteStart /> : <NoteWelcome isMobileView={isMobileView} isMobileNavOpened={isMobileNavOpened} />
        )}
      </div>
    </main>
  );
};

export default NoteStartPage;