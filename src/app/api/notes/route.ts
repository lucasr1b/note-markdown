import Note from '@/backend/models/Note';
import { connectToDB } from '@/backend/utils/connectToDB';

connectToDB();

export async function POST(request: Request) {
  const data = await request.json();
  const userId = data.userId;
  const newNote = await Note.create({ userId });
  return new Response(JSON.stringify(newNote));
};

export async function GET() {
  const notes = await Note.find().select('_id title');
  return new Response(JSON.stringify(notes));
};
