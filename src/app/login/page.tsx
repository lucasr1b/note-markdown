'use client';
import { useEffect } from 'react';
import LoginForm from '@/components/form/LoginForm';
import { useSession } from '@/context/SessionContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
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
      <div className='bg-base-300 flex flex-col items-center justify-center h-full'>
        <h1 className='text-4xl font-bold mb-6'>Welcome back!</h1>
        <LoginForm />
        <Link href={'/signup'} className='text-secondary underline mt-4'>
          Sign up instead?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
