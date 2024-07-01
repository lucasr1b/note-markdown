import Note from '@/backend/models/Note';
import { connectToDB } from '@/backend/utils/connectToDB';
import { ObjectId } from 'mongodb';

connectToDB();

export async function GET(request: Request, { params }: { params: { noteId: string } }) {
  const noteId = params.noteId;

  if (!ObjectId.isValid(noteId)) {
    return new Response('Note not found', { status: 404 });
  }

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return new Response('Note not found', { status: 404 });
    }

    return new Response(JSON.stringify(note));
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
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
