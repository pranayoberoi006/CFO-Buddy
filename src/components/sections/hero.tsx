
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const { user, loading } = useAuth();

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          quality={100}
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container flex flex-col items-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
        >
          AI for Smarter Financial Decisions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-xl mx-auto text-lg text-neutral-200 md:text-xl"
        >
          Reduce reporting time, improve forecasting accuracy, and support strategic decisions with our AI-powered CFO assistant.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          {loading ? (
             <Skeleton className="h-11 w-36" />
          ) : user ? (
            <Button size="lg" asChild className="transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
              <Link href="/dashboard">Upload Report</Link>
            </Button>
          ) : (
            <Button size="lg" asChild className="transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50">
              <Link href="/dashboard">Try a Demo</Link>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
