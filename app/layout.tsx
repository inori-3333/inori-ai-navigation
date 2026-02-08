import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { MobileMenuProvider } from '@/lib/contexts';

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
      <body className="min-h-screen flex flex-col bg-slate-50">
        <MobileMenuProvider>
          <Header />
          <div className="flex-1 pt-16">
            <Sidebar />
            <div className="lg:pl-64 xl:pl-72 flex flex-col min-h-[calc(100vh-4rem)]">
              <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </MobileMenuProvider>
      </body>
    </html>
  );
}
