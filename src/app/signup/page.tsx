import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SignupForm } from '@/components/sections/signup-form';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}
