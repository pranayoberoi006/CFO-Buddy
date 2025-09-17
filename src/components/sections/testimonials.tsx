"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CFO, Tech Innovators Inc.',
    image: 'https://picsum.photos/seed/sarah/100/100',
    quote: "CFO Buddy has revolutionized our financial reporting. What used to take days now takes minutes, and the insights are incredibly accurate. It's an essential tool for any modern finance team."
  },
  {
    name: 'Michael Chen',
    title: 'CEO, Growth Startups LLC',
    image: 'https://picsum.photos/seed/michael/100/100',
    quote: "As a startup CEO, I need to have a firm grasp on our financials. CFO Buddy gives me the clarity and foresight I need to make strategic decisions with confidence. The forecasting feature is a game-changer."
  },
  {
    name: 'Emily Rodriguez',
    title: 'Venture Capitalist, Future Ventures',
    image: 'https://picsum.photos/seed/emily/100/100',
    quote: "We recommend CFO Buddy to our portfolio companies. It standardizes their financial analysis and helps them identify risks early. It's an invaluable asset for ensuring long-term sustainability."
  },
    {
    name: 'David Lee',
    title: 'Finance Director, Global Solutions',
    image: 'https://picsum.photos/seed/david/100/100',
    quote: "The ability to ask complex financial questions and get simple, clear answers from the AI chatbot has been phenomenal. It saves our team hours of research and empowers them to be more strategic."
  }
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Trusted by Financial Leaders
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear what our users have to say about their experience with CFO Buddy.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-4">
                  <Card>
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <p className="text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
