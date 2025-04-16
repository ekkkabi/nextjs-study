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
          <header className={style.header}>
            <Link href={'/'}>ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
        </div>
        {modal}
        <div id='modal-root' />
      </body>
    </html>
  );
}
