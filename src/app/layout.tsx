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
  description: 'Your ultimate, yet simple markdown editor packed with all the essential features you\'ll ever need. Create, edit and view markdown notes all in one place.',
  icons: [
    {
      rel: 'icon',
      url: '/icon.png',
    },
  ],
  openGraph: {
    title: 'NoteMarkdown',
    description: 'Your ultimate, yet simple markdown editor packed with all the essential features you\'ll ever need. Create, edit and view markdown notes all in one place.',
    images: [
      {
        url: '/icon.png',
        width: 256,
        height: 256,
        alt: 'NoteMarkdown',
      },
    ],
  },

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
