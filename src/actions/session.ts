"use server"
import Note from '@/backend/models/Note';
import User from '@/backend/models/User';
import { connectToDB } from '@/backend/utils/connectToDB';
import { sessionOptions } from '@/lib/session';
import { SessionData } from '@/utils/types';
import welcomeNote from '@/utils/welcomeNote';
import { getIronSession } from 'iron-session';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
import { z } from 'zod';

connectToDB();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return JSON.parse(JSON.stringify(session));
}

export const getSessionWithMethods = async () => { // get .destroy(), .save(), .config() methods
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};

export const signup = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSessionWithMethods();

  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;
  const formConfirmPassword = formData.get('cpassword') as string;

  if (await User.findOne({ email: formEmail })) return { error: 'An account with that email already exists' };

  if (formPassword !== formConfirmPassword) return { error: 'Passwords do not match' };

  try {
    registerSchema.parse({ email: formEmail, password: formPassword });
  } catch (err: any) {
    return { error: err.errors[0].message };
  }

  const user = await User.create({ email: formEmail, password: formPassword });

  session._id = user._id;
  session.email = user.email;
  session.isLoggedIn = true;
  await session.save();

  await Note.create({ ...welcomeNote, _id: new ObjectId().toString(), userId: user.email })

  return {
    _id: user._id,
    email: user.email,
    isLoggedIn: true,
    notes: [welcomeNote],
  };
}

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSessionWithMethods();

  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;

  const user = await User.findOne({ email: formEmail });

  if (!user || !(await user.comparePassword(formPassword))) {
    return { error: 'Email or password is incorrect' };
  }

  session._id = user._id;
  session.email = user.email;
  session.isLoggedIn = true;
  await session.save();

  const notes = await Note.find({ userId: user.email }).select('_id title');

  return {
    _id: user._id,
    email: user.email,
    isLoggedIn: true,
    notes: notes || [],
  };
};

export const logout = async () => {
  const session = await getSessionWithMethods();

  session.isLoggedIn = false;

  session.destroy();
  redirect('/');
}
