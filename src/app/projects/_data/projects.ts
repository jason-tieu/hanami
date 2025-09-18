export type Project = {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  categories: ('Embedded' | 'AI/ML' | 'Cloud' | 'Full-Stack' | 'Research' | 'Game' | 'Other')[];
  tech: string[];
  year: string;
  featured?: boolean;
  links?: { github?: string; demo?: string; doc?: string };
  image?: string;
};

export const projects: Project[] = [
  {
    id: 'uav-gcs',
    title: 'UAVPayloadTAQ — Ground Control Station',
    tagline: 'Flask-SocketIO GCS with live telemetry & GIS overlays',
    description: 'Real-time ingestion, map layers, target workflow.',
    categories: ['Embedded', 'Full-Stack', 'Cloud'],
    tech: ['Flask', 'Socket.IO', 'Postgres', 'Leaflet', 'Docker'],
    year: '2025',
    featured: true,
    links: { github: '#', demo: '#', doc: '#' },
    image: '/images/projects/gcs.svg',
  },
  {
    id: 'flood-ai',
    title: 'AI Flood Detection & Mapping',
    tagline: 'DeepLabv3+ + SRGAN pipeline for CCTV + GIS',
    categories: ['AI/ML', 'Research', 'Full-Stack'],
    tech: ['PyTorch', 'DeepLabv3+', 'PostGIS', 'FastAPI'],
    year: '2025',
    featured: true,
    links: { github: '#' },
    image: '/images/projects/flood.svg',
  },
  {
    id: 'ev-gui',
    title: 'EV Embedded GUI',
    tagline: 'Touchscreen interface for electric vehicle dashboard',
    description:
      'Real-time display system using TM4C1294XL microcontroller with FreeRTOS task management.',
    categories: ['Embedded'],
    tech: ['FreeRTOS', 'C', 'Touchscreen', 'CAN Bus', 'grlib'],
    year: '2024',
    featured: true,
    links: { github: '#', demo: '#' },
    image: '/images/ev-gui.svg',
  },
  {
    id: 'cloud-video',
    title: 'Cloud Video Processing Service',
    tagline: 'Scalable microservices for real-time video processing',
    description: 'Distributed architecture with Redis caching and auto-scaling capabilities.',
    categories: ['Cloud', 'Full-Stack'],
    tech: ['Docker', 'Redis', 'Node.js', 'AWS ECS', 'Microservices'],
    year: '2024',
    featured: false,
    links: { github: '#', demo: '#' },
    image: '/images/video-processing.svg',
  },
  {
    id: 'maglev-control',
    title: 'Magnetic Levitation Control System',
    tagline: 'DLQR controller with Kalman filtering for maglev platform',
    description: 'Nonlinear control system with disturbance rejection and stability analysis.',
    categories: ['Embedded', 'Research'],
    tech: ['MATLAB', 'Simulink', 'DLQR', 'Kalman Filter', 'Control Theory'],
    year: '2024',
    featured: false,
    links: { github: '#', doc: '#' },
    image: '/images/projects/maglev.svg',
  },
  {
    id: 'fruit-catcher',
    title: 'Fruit Catcher Game',
    tagline: 'Real-time embedded game with ISR-driven mechanics',
    description: 'Interactive game using timers and interrupts for smooth gameplay.',
    categories: ['Embedded', 'Game'],
    tech: ['C', 'TM4C1294', 'ISR', 'Timers', 'grlib'],
    year: '2023',
    featured: false,
    links: { github: '#' },
    image: '/images/projects/fruit-catcher.svg',
  },
  {
    id: 'ml-optimization',
    title: 'ML Model Optimization Pipeline',
    tagline: 'Automated hyperparameter tuning and model compression',
    description: 'End-to-end pipeline for optimizing deep learning models for edge deployment.',
    categories: ['AI/ML', 'Research'],
    tech: ['PyTorch', 'Optuna', 'TensorRT', 'Quantization', 'ONNX'],
    year: '2024',
    featured: false,
    links: { github: '#', doc: '#' },
    image: '/images/ml-optimization.svg',
  },
  {
    id: 'iot-sensors',
    title: 'IoT Sensor Network',
    tagline: 'Distributed sensor monitoring with edge computing',
    description: 'Wireless sensor network with real-time data processing and visualization.',
    categories: ['Embedded', 'Cloud', 'Full-Stack'],
    tech: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'Python'],
    year: '2023',
    featured: false,
    links: { github: '#', demo: '#' },
    image: '/images/iot-sensors.svg',
  },
];
