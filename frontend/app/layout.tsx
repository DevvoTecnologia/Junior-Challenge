import '@picocss/pico';
import type { Metadata } from 'next';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './globals.css';
import Footer from './ui/layout/footer';
import Header from './ui/layout/header';

export const metadata: Metadata = {
  title: 'Os Anéis do Poder',
  description: 'Desafio para Devvo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container-fluid">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
