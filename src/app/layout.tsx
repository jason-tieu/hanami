import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { Shell } from '@/components/shell/shell';
import SpeedInsightsClient from '@/components/SpeedInsightsClient';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jason-tieu.dev'),
  title: {
    default: 'Jason Tieu | Portfolio',
    template: '%s | Jason Tieu — Full-Stack & AI Engineer',
  },
  description:
    'Brisbane-based full-stack & AI engineer building production-ready web apps and applied computer vision. Next.js, Node.js, PostgreSQL/MongoDB, AWS ECS, Docker, PyTorch.',
  keywords: [
    'full-stack developer',
    'AI engineer',
    'Next.js',
    'Node.js',
    'AWS',
    'Docker',
    'PostgreSQL',
    'MongoDB',
    'PyTorch',
    'computer vision',
    'embedded systems',
    'microcontrollers',
    'FreeRTOS',
    'real-time systems',
    'cloud architecture',
    'Jason Tieu',
    'Brisbane developer',
    'software engineer',
  ],
  authors: [{ name: 'Jason Tieu', url: 'https://jason-tieu.dev' }],
  creator: 'Jason Tieu',
  publisher: 'Jason Tieu',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://jason-tieu.dev/',
    title: 'Jason Tieu — Full-Stack & AI Engineer (Next.js, Node, AWS)',
    description:
      'Brisbane-based full-stack & AI engineer building production-ready web apps and applied computer vision. Next.js, Node.js, PostgreSQL/MongoDB, AWS ECS, Docker, PyTorch.',
    siteName: 'Jason Tieu — Portfolio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Jason Tieu — Full-Stack & AI Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Tieu — Full-Stack & AI Engineer (Next.js, Node, AWS)',
    description:
      'Brisbane-based full-stack & AI engineer building production-ready web apps and applied computer vision. Next.js, Node.js, PostgreSQL/MongoDB, AWS ECS, Docker, PyTorch.',
    images: ['/og.png'],
    creator: '@jason_tieu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#FF4D6D" />

        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Preload hero image */}
        <link rel="preload" as="image" href="/images/avatar.webp" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jason Tieu',
              url: 'https://jason-tieu.dev',
              image: 'https://jason-tieu.dev/images/avatar.jpg',
              jobTitle: 'Full-Stack & AI Engineer',
              description: 'Brisbane-based full-stack & AI engineer building production-ready web apps and applied computer vision.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Brisbane',
                addressCountry: 'AU',
              },
              sameAs: [
                'https://github.com/jason-tieu',
                'https://linkedin.com/in/jason-tieu',
              ],
              knowsAbout: [
                'Next.js',
                'Node.js',
                'AWS',
                'Docker',
                'PostgreSQL',
                'MongoDB',
                'PyTorch',
                'Computer Vision',
                'Embedded Systems',
                'Cloud Architecture',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} bg-surface text-neutral-200 antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Shell>{children}</Shell>
        </ThemeProvider>
        <SpeedInsightsClient />
        <Analytics />
      </body>
    </html>
  );
}
