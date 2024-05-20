import { signIn } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <div className='relative h-screen'>
      <Link className='absolute top-0 left-0 p-4' href={'/'}>
        <h1 className='text-2xl font-bold'>NoteMarkdown</h1>
      </Link>
      <div className='bg-base-300 flex flex-col items-center justify-center h-full'>
        <h1 className='text-4xl font-bold mb-2'>Edit and view markdown</h1>
        <p className='text-content-accent mb-6'>Sign up now for free!</p>
        <form className='flex w-full justify-center'
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: '/user' })
          }}
        >
          <button type='submit' className='btn btn-sm h-12 btn-neutral shadow-md mt-2 mb-8 no-animation w-1/3'>
            <Image src={'/image.png'} width={20} height={20} alt={'Google'} /> SIGN UP WITH GOOGLE
          </button>
        </form>
        <form className='flex flex-col w-1/3 gap-2'>
          <label className='text-sm'>Email</label>
          <input name='email' type='email' placeholder='tony@stark.com' autoComplete='username' autoCapitalize='none' required className='bg-neutral h-12 w-full rounded-md px-4 focus:outline-code mb-4' />
          <label className='text-sm'>Password</label>
          <input name='password' type='password' autoComplete='new-password' required className='bg-neutral h-12 w-full rounded-md px-4 focus:outline-code' />

          <button className='btn btn-sm h-12 btn-primary shadow-md mt-2 no-animation w-full'>SIGN UP</button>
        </form>
        <Link href={'/login'} className='text-secondary underline mt-4'>
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
