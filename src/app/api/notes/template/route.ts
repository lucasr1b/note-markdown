import Note from '@/backend/models/Note';
import { connectToDB } from '@/backend/utils/connectToDB';
import welcomeNote from '@/utils/welcomeNote';
import { ObjectId } from 'mongodb';

connectToDB();

export async function POST(request: Request) {
  const data = await request.json();
  const userId = data.userId;
  const newNote = await Note.create({ ...welcomeNote, _id: new ObjectId().toString(), userId })
  return new Response(JSON.stringify(newNote));
};