import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
