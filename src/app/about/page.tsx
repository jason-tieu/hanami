import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import AccentButton from "@/components/AccentButton";

export default function AboutPage() {
  return (
    <main className="relative">
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold">
                About Me
              </h1>
              <p className="text-xl text-muted-foreground">
                Passionate about building innovative solutions at the intersection of 
                embedded systems, AI/ML, and software engineering.
              </p>
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