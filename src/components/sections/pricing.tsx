import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Starter',
    price: '$99',
    frequency: '/month',
    description: 'For startups and small businesses getting started with financial analysis.',
    features: [
      'Automated Analysis (5 reports/mo)',
      'Basic Risk Detection',
      'Standard Dashboards',
      'Email Support',
    ],
    cta: 'Get Started',
    isMostPopular: false,
  },
  {
    name: 'Growth',
    price: '$299',
    frequency: '/month',
    description: 'For growing companies that need deeper insights and forecasting.',
    features: [
      'Automated Analysis (20 reports/mo)',
      'Advanced Risk Alerts',
      'Customizable Dashboards',
      'AI-Powered Q&A',
      'Forecasting & Trend Analysis',
      'Priority Support',
    ],
    cta: 'Choose Growth',
    isMostPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    description: 'For large organizations with complex financial needs and compliance requirements.',
    features: [
      'Unlimited Reports & Users',
      'Full API Access',
      'Dedicated Account Manager',
      'SOC 2 & ISO 27001 Compliance',
      'Custom Integrations',
      'On-premise Deployment Option',
    ],
    cta: 'Contact Sales',
    isMostPopular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Transparent Pricing for Every Team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that's right for your business. No hidden fees.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={cn('flex flex-col shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card/50 hover:bg-card', tier.isMostPopular && 'border-primary ring-2 ring-primary shadow-lg')}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.frequency && <span className="text-muted-foreground">{tier.frequency}</span>}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.isMostPopular ? 'default' : 'outline'}>
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
