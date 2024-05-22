'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { signup } from '@/actions/session';
import { useFormState } from 'react-dom';
import { useSession } from '@/context/SessionContext';
import { useNotes } from '@/context/NotesContext';

const SignupForm = () => {
  const { setSession } = useSession();
  const { setNotes } = useNotes();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = await signup({ error: undefined }, formData);
    if (!data.error) {
      setSession({ _id: data._id, email: data.email, isLoggedIn: true });
      setNotes(data.notes || []);
    } else {
      console.log(data.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <form
        className="flex w-full justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          // sign up with google logic
        }}
      >
        <button type="submit" className="btn btn-sm h-12 btn-neutral shadow-md mt-2 mb-8 no-animation w-1/3">
          <Image src={'/image.png'} width={20} height={20} alt={'Google'} /> SIGN UP WITH GOOGLE
        </button>
      </form>
      <form className="flex flex-col w-1/3 gap-2" onSubmit={handleSignup}>
        <label className="text-sm">Email</label>
        <input
          name="email"
          type="email"
          placeholder="tony@stark.com"
          autoComplete="username"
          autoCapitalize="none"
          required
          className="bg-neutral h-12 w-full rounded-md px-4 focus:outline-code mb-4"
        />
        <label className="text-sm">Password</label>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="bg-neutral h-12 w-full rounded-md px-4 focus:outline-code"
        />
        <button type="submit" className="btn btn-sm h-12 btn-primary shadow-md mt-2 no-animation w-full">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignupForm;
