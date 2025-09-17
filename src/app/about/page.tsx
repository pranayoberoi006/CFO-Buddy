import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutUs } from '@/components/sections/about-us';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
