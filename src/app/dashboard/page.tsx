
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Dashboard } from '@/components/sections/dashboard';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
