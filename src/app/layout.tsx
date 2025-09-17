import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { TransitionProvider } from '@/components/layout/transition-provider';
import { FloatingChatbot } from '@/components/floating-chatbot';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'CFO Buddy - AI-Powered CFO Assistant',
  description: 'AI for Smarter Financial Decisions. Ingest reports, detect risks, and forecast long-term sustainability.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="relative z-10">
            <TransitionProvider>{children}</TransitionProvider>
          </div>
          <Toaster />
          <FloatingChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
