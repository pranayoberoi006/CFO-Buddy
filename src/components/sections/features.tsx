import { BarChart3, BotMessageSquare, ShieldCheck, TrendingUp, BellRing, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Automated Financial Analysis',
    description: 'Ingest reports to extract key metrics and perform financial analysis automatically.',
  },
  {
    icon: <BellRing className="h-8 w-8 text-primary" />,
    title: 'Risk Alerts & Anomaly Detection',
    description: 'Detect financial risks and anomalies, providing timely alerts for proactive decision-making.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Forecasting & Trend Analysis',
    description: 'Forecast long-term financial sustainability and identify predictive trends using AI models.',
  },
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Financial Q&A',
    description: 'Get clear, simple explanations of financial results and predictions from our AI assistant.',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Interactive Dashboards',
    description: 'Visualize financial data and insights through interactive charts for clear understanding.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Actionable Recommendations',
    description: 'Receive data-driven recommendations to optimize financial performance and strategy.',
  },
];

export function Features() {
  return (
    <section id="features" className="bg-muted/30 py-20 sm:py-28">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Everything You Need for Financial Clarity
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Our platform provides a comprehensive suite of tools to empower your financial decisions.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group bg-card/50 hover:bg-card border shadow-sm">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
