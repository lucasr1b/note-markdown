import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  service: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  service: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;