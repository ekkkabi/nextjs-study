import Link from 'next/link';
import './globals.css';
import style from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={style.container}>
        <header className={style.header}>
          <Link href={'/'}>ONEBITE CINEMA</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
