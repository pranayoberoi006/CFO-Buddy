
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/security', label: 'Security' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
      (isScrolled || !isHomePage) 
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" 
        : "bg-transparent",
      isHomePage && !isScrolled && "text-white"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Logo className={cn(
              (isHomePage && !isScrolled) ? "text-white" : "text-foreground"
            )} />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  (isHomePage && !isScrolled) ? "text-neutral-200 hover:text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        <div className='hidden md:flex items-center justify-end gap-4'>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button variant="ghost" asChild className={cn(isHomePage && !isScrolled && "hover:bg-white/10")}>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                           <Avatar className="h-10 w-10">
                             <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                             <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                           </Avatar>
                         </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className={cn(isHomePage && !isScrolled && "hover:bg-white/10")}>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild variant={cn(isHomePage && !isScrolled && "outline")} className={cn(isHomePage && !isScrolled && "bg-transparent border-white text-white hover:bg-white hover:text-primary")}>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </>
            )}
        </div>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={cn(isHomePage && !isScrolled && "border-white text-white bg-transparent hover:bg-white/10 hover:text-white")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background text-foreground">
              <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center border-b pb-4">
                      <Link href="/" onClick={() => setIsMenuOpen(false)}>
                          <Logo />
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                      </Button>
                  </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t pt-6">
                  {!loading && (
                      <>
                        {user ? (
                          <>
                            <Button variant="ghost" size="lg" asChild>
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                            </Button>
                            <div className="flex items-center gap-4 px-4 py-2">
                              <Avatar>
                                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.displayName || 'User'}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="lg" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                              <LogOut className="mr-2 h-4 w-4" />
                              Log Out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="lg" asChild>
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                            </Button>
                            <Button asChild size="lg">
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                            </Button>
                          </>
                        )}
                      </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
