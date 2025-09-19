'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import AccentButton from '@/components/AccentButton';
import { TechPill } from '@/components/tech-pill';
import { useState } from 'react';

type FilterType = 'All' | 'Work' | 'Projects' | 'Recognition';

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: FilterType;
  tags: string[];
  bullets: string[];
  type: 'work' | 'project' | 'recognition';
}

const timelineData: TimelineItem[] = [
  {
    id: 'telstra-consultant',
    title: 'Retail Consultant',
    subtitle: 'Telstra',
    year: '2024 – Present',
    category: 'Work',
    type: 'work',
    tags: ['Customer Engagement', 'Sales', 'Problem-Solving', 'Communication'],
    bullets: [
      'Delivered consistent customer service and technical support in a high-volume retail environment',
      'Recognized as Samsung Representative, managing specialist product queries',
      'Developed strong stakeholder communication and adaptability skills under pressure',
    ],
  },
  {
    id: 'flood-detection',
    title: 'AI-Based Flood Detection System',
    subtitle: 'Capstone Project',
    year: '2025',
    category: 'Projects',
    type: 'project',
    tags: ['AI/ML', 'PyTorch', 'DeepLabv3+', 'GANs', 'Computer Vision', 'GIS Integration'],
    bullets: [
      'Developed a real-time flood detection pipeline using DeepLabv3+ and SRGAN',
      'Integrated GIS mapping for spatial flood analysis and decision support',
      'Applied Agile workflow: weekly sprints, testing, and academic reviews',
    ],
  },
  {
    id: 'uav-gcs',
    title: 'UAV Ground Control Station',
    subtitle: 'UAVPayloadTAQ',
    year: '2025',
    category: 'Projects',
    type: 'project',
    tags: ['Full-Stack', 'Flask', 'Socket.IO', 'PostgreSQL', 'Systems Engineering'],
    bullets: [
      'Built a Flask + Socket.IO backend for real-time UAV telemetry ingestion',
      'Designed PostgreSQL schemas and dashboards for live operator visualization',
      'Delivered iteratively against REQs/HLOs in a systems engineering workflow',
    ],
  },
  {
    id: 'video-processing',
    title: 'Video Processing Microservices Application',
    subtitle: 'CAB432',
    year: '2025',
    category: 'Projects',
    type: 'project',
    tags: ['Full-Stack', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'AWS ECS', 'Docker', 'Redis'],
    bullets: [
      'Designed and deployed a full-stack video platform with microservices on AWS ECS',
      'Implemented Redis caching and load balancing via Docker + Nginx',
      'Delivered frontend UX in Next.js with Tailwind + Framer Motion',
    ],
  },
  {
    id: 'motorsport-telemetry',
    title: 'QUT Motorsport Telemetry Analysis',
    subtitle: 'Data Analytics Project',
    year: '2024',
    category: 'Projects',
    type: 'project',
    tags: ['Data Analysis', 'MATLAB', 'InfluxDB', 'Motorsports'],
    bullets: [
      'Developed a MATLAB telemetry pipeline to analyze battery, lap times, and speed data',
      'Applied data filtering, computational analysis, and mapping to inform race strategy',
      'Proposed predictive ML models for optimization',
    ],
  },
  {
    id: 'qut-summit',
    title: 'QUT Summit Attendee',
    subtitle: 'Selected Program',
    year: '2024',
    category: 'Recognition',
    type: 'recognition',
    tags: ['Leadership', 'Innovation', 'Teamwork'],
    bullets: [
      'Collaborated on industry challenges with high-achieving peers',
      'Developed innovative solutions to real-world problems',
      'Built professional networks and leadership skills',
    ],
  },
  {
    id: 'adf-award',
    title: 'ADF Future Innovators Award',
    subtitle: 'Technology Innovation Recognition',
    year: '2024',
    category: 'Recognition',
    type: 'recognition',
    tags: ['Innovation', 'Technology', 'Leadership'],
    bullets: [
      'Recognized for technology-driven innovation and problem-solving',
      'Demonstrated excellence in applying technical skills to real challenges',
      'Contributed to advancing technological solutions in defense sector',
    ],
  },
  {
    id: 'qut-gpa',
    title: 'QUT Academic Excellence',
    subtitle: 'Computer & Software Systems Engineering',
    year: '2022 – 2025',
    category: 'Recognition',
    type: 'recognition',
    tags: ['Academic Excellence', 'Engineering', 'High Performance'],
    bullets: [
      'Maintained GPA of 6.0/7.0 throughout degree program',
      'Consistently achieved high marks in technical and theoretical courses',
      'Demonstrated strong academic discipline and learning capability',
    ],
  },
];

