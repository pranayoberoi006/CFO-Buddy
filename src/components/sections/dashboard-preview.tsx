"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowDown, ArrowUp } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 18600 },
  { month: 'Feb', revenue: 30500 },
  { month: 'Mar', revenue: 23700 },
  { month: 'Apr', revenue: 27800 },
  { month: 'May', revenue: 29900 },
  { month: 'Jun', revenue: 34900 },
];

const revenueChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const cashflowData = [
  { month: 'Jan', cashflow: 8600 },
  { month: 'Feb', cashflow: 9500 },
  { month: 'Mar', cashflow: 10200 },
  { month: 'Apr', cashflow: 11800 },
  { month: 'May', cashflow: 9900 },
  { month: 'Jun', cashflow: 12900 },
];

const cashflowChartConfig = {
  cashflow: {
    label: 'Cash Flow',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function DashboardPreview() {
  return (
    <section className="bg-muted/40 py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Charts & Insights at a Glance
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Visualize your financial health with our real-time, interactive dashboard.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>Quarterly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig} className="h-64 w-full">
                <ResponsiveContainer>
                  <BarChart data={revenueData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="col-span-1 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
                <span className="text-sm text-muted-foreground">Monthly</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$15,231.89</div>
                <p className="text-xs text-muted-foreground flex items-center text-primary">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Runway</CardTitle>
                <span className="text-sm text-muted-foreground">Remaining</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18 Months</div>
                 <p className="text-xs text-muted-foreground flex items-center text-destructive">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  -2 months from last projection
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-1 lg:col-span-3 shadow-sm">
            <CardHeader>
              <CardTitle>Cash Flow Trend</CardTitle>
            </CardHeader>
            <CardContent>
               <ChartContainer config={cashflowChartConfig} className="h-64 w-full">
                <ResponsiveContainer>
                   <LineChart data={cashflowData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cashflow" stroke="var(--color-cashflow)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
