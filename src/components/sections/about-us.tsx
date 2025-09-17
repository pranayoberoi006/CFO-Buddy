
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    id: 'team-member-1',
    name: 'Pranay Oberoi',
    role: 'Technical Engineer',
    skills: "I'm a technical engineer with a strong foundation in problem-solving, system architecture, and cross-functional collaboration. I specialize in bridging the gap between complex technical challenges and practical, scalable solutions. With hands-on experience in both software and hardware environments, I design, implement, and maintain systems that are efficient, reliable, and aligned with business goals. Whether it's optimizing infrastructure, automating workflows, or supporting product development, I bring a solutions-oriented mindset and a commitment to technical excellence.",
  },
  {
    id: 'team-member-2',
    name: 'Raghav Sharma',
    role: 'Front-end Developer',
    skills: "I'm a frontend developer dedicated to crafting intuitive, responsive, and visually engaging user experiences. I specialize in modern web technologies like HTML, CSS, JavaScript, and frameworks such as React, Vue, or Angular. My focus is on building clean, accessible interfaces that perform seamlessly across devices. From turning design mockups into functional components to optimizing site speed and interactivity, I bring both creativity and precision to every project. I thrive on transforming ideas into interactive, user-friendly applications that leave a lasting impression.he architect of our platform, specializing in full-stack development and cloud infrastructure.",
  },
  {
    id: 'team-member-3',
    name: 'Parth Doomra',
    role: 'Back-end Developer',
    skills: "I'm a backend developer with a strong focus on building scalable, secure, and efficient server-side applications. With expertise in technologies like [insert your stack—e.g., Node.js, Python, Django, Ruby on Rails, etc.], I design robust APIs, manage databases, and ensure seamless integration between front-end interfaces and back-end systems. I’m passionate about clean code, automation, and performance optimization. Whether it's designing microservices, managing cloud deployments, or streamlining data flows, I bring reliability and structure to complex systems.",
  },
  {
    id: 'team-member-4',
    name: 'Radhil Narula',
    role: 'AI Specialist',
    skills: "An AI specialist engineer designs, develops, and deploys intelligent systems. This involves everything from building machine learning models and creating neural networks to using large language models (LLMs) and computer vision to solve complex problems. They work with data, algorithms, and software to build applications that can learn and adapt.",
  },
];

export function AboutUs() {
  const memberImages = PlaceHolderImages.filter(p => p.id.startsWith('team-member'));
  return (
    <section id="about-us" className="py-20 sm:py-28">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Meet the Team Behind CFO Buddy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            We are a passionate group of developers, designers, and strategists dedicated to revolutionizing financial analysis.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => {
            const memberImage = memberImages.find(img => img.id === member.id);
            return (
              <Card key={member.id} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group bg-card/50 hover:bg-card">
                <CardHeader>
                  <div className="relative mx-auto h-32 w-32">
                    {memberImage && (
                       <Image
                        src={memberImage.imageUrl}
                        alt={`Photo of ${member.name}`}
                        width={128}
                        height={128}
                        className="rounded-full object-cover border-4 border-transparent group-hover:border-primary transition-colors"
                        data-ai-hint={memberImage.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.skills}</p>
                   <div className="pt-2 flex justify-center space-x-3">
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
