'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { login } from '@/actions/session';
import { useSession } from '@/context/SessionContext';
import { useNotes } from '@/context/NotesContext';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const { setSession } = useSession();
  const { setNotes } = useNotes();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = await login({ error: undefined }, formData);

    if (!data.error) {
      setSession({ _id: data._id, email: data.email, isLoggedIn: true });
      setNotes(data.notes || []);
      toast.success('Welcome back!');
    } else {
      toast.error(data.error);
    }

    setLoading(false);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      {/* <form className='flex w-full justify-center' onSubmit={handleLogin}>
        <button
          type='submit'
          className='btn btn-sm h-12 btn-neutral shadow-md mt-2 mb-8 no-animation w-1/3'
        >
          <Image src={'/image.png'} width={20} height={20} alt={'Google'} /> LOG IN WITH GOOGLE
        </button>
      </form> */}
      <form className='flex flex-col w-3/4 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 gap-2' onSubmit={handleLogin}>
        <label className='text-sm'>Email</label>
        <input
          name='email'
          type='email'
          placeholder='tony@stark.com'
          autoComplete='username'
          autoCapitalize='none'
          required
          className='bg-neutral h-12 w-full rounded-md px-4 focus:outline-code mb-4'
        />
        <label className='text-sm'>Password</label>
        <input
          name='password'
          type='password'
          autoComplete='current-password'
          required
          className='bg-neutral h-12 w-full rounded-md px-4 focus:outline-code'
        />
        {loading ? (
          <button
            type='button'
            className='btn btn-sm h-12 bg-primary shadow-md mt-2 no-animation w-full cursor-default hover:bg-primary opacity-75'>
            <span className='loading loading-spinner loading-md'></span>
          </button>
        ) : (
          <button
            type='submit'
            className='btn btn-sm h-12 btn-primary shadow-md mt-2 no-animation w-full'>
            LOG IN
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;