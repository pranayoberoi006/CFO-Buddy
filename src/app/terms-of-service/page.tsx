import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <section className="container max-w-4xl mx-auto">
          <div className="space-y-8 text-sm text-muted-foreground">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
              Terms of Service
            </h1>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>By accessing or using the CFO Buddy website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>

              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>CFO Buddy provides an AI-powered financial analysis tool that ingests user-uploaded financial documents to generate summaries, forecasts, and risk assessments. The service is provided on an "as is" and "as available" basis.</p>

              <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
              <p>You are responsible for the accuracy and legality of the data you upload. You agree not to use our services for any unlawful purpose or to upload any data that infringes on the rights of others.</p>

              <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
              <p>You retain all ownership rights to the financial documents and data you upload. We claim no intellectual property rights over the material you provide to the service.</p>

              <h2 className="text-xl font-semibold text-foreground">5. Disclaimer of Warranties</h2>
              <p>Our service is provided without warranties of any kind. We do not warrant that the service will be uninterrupted, error-free, or that the results obtained will be accurate or reliable. Please see our full Disclaimer for more details.</p>

              <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p>In no event shall CFO Buddy be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.</p>

              <h2 className="text-xl font-semibold text-foreground">7. Termination</h2>
              <p>We reserve the right to suspend or terminate your account at any time, without notice, for conduct that violates these Terms or is otherwise harmful to other users of the service, us, or third parties.</p>

              <h2 className="text-xl font-semibold text-foreground">8. Governing Law</h2>
              <p>These Terms shall be governed by the laws of the jurisdiction in which our company is based, without regard to its conflict of law provisions.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
