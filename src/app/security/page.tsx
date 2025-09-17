import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Security } from '@/components/sections/security';

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Security />
      </main>
      <Footer />
    </div>
  );
}
