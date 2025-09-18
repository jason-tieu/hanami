import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Get In Touch with Jason Tieu',
  description:
    'Get in touch with Jason Tieu for full-stack development, AI/ML engineering, and cloud architecture opportunities. Available for freelance projects and full-time positions.',
  keywords: [
    'contact Jason Tieu',
    'hire full-stack developer',
    'AI engineer contact',
    'Brisbane developer contact',
    'freelance developer',
    'software engineer contact',
    'Next.js developer hire',
    'Node.js developer contact',
    'AWS consultant',
  ],
  openGraph: {
    title: 'Contact — Get In Touch with Jason Tieu',
    description:
      'Get in touch with Jason Tieu for full-stack development, AI/ML engineering, and cloud architecture opportunities. Available for freelance projects and full-time positions.',
    url: '/contact',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Contact Jason Tieu — Full-Stack & AI Engineer',
      },
    ],
  },
  twitter: {
    title: 'Contact — Get In Touch with Jason Tieu',
    description:
      'Get in touch with Jason Tieu for full-stack development, AI/ML engineering, and cloud architecture opportunities. Available for freelance projects and full-time positions.',
    images: ['/og.svg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
