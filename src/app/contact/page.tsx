import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SignupForm } from '@/components/sections/signup-form';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <section id="contact-form" className="container">
           <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Have a question or want to learn more? Drop us a line.
            </p>
          </div>
          <SignupForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
