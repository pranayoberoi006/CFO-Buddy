import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoginForm } from '@/components/sections/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
