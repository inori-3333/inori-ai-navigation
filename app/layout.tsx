import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'InoriのAI Navigation | Discover the Best AI Tools',
  description: 'A curated directory of 200+ AI tools for productivity, marketing, development, design, and more. Discover, search, and submit AI tools.',
  keywords: 'AI tools, artificial intelligence, productivity tools, marketing AI, developer tools, design AI, chatbot, content creation',
  authors: [{ name: 'Inori' }],
  openGraph: {
    title: 'InoriのAI Navigation | Discover the Best AI Tools',
    description: 'A curated directory of 200+ AI tools for productivity, marketing, development, design, and more.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Sidebar />
          <main className="flex-1 ml-0 lg:ml-64 xl:ml-72 pt-16">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
