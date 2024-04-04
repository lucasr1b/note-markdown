import connectToDB from '@/backend/db';
import Note from '@/backend/models/Note';

connectToDB();

export async function GET(request: Request, { params }: { params: { noteId: string } }) {
  const noteId = params.noteId;
  const note = await Note.findById(noteId);
  return new Response(JSON.stringify(note));
};

export async function PUT(request: Request) {
  // update Note model with new content
  // const data = await request.json();
  // Note.updateOne({ _id: noteId }, { content: 'Hello, world!' });
  return new Response('Hello from the API!');
};

export async function DELETE(request: Request, { params }: { params: { noteId: string } }) {
  const noteId = params.noteId;
  await Note.deleteOne({ _id: noteId });
  return new Response('Note deleted!');
};