const academicProjects = [
  {
    title: 'Auction House CLI App',
    tech: 'C# OOP',
    description: 'Applied inheritance/streams for modular data handling',
    projectId: 'auction-house',
  },
  {
    title: 'Cloud-Based Web App Deployment',
    tech: 'Node.js/React on AWS',
    description: 'Used microservices and ECS for scalable deployment',
    projectId: 'cloud-webapp',
  },
  {
    title: 'Smart Infrastructure Data Analysis',
    tech: 'Python Pandas',
    description: 'Created predictive IoT-driven insights for QUT HVAC',
    projectId: 'smart-infrastructure',
  },
  {
    title: 'Simon Says Microprocessor Game',
    tech: 'C/Assembly',
    description: 'Deployed on microcontrollers with hardware integration',
    projectId: 'simon-says',
  },
  {
    title: 'Java Study Scheduler',
    tech: 'Java OOP',
    description: 'Implemented OOP-based task prioritization system',
    projectId: 'java-scheduler',
  },
];

export default function ExperiencePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredTimeline = timelineData.filter(
    item => activeFilter === 'All' || item.category === activeFilter,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const filterButtons: FilterType[] = ['All', 'Work', 'Projects', 'Recognition'];

  return (
    <main className="relative">
      {/* Hero Section */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">My Experience</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A journey through my professional experience, academic achievements, and continuous
                learning in full-stack development, AI/ML, and cloud engineering.
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

      {/* Filter Buttons */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterButtons.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-brand text-white shadow-lg shadow-brand/25'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white dark:border-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand/50 to-transparent hidden md:block" />

            <div className="space-y-12">
              {filteredTimeline.map(item => (
                <motion.div key={item.id} variants={itemVariants} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-brand rounded-full border-4 border-background hidden md:block z-10" />

                  {/* Content Card */}
                  <div className="ml-0 md:ml-16">
                    <div className="bg-card/50 border border-border rounded-2xl p-6 hover:bg-card transition-all duration-300 hover:border-brand/30 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground">{item.subtitle}</p>
                          </div>
                          <span className="text-sm text-brand font-medium bg-brand/10 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <TechPill key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </TechPill>
                          ))}
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-2">
                          {item.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <span className="text-brand mt-1.5 text-sm">•</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Academic Projects Section */}
      {activeFilter === 'All' || activeFilter === 'Projects' ? (
        <SectionWrapper>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Academic Projects</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {academicProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={`/projects#${project.projectId}`}
                      className="block bg-card/50 border border-border rounded-xl p-4 hover:bg-card transition-all duration-300 hover:border-brand/30 hover:scale-105 group dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                      aria-label={`View ${project.title} project details`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-brand transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors" />
                      </div>
                      <TechPill variant="secondary" className="text-xs mb-3">
                        {project.tech}
                      </TechPill>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      ) : null}

      {/* External Links Section */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-foreground">Connect With Me</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/jason-tieu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card/50 border border-border rounded-xl text-foreground hover:bg-card hover:border-brand/30 transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                <span>GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/jason-tieu-engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card/50 border border-border rounded-xl text-foreground hover:bg-card hover:border-brand/30 transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                <span>LinkedIn</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="mailto:jason.tieu04@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-card/50 border border-border rounded-xl text-foreground hover:bg-card hover:border-brand/30 transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                <span>Email</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  );
}
