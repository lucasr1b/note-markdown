'use client';
import { useMobileView } from '@/context/MobileViewContext';
import { useSession } from '@/context/SessionContext';
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';

const MobileNav = () => {
  const { session, sessionLoading } = useSession();

  const { openMobileNav } = useMobileView();

  return (
    <div className='w-full sticky top-0 flex items-center bg-neutral py-2 px-4 z-50'>
      <Link className='flex items-center gap-2' href='/'>
        <img src='/icon.png' alt='logo' className='w-10 h-10' />
        <Link className='font-bold' href='/'>NoteMarkdown</Link>
      </Link>
      <div className='ml-auto'>
        {!sessionLoading && (
          session && session.isLoggedIn ? (
            <Bars3Icon className='h-6 w-6 cursor-pointer' onClick={openMobileNav} />
          ) : (
            <Link className='btn btn-sm h-10 px-4 btn-primary no-animation' href='/signup'>
              Sign up
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MobileNav;