import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface INote extends Document {
  userId: string;
  title: string;
  content: string;
}

const NoteSchema: Schema = new Schema({
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

const Note: mongoose.Model<INote> = models.Note || model<INote>('Note', NoteSchema);

export default Note;
