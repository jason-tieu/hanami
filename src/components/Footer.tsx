import Link from 'next/link';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import UIButton from '@/components/UIButton';
// import { Container } from "@/components/section";

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/jasontieu',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/jasontieu',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:jason@example.com',
    icon: Mail,
  },
];

const footerLinks = [
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gradient">Jason Tieu</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Full-Stack Development • Cloud & DevOps • AI/ML
              </p>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold">Connect</h4>
              <div className="flex space-x-2">
                {socialLinks.map(social => {
                  const Icon = social.icon;
                  return (
                    <UIButton key={social.name} variant="ghost" asChild className="h-9 w-9 p-0">
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    </UIButton>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Jason Tieu. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with{' '}
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                Next.js
                <ExternalLink className="h-3 w-3" />
              </Link>
              ,{' '}
              <Link
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                Tailwind CSS
                <ExternalLink className="h-3 w-3" />
              </Link>
              , and{' '}
              <Link
                href="https://www.framer.com/motion/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                Framer Motion
                <ExternalLink className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
