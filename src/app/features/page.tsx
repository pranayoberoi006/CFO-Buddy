import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Features } from '@/components/sections/features';

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Features />
      </main>
      <Footer />
    </div>
  );
}
