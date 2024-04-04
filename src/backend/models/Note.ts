import mongoose, { ObjectId, Schema } from 'mongoose';

export interface INote extends mongoose.Document {
  userId: string;
  title: string;
  content: string;
}

const NoteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    default: 'Untitled',
  },

  content: {
    type: String,
    default: '',
  },
});

const Note = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);

export default Note;
