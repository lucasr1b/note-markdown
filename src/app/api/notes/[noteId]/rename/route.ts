import connectToDB from '@/backend/db';
import Note from '@/backend/models/Note';

connectToDB();

export async function PUT(request: Request, { params }: { params: { noteId: string } }) {
  const data = await request.json();
  const title = data.title;
  await Note.updateOne({ _id: params.noteId }, { title });
  return new Response('Note updated!');
};
