import connectToDB from '@/backend/db';
import Note from '@/backend/models/Note';

connectToDB();

export async function POST(request: Request) {
  const data = await request.json();
  const userId = data.userId;
  const newNote = await Note.create({ userId });
  return new Response(JSON.stringify(newNote));
};

export async function GET() {
  const notes = await Note.find();
  return new Response(JSON.stringify(notes));
};
