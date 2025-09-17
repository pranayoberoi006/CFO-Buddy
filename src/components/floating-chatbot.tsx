
"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { handleChatSubmit } from '@/app/actions';
import { Bot, User, CornerDownLeft, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { AnalyzeFinancialReportOutput } from '@/ai/flows/analyze-financial-report';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const exampleQuestions = [
    "What was the revenue growth rate?",
    "Summarize the balance sheet.",
    "Any liquidity risks?",
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [analysisData, setAnalysisData] = useState<AnalyzeFinancialReportOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const chatbotIcon = PlaceHolderImages.find(p => p.id === 'chatbot-icon');

  useEffect(() => {
      if (isOpen) {
          try {
            const storedResults = localStorage.getItem('analysisResults');
            if (storedResults) {
                setAnalysisData(JSON.parse(storedResults));
            } else {
                setAnalysisData(null);
            }
          } catch (error) {
            console.error("Failed to parse analysis results from localStorage", error);
            setAnalysisData(null);
          }
      }
  }, [isOpen]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>, question?: string) => {
    if(e) e.preventDefault();
    const query = question || input;
    if (!query.trim() || isPending) return;

    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setInput('');
    
    startTransition(async () => {
        const result = await handleChatSubmit(query, analysisData);
        if(result.error) {
            toast({
                title: "An error occurred",
                description: result.error,
                variant: "destructive",
            });
             setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that request." }]);
        } else {
            setMessages((prev) => [...prev, { role: 'assistant', content: result.answer || "I don't have an answer for that." }]);
        }
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollableNode) {
            scrollableNode.scrollTo({
                top: scrollableNode.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
  }, [messages]);

  const constraintsRef = useRef(null);

  const welcomeMessage = analysisData 
    ? "Ask me anything about your recently analyzed report."
    : "Welcome! Please upload and analyze a financial report on the dashboard to start a conversation.";


  return (
    <>
      <motion.div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[100]" />
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[40rem] z-50"
            >
                <div className="flex flex-col h-full bg-card border rounded-xl shadow-2xl">
                    <header className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border-2 border-primary">
                                <AvatarFallback className="bg-transparent text-primary"><Bot className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-sm">CFO Buddy</h3>
                                <p className="text-xs text-muted-foreground">Online</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </header>
                    <div className="flex-1 p-4 overflow-hidden">
                        <ScrollArea className="h-full w-full" ref={scrollAreaRef}>
                            <div className="space-y-6 pr-4">
                                {messages.length === 0 && (
                                    <div className="text-center text-muted-foreground p-8">
                                        <Bot className="h-10 w-10 mx-auto mb-4" />
                                        <p className="text-sm">{welcomeMessage}</p>
                                        {analysisData && (
                                            <div className="mt-4 flex flex-col gap-2 justify-center">
                                                {exampleQuestions.map(q => (
                                                    <Button key={q} variant="outline" size="sm" onClick={() => handleSubmit(undefined, q)}>{q}</Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {messages.map((msg, index) => (
                                <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                                    {msg.role === 'assistant' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                    )}
                                    <div className={cn("max-w-[85%] rounded-lg p-3 text-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    {msg.content}
                                    </div>
                                    {msg.role === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                    )}
                                </div>
                                ))}
                                {isPending && (
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm text-muted-foreground">Thinking...</span>
                                    </div>
                                </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    <footer className="p-4 border-t">
                        <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 resize-none"
                                rows={1}
                                onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                                }}
                                disabled={isPending || !analysisData}
                            />
                            <Button type="submit" size="icon" disabled={!input.trim() || isPending || !analysisData}>
                                <CornerDownLeft className="h-4 w-4" />
                            </Button>
                        </form>
                    </footer>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut' }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-8 h-16 w-16 bg-card border rounded-full shadow-2xl z-50 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 overflow-hidden cursor-grab active:cursor-grabbing"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence>
        {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
                 <X className="h-8 w-8 text-primary" />
            </motion.div>
        ) : (
            <motion.div key="open" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }}>
                {chatbotIcon && (
                  <Image 
                    src={chatbotIcon.imageUrl} 
                    alt={chatbotIcon.description} 
                    width={64} 
                    height={64}
                    data-ai-hint={chatbotIcon.imageHint}
                  />
                )}
            </motion.div>
        )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
