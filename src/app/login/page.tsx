import { signIn } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className='relative h-screen'>
      <Link className='absolute top-0 left-0 p-4' href={'/'}>
        <h1 className='text-2xl font-bold'>NoteMarkdown</h1>
      </Link>
      <div className='bg-base-300 flex flex-col items-center justify-center h-full'>
        <h1 className='text-4xl font-bold mb-6'>Welcome back!</h1>
        <form className='flex w-full justify-center'
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: '/user' })
          }}
        >
          <button type='submit' className='btn btn-sm h-12 btn-neutral shadow-md mt-2 mb-8 no-animation w-1/3'>
            <Image src={'/image.png'} width={20} height={20} alt={'Google'} /> LOG IN WITH GOOGLE
          </button>
        </form>
        <form className='flex flex-col w-1/3 gap-2'>
          <label className='text-sm'>Email</label>
          <input name='email' type='email' placeholder='tony@stark.com' autoComplete='username' autoCapitalize='none' required className='bg-neutral h-12 w-full rounded-md px-4 focus:outline-code mb-4' />
          <label className='text-sm'>Password</label>
          <input name='password' type='password' autoComplete='current-password' required className='bg-neutral h-12 w-full rounded-md px-4 focus:outline-code' />
          <button className='btn btn-sm h-12 btn-primary shadow-md mt-2 no-animation w-full'>LOG IN</button>
        </form>
        <Link href={'/signup'} className='text-secondary underline mt-4'>
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
