// components/skills.ts
import React from 'react';
import { Code2, Cpu, Brain, Boxes, Cloud, Database, Sigma } from 'lucide-react';

export type Skill = {
  id: string;
  title: string;
  subtitle: string; // e.g., Languages / Embedded / AI/ML
  icon: React.ComponentType<{ className?: string }>; // lucide icon component
  bullets: string[]; // short 3–5 bullets
  tags: string[]; // chips
};

export const skills: Skill[] = [
  {
    id: 'c',
    title: 'C/C++',
    subtitle: 'Languages',
    icon: Code2,
    bullets: [
      'Embedded firmware on TM4C1294XL: FreeRTOS tasks, ISRs, GPIO/timer drivers.',
      'Real-time GUIs (TivaWare grlib) with touch + sensor integration.',
      'A* search + heuristics for Sokoban solver (CAB320).',
      'Debugging low-level peripherals (I²C, SPI, PWM).',
    ],
    tags: ['Embedded', 'FreeRTOS', 'TM4C1294', 'Algorithms'],
  },
  {
    id: 'python',
    title: 'Python',
    subtitle: 'Languages',
    icon: Code2,
    bullets: [
      'ML training/eval (DeepLabv3+), OpenCV preprocessing, GIS overlays.',
      'Flask/SocketIO GCS: telemetry ingest + drill control to RPi.',
      'Metrics/visualization for segmentation; live map layers.',
      'Stack: PyTorch, NumPy, Pandas, Flask/FastAPI.',
    ],
    tags: ['PyTorch', 'OpenCV', 'Flask', 'GIS'],
  },
  {
    id: 'freertos',
    title: 'FreeRTOS',
    subtitle: 'Embedded',
    icon: Cpu,
    bullets: [
      'Built multitasking apps (Fruit Catcher, Stopwatch, EV GUI).',
      'Queues/semaphores for sensor → display pipelines.',
      'Software timers for periodic tasks (sensor sampling, game logic).',
      'Ensured deterministic scheduling + zero display updates in ISRs.',
    ],
    tags: ['RTOS', 'Tasks', 'Semaphores', 'Timers'],
  },
  {
    id: 'tensorflow',
    title: 'TensorFlow',
    subtitle: 'AI/ML',
    icon: Brain,
    bullets: [
      'CNN prototyping for segmentation + classification tasks.',
      'Transfer learning and augmentation for small flood datasets.',
      'Compared against PyTorch pipelines for performance/accuracy.',
      'Integrated with OpenCV preprocessing for end-to-end inference.',
    ],
    tags: ['Keras', 'CNN', 'Segmentation', 'AI/ML'],
  },
  {
    id: 'docker',
    title: 'Docker',
    subtitle: 'DevOps',
    icon: Boxes,
    bullets: [
      'Containerized Flask API + CPU worker for video processing.',
      'ECS Fargate deployment with service-to-service networking.',
      'Built reproducible ML environments with Dockerfiles.',
      'Logged + monitored microservices via Lambda integration.',
    ],
    tags: ['ECS', 'Microservices', 'DevOps', 'Containers'],
  },
  {
    id: 'aws',
    title: 'AWS',
    subtitle: 'Cloud',
    icon: Cloud,
    bullets: [
      'ECS + Service Connect for frontend/backend CPU worker.',
      'S3 for uploads/outputs; presigned URLs for client access.',
      'ElastiCache Redis for caching user + video metadata.',
      'Configured scaling policy (1 → 3 → 1) with CloudWatch metrics.',
    ],
    tags: ['ECS', 'S3', 'ElastiCache', 'Lambda'],
  },
  {
    id: 'postgres',
    title: 'PostgreSQL',
    subtitle: 'Database',
    icon: Database,
    bullets: [
      'Designed schemas for UAV telemetry + job tracker web app.',
      'SQLAlchemy ORM integration with Flask APIs.',
      'Tuned queries for real-time dashboard metrics.',
      'Managed migrations + structured datasets (FloodNet, AOIs).',
    ],
    tags: ['SQLAlchemy', 'Flask', 'Database', 'Telemetry'],
  },
  {
    id: 'matlab',
    title: 'MATLAB',
    subtitle: 'Tools',
    icon: Sigma,
    bullets: [
      'Modeled nonlinear + linearized maglev train (EGH445).',
      'Designed DLQR, observer, Kalman filter controllers.',
      'Simulated overshoot, settling time, and control effort.',
      'Used MATLAB/Simulink for signal filtering + visualization.',
    ],
    tags: ['Simulink', 'Control', 'DLQR', 'Kalman'],
  },
];
