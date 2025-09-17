import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <section className="container max-w-4xl mx-auto">
          <div className="space-y-8 text-sm text-muted-foreground">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
              Privacy Policy
            </h1>
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <div className="space-y-4">
              <p>CFO Buddy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

              <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>We may collect personal information such as your name, email address, and payment information when you register for an account. We also collect the financial documents and data you upload for analysis.</p>

              <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Provide, operate, and maintain our services.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Process your transactions.</li>
                <li>Communicate with you for customer service and support.</li>
                <li>Analyze the financial data you provide to generate insights, forecasts, and risk assessments.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground">3. Data Security</h2>
              <p>We use administrative, technical, and physical security measures to help protect your personal information and the financial data you upload. While we have taken reasonable steps to secure the information you provide to us, please be aware that no security measures are perfect or impenetrable.</p>

              <h2 className="text-xl font-semibold text-foreground">4. Data Confidentiality</h2>
              <p>The financial documents you upload are treated as strictly confidential. We do not share your raw financial data with third parties, except as required by law. The data is used solely for the purpose of providing you with the AI-powered analysis.</p>
              
              <h2 className="text-xl font-semibold text-foreground">5. Third-Party Services</h2>
              <p>We may use third-party AI models (such as Google's Gemini) to process and analyze the data you provide. These providers are bound by their own privacy policies and confidentiality obligations.</p>

              <h2 className="text-xl font-semibold text-foreground">6. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

              <h2 className="text-xl font-semibold text-foreground">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us through our contact page.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
