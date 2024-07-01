import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { NotesProvider } from '@/context/NotesContext';
import { SessionProvider } from '@/context/SessionContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Lexend({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'NoteMarkdown',
  description: 'NoteMarkdown',
  icons: [
    {
      rel: 'icon',
      url: '/icon.png',
    },
  ],
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
            <ToastContainer
              position='bottom-right'
              autoClose={2500}
              theme='dark'
            />
          </NotesProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
