import Note from '@/backend/models/Note';
import { connectToDB } from '@/backend/utils/connectToDB';

connectToDB();

export async function GET(request: Request, { params }: { params: { noteId: string } }) {
  const noteId = params.noteId;
  const note = await Note.findById(noteId);
  return new Response(JSON.stringify(note));
};

export async function PUT(request: Request, { params }: { params: { noteId: string } }) {
  const noteId = params.noteId;
  const data = await request.json();
  const content = data.content;
  await Note.updateOne({ _id: noteId }, { content });
  return new Response('Note updated');
};

export async function DELETE(request: Request, { params }: { params: { noteId: string } }) {
  const noteId = params.noteId;
  await Note.deleteOne({ _id: noteId });
  return new Response('Note deleted!');
};
