import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Full-Stack & AI Engineering Portfolio',
  description:
    'Explore my portfolio of embedded systems, AI/ML, and cloud architecture projects. Featured work includes flood detection AI, EV dashboard interfaces, and scalable microservices.',
  keywords: [
    'portfolio projects',
    'embedded systems projects',
    'AI ML projects',
    'cloud architecture',
    'microservices',
    'flood detection AI',
    'EV dashboard',
    'real-time systems',
    'Jason Tieu projects',
  ],
  openGraph: {
    title: 'Projects — Full-Stack & AI Engineering Portfolio',
    description:
      'Explore my portfolio of embedded systems, AI/ML, and cloud architecture projects. Featured work includes flood detection AI, EV dashboard interfaces, and scalable microservices.',
    url: '/projects',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Jason Tieu — Projects Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Projects — Full-Stack & AI Engineering Portfolio',
    description:
      'Explore my portfolio of embedded systems, AI/ML, and cloud architecture projects. Featured work includes flood detection AI, EV dashboard interfaces, and scalable microservices.',
    images: ['/og.svg'],
  },
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
