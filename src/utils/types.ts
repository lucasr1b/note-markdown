export type Note = {
  _id: string;
  title: string;
  content: string;
}

export const defaultSession = {
  isLoggedIn: false,
};

export interface SessionData {
  _id?: string;
  email?: string;
  isLoggedIn: boolean;
}
