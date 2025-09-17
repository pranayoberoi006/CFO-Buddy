
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Loader2,
  ArrowUp,
  ArrowDown,
  LineChart as LineChartIcon,
} from 'lucide-react';
import type { AnalyzeFinancialReportOutput } from '@/ai/flows/analyze-financial-report';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

const pnlChartConfig = {
  revenue: { label: 'Revenue', color: 'hsl(var(--chart-2))' },
  profit: { label: 'Profit', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

const cashflowChartConfig = {
  cashFlow: { label: 'Cash Flow', color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

const stockPriceChartConfig = {
    stockPrice: { label: 'Stock Price', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(2)}`;
};


export default function ResultsPage() {
  const [results, setResults] = useState<AnalyzeFinancialReportOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResults = localStorage.getItem('analysisResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    setLoading(false);
  }, []);

  const handleGoBack = () => {
    localStorage.removeItem('analysisResults');
    router.push('/dashboard');
  };

  const renderChange = (change?: string) => {
    if (!change) return null;
    const isPositive = change.startsWith('+');
    return (
      <p className={`text-xs flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        {change}
      </p>
    );
  };


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <section className="container py-12 sm:py-16">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Your Financial Analysis is Ready
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                An interactive overview of your financial health, powered by AI.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !results ? (
              <Card className="max-w-2xl mx-auto text-center">
                <CardHeader>
                  <CardTitle>No Results Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    It looks like there's no analysis data. Please upload a report on the dashboard to begin.
                  </p>
                  <Button onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-12">
                <Card className="md:col-span-12">
                   <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                     <FileText className="w-6 h-6 text-primary" />
                     <div>
                        <CardTitle className="text-xl font-medium">
                          Executive Summary
                        </CardTitle>
                        <CardDescription>The key takeaways from your report at a glance.</CardDescription>
                     </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {results.summary.summary}
                    </p>
                  </CardContent>
                </Card>

                {results.keyMetrics?.map(metric => (
                   <Card key={metric.name} className="md:col-span-4">
                      <CardHeader className="pb-2">
                        <CardDescription>{metric.name}</CardDescription>
                        <CardTitle className="text-3xl">{metric.value}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderChange(metric.change)}
                      </CardContent>
                    </Card>
                ))}

                <Card className="md:col-span-8">
                    <CardHeader>
                        <CardTitle>Profit & Loss</CardTitle>
                        <CardDescription>A clear view of your revenue versus net profit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={pnlChartConfig} className="h-64 w-full">
                            <ResponsiveContainer>
                                <BarChart data={results.chartData.pnl}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis tickFormatter={formatCurrency} />
                                    <Tooltip content={<ChartTooltipContent formatter={formatCurrency} />} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                                    <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Cash Flow Trend</CardTitle>
                    <CardDescription>Tracking your cash flow over time.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={cashflowChartConfig} className="h-64 w-full">
                      <ResponsiveContainer>
                        <LineChart data={results.chartData.cashFlow}>
                           <CartesianGrid vertical={false} />
                           <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                           <YAxis tickFormatter={formatCurrency} />
                           <Tooltip content={<ChartTooltipContent formatter={formatCurrency} indicator="dot" />} />
                           <Line type="monotone" dataKey="cashFlow" stroke="var(--color-cashFlow)" strokeWidth={2} dot={true} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                {results.chartData.stockPrice && results.chartData.stockPrice.length > 0 && (
                  <Card className="md:col-span-12">
                    <CardHeader>
                      <CardTitle>Stock Price Growth</CardTitle>
                      <CardDescription>Historical stock price performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={stockPriceChartConfig} className="h-80 w-full">
                        <ResponsiveContainer>
                          <LineChart data={results.chartData.stockPrice}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickFormatter={formatCurrency} domain={['dataMin - 5', 'dataMax + 5']} />
                            <Tooltip content={<ChartTooltipContent formatter={formatCurrency} indicator="dot" />} />
                            <Line type="monotone" dataKey="stockPrice" name="Stock Price" stroke="var(--color-stockPrice)" strokeWidth={2} dot={true} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                )}

                 <Card className="md:col-span-6">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle className="text-xl font-medium">
                           Future Outlook & Forecasts
                        </CardTitle>
                        <CardDescription>AI-powered predictions to guide your strategy.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 text-sm">
                      {results.predictions.forecasts.map(
                        (forecast) => (
                          <li key={forecast.metric}>
                            <div className="flex justify-between font-medium">
                              <span className="capitalize text-muted-foreground">
                                {forecast.metric}
                              </span>
                              <span>{forecast.value}</span>
                            </div>
                            <p className="text-xs text-muted-foreground/80 mt-1">{forecast.commentary}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card className={cn(
                    "md:col-span-6 transition-all",
                    results.riskAssessment.risks.length > 0 && "ring-2 ring-destructive/50 border-destructive/80 shadow-lg shadow-destructive/10"
                )}>
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                     <div>
                        <CardTitle className="text-xl font-medium">
                          Risk Assessment
                        </CardTitle>
                        <CardDescription>Potential financial risks identified by the AI.</CardDescription>
                     </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                      {results.riskAssessment.risks.length > 0 ? (
                        results.riskAssessment.risks.map((risk, index) => (
                          <li key={index} className="text-muted-foreground">
                            {risk}
                          </li>
                        ))
                      ) : (
                        <li className="text-muted-foreground list-none">
                          No significant risks were identified from the report.
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

              </div>
            )}
             <div className="text-center mt-8">
                <Button variant="outline" onClick={handleGoBack}>Analyze Another Report</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
