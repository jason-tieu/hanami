import Link from 'next/link';
import { ArrowLeft, Mail, Github, Linkedin } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';
import AccentButton from '@/components/AccentButton';

export default function ContactPage() {
  return (
    <main className="relative">
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold">Let&apos;s Connect</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                I&apos;m always interested in new opportunities, exciting projects, and meaningful
                conversations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link href="mailto:jason@example.com" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send Email
                </Link>
              </UIButton>
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link href="https://github.com/jason-tieu" className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </Link>
              </UIButton>
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link
                  href="https://www.linkedin.com/in/jason-tieu-engineer/"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </Link>
              </UIButton>
            </div>

            <div className="pt-8">
              <AccentButton asChild variant="secondary" className="text-lg px-8 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Link>
              </AccentButton>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
