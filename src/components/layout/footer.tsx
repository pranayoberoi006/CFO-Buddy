
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/dashboard', label: 'Upload Dataset' },
    { href: '/how-it-works', label: 'How It Works' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/security', label: 'Security' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
};

const socialLinks = [
  { href: 'https://github.com/pranayoberoi006', icon: <Github className="h-5 w-5" />, label: 'Github' },
  { href: 'mailto:oberoipranay0@gmail.com', icon: <Mail className="h-5 w-5" />, label: 'Gmail' },
  { href: 'https://www.linkedin.com/in/pranay-oberoi-058747312/', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
];


export function Footer() {
  return (
    <footer id="contact" className="border-t bg-muted/30 text-card-foreground">
      <div className="container py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 justify-items-center gap-8 text-center md:grid-cols-3 md:text-left">
              <div>
                <h3 className="font-semibold">Product</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {footerLinks.product.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {footerLinks.company.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Legal</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {footerLinks.legal.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        
        <div className="border-t pt-8 mt-12 flex flex-col items-center justify-center gap-4">
           <div className="flex space-x-4">
            {socialLinks.map(social => (
                <Link key={social.label} href={social.href} className="text-muted-foreground transition-colors hover:text-primary">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} CFO Buddy, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
