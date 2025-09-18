import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jason Tieu — Full-Stack & AI Engineer (Next.js, Node, AWS)',
  description:
    'Brisbane-based full-stack & AI engineer building production-ready web apps and applied computer vision. Next.js, Node.js, PostgreSQL/MongoDB, AWS ECS, Docker, PyTorch.',
  keywords: [
    'Jason Tieu',
    'full-stack developer Brisbane',
    'Next.js engineer',
    'Node.js backend',
    'AWS ECS',
    'MongoDB',
    'PostgreSQL',
    'Redis',
    'PyTorch',
    'computer vision',
    'DeepLab',
    'GIS',
    'AI engineer',
    'software engineer Brisbane',
  ],
  openGraph: {
    title: 'About Jason Tieu — Full-Stack & AI Engineer',
    description:
      'Learn about Jason Tieu, a Brisbane-based full-stack & AI engineer specializing in Next.js, Node.js, AWS, and applied computer vision. Background in embedded systems and cloud architecture.',
    url: '/about',
    type: 'profile',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Jason Tieu — Full-Stack & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Jason Tieu — Full-Stack & AI Engineer',
    description:
      'Learn about Jason Tieu, a Brisbane-based full-stack & AI engineer specializing in Next.js, Node.js, AWS, and applied computer vision. Background in embedded systems and cloud architecture.',
    images: ['/og.svg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
