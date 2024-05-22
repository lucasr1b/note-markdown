import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { NotesProvider } from '@/context/NotesContext';
import { SessionProvider } from '@/context/SessionContext';

const inter = Lexend({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'NoteMarkdown',
  description: 'NoteMarkdown',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          <NotesProvider>
            {children}
          </NotesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
