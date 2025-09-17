import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HowItWorks } from '@/components/sections/how-it-works';

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
