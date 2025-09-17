import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Shell } from "@/components/shell/shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Jason Tieu | Portfolio",
    template: "%s | Jason Tieu | Portfolio",
  },
  description: "Professional portfolio showcasing embedded systems, AI/ML, and software engineering expertise. Specializing in microcontrollers, FreeRTOS, computer vision, and scalable cloud architectures.",
  keywords: [
    "embedded systems",
    "microcontrollers",
    "FreeRTOS",
    "AI/ML",
    "computer vision",
    "distributed systems",
    "cloud architecture",
    "real-time control",
    "scalable software design",
    "Jason Tieu"
  ],
  authors: [{ name: "Jason Tieu" }],
  creator: "Jason Tieu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Jason Tieu - Embedded Systems • AI/ML • Software Engineering",
    description: "Professional portfolio showcasing embedded systems, AI/ML, and software engineering expertise.",
    siteName: "Jason Tieu Portfolio",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Jason Tieu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Tieu - Embedded Systems • AI/ML • Software Engineering",
    description: "Professional portfolio showcasing embedded systems, AI/ML, and software engineering expertise.",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FF4D6D" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} bg-surface text-neutral-200 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
