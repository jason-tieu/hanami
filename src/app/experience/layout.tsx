import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience — Full-Stack & AI Engineering Career',
  description:
    "Explore Jason Tieu's professional experience in full-stack development, AI/ML engineering, embedded systems, and cloud architecture. Career highlights and technical expertise.",
  keywords: [
    'Jason Tieu experience',
    'full-stack developer experience',
    'AI engineer career',
    'embedded systems experience',
    'cloud architecture experience',
    'software engineering career',
    'Brisbane developer experience',
    'Next.js experience',
    'Node.js experience',
    'AWS experience',
  ],
  openGraph: {
    title: 'Experience — Full-Stack & AI Engineering Career',
    description:
      "Explore Jason Tieu's professional experience in full-stack development, AI/ML engineering, embedded systems, and cloud architecture. Career highlights and technical expertise.",
    url: '/experience',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Jason Tieu — Professional Experience',
      },
    ],
  },
  twitter: {
    title: 'Experience — Full-Stack & AI Engineering Career',
    description:
      "Explore Jason Tieu's professional experience in full-stack development, AI/ML engineering, embedded systems, and cloud architecture. Career highlights and technical expertise.",
    images: ['/og.svg'],
  },
  alternates: {
    canonical: '/experience',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
