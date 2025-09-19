'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '../_data/projects';
import { Badge } from '@/components/ui/badge';
import CardBase from '@/components/ui/CardBase';

export function FeaturedCarousel({ items }: { items: Project[] }) {
  const [i, setI] = useState(0);
  const id = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!items.length) return;
    if (id.current) clearInterval(id.current);
    id.current = setInterval(() => setI(x => (x + 1) % items.length), 5000);
    return () => {
      if (id.current) clearInterval(id.current);
    };
  }, [items.length]);

  const current = items[i];

  return (
    <CardBase className="mb-10 p-0">
      <div className="grid md:grid-cols-2 gap-0 h-96 md:h-[28rem]">
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.image ?? current?.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {current?.image && (
                <Image src={current.image} alt={current.title} fill className="object-cover" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="p-6 md:p-8 h-full flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            {current?.categories.map(c => (
              <Badge key={c} className="border-pink-500/20 text-pink-300">
                {c}
              </Badge>
            ))}
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">{current?.title}</h3>
          <p className="mt-2 text-white/70">{current?.description ?? current?.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {current?.tech.slice(0, 6).map(t => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            {current?.links?.demo && (
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-pink-400/30 hover:text-pink-300"
                href={current.links.demo}
                target="_blank"
              >
                Live Demo
              </a>
            )}
            {current?.links?.github && (
              <a
                className="text-sm text-white/70 hover:text-pink-400 underline-offset-4 hover:underline"
                href={current.links.github}
                target="_blank"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2 w-2 rounded-full transition-all ${i === idx ? 'w-6 bg-pink-400' : 'bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </CardBase>
  );
}
