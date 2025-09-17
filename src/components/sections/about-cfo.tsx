import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CircleDollarSign, FileText, ShieldCheck, Bot, CheckCircle } from 'lucide-react';

const cfoRoles = [
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: 'Financial Planning & Analysis',
    description: 'Monitoring revenue, expenses, and profitability',
  },
  {
    icon: <CircleDollarSign className="h-6 w-6 text-primary" />,
    title: 'Cash Flow Management',
    description: 'Ensuring the company has enough liquidity to operate smoothly',
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: 'Reporting & Compliance',
    description: 'Preparing financial reports, balance sheets, and audits',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: 'Strategic Decision-Making',
    description: 'Guiding the company on growth, investments, and risks',
  },
];

const aiBenefits = [
    "Automated financial report analysis",
    "Early risk detection (burn rate, debt, liquidity)",
    "Accurate forecasting with AI models",
    "Clear, actionable recommendations in plain language"
];

export function AboutCfo() {
  return (
    <section id="about-cfo" className="py-20 sm:py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              What is a CFO?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A Chief Financial Officer (CFO) is the senior executive responsible for managing a company’s finances. The CFO oversees:
            </p>
            <ul className="mt-6 space-y-4">
              {cfoRoles.map((role) => (
                <li key={role.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    {role.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{role.title}</h4>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-muted/30 shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <Bot className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">The AI-Powered Advantage</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For startups and growing businesses, having a full-time CFO can be expensive. That’s where the AI-Powered CFO Assistant helps — it brings CFO-level insights through automation:
              </p>
              <ul className="space-y-3">
                  {aiBenefits.map(benefit => (
                      <li key={benefit} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mr-2 mt-0.5" />
                          <span>{benefit}</span>
                      </li>
                  ))}
              </ul>
              <div className="border-t pt-4 mt-4">
                 <p className="text-sm font-medium">
                    👉 In short: Our AI CFO Assistant acts like a digital CFO — always analyzing, always watching your company’s financial health, and helping you make smarter decisions.
                 </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
