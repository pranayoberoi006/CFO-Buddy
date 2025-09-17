
import { Lock, UserCheck, FileCheck2, DatabaseZap, Shield, Activity } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const securityFeatures = [
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: 'Data Encryption',
    description: 'End-to-end AES-256 encryption for data at rest and in transit, with HTTPS/TLS for secure transfers.',
  },
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'Access Control',
    description: 'Role-based permissions and Multi-Factor Authentication (MFA) to ensure only authorized users access data.',
  },
  {
    icon: <FileCheck2 className="h-8 w-8 text-primary" />,
    title: 'Data Privacy & Compliance',
    description: 'Adherence to stringent privacy regulations, including GDPR, SOC 2, and ISO 27001 alignment.',
  },
  {
    icon: <DatabaseZap className="h-8 w-8 text-primary" />,
    title: 'Secure Data Storage',
    description: 'Encrypted cloud storage on leading providers with automatic backups and disaster recovery plans.',
  },
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: 'Audit Logs',
    description: 'Full traceability of data access and financial analysis activities for security and compliance.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Infrastructure Security',
    description: 'Regular vulnerability scanning, penetration testing, and proactive threat monitoring.',
  },
];

export function Security() {
  return (
    <section id="security" className="bg-background py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Your Data, Fully Protected
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We employ enterprise-grade security measures to ensure your financial data remains confidential and secure.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((feature) => (
             <Card key={feature.title} className="text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border bg-card/50 shadow-sm">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
