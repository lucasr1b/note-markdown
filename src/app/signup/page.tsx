'use client';
import Link from 'next/link';
import SignupForm from '@/components/form/SignupForm';
import { useSession } from '@/context/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignupPage = () => {
  const { session, sessionLoading } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session?.isLoggedIn) {
      push('/');
    }
  }, [session, push]);

  if (session?.isLoggedIn || sessionLoading) {
    return null;
  }

  return (
    <div className='relative h-screen'>
      <Link className='absolute top-0 left-0 p-4' href={'/'}>
        <h1 className='text-2xl font-bold'>NoteMarkdown</h1>
      </Link>
      <div className='bg-base-300 flex flex-col items-center justify-center h-full w-full'>
        <h1 className='text-4xl font-extrabold text-center mb-2'>Edit and view markdown</h1>
        <p className='text-content-accent mb-2 sm:mb-6'>Sign up now for free!</p>
        <SignupForm />
        <Link href={'/login'} className='text-secondary underline mt-4'>
          Log in instead?
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
