import Link from 'next/link';
import { ReactNode } from 'react';
import './globals.css';
import style from './layout.module.css';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>제작 @s</footer>
        </div>
        {modal}
        <div id='modal-root' />
      </body>
    </html>
  );
}
