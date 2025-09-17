import { UploadCloud, Bot, BarChartHorizontal, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: <UploadCloud className="h-10 w-10 text-accent" />,
    title: 'Upload Financial Reports',
    description: 'Securely upload your PDFs, Excel files, and other financial documents to our platform.',
  },
  {
    step: 2,
    icon: <Bot className="h-10 w-10 text-accent" />,
    title: 'AI Analysis',
    description: 'Our AI ingests and cleans the data, extracting key metrics and performing in-depth analysis.',
  },
  {
    step: 3,
    icon: <BarChartHorizontal className="h-10 w-10 text-accent" />,
    title: 'Get Insights & Risks',
    description: 'Receive clear dashboards, visualizations, risk alerts, and forecasts in minutes.',
  },
  {
    step: 4,
    icon: <CheckCircle className="h-10 w-10 text-accent" />,
    title: 'Actionable Recommendations',
    description: 'Leverage AI-driven recommendations to make smarter, data-backed financial decisions.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 overflow-x-hidden">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Get Started in 4 Simple Steps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Transform your financial data into actionable insights with our streamlined process.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center text-center relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
               {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-border" style={{ transform: 'translateX(50%)' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
