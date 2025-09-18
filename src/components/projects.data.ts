export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  categories: ("Embedded" | "AI/ML" | "Cloud" | "Full-Stack" | "Research" | "Other")[];
  tech: string[];
  year: string;
  featured: boolean;
  links: {
    github?: string;
    demo?: string;
    docs?: string;
    report?: string;
  };
  image: string;
};

export const projects: Project[] = [
  {
    id: "uav-gcs",
    title: "UAVPayloadTAQ — Ground Control Station",
    tagline: "Flask-SocketIO GCS with live telemetry, map overlays, and target workflow",
    description: "Real-time sensor ingestion, GIS layers, and operator tools for UAV payload control",
    categories: ["Embedded", "Full-Stack", "Cloud"],
    tech: ["Flask", "Socket.IO", "Postgres", "Leaflet", "Docker"],
    year: "2025",
    featured: true,
    links: {
      github: "#TODO",
      demo: "#TODO",
      docs: "#TODO"
    },
    image: "/images/projects/gcs.jpg"
  },
  {
    id: "flood-ai",
    title: "AI Flood Detection & Mapping",
    tagline: "DeepLabv3+ + SRGAN pipeline for CCTV + GIS mapping",
    description: "Real-time segmentation + super-resolution; web viewer with overlays and metrics",
    categories: ["AI/ML", "Research", "Full-Stack"],
    tech: ["PyTorch", "DeepLabv3+", "Real-ESRGAN", "FastAPI", "PostGIS"],
    year: "2025",
    featured: true,
    links: {
      github: "#TODO",
      demo: "#TODO"
    },
    image: "/images/projects/flood.jpg"
  },
  {
    id: "video-microservices",
    title: "Video Processor — Microservices on AWS",
    tagline: "Scalable video upload/transcode pipeline on ECS (API + CPU worker) with autoscaling",
    description: "Frontend + API + CPU worker services, S3 storage, CloudWatch scaling demo (1→3→1)",
    categories: ["Cloud", "Full-Stack"],
    tech: ["Next.js", "Node.js", "ECS", "S3", "CloudWatch", "ElastiCache/Redis", "Nginx"],
    year: "2025",
    featured: true,
    links: {
      github: "#TODO",
      demo: "#TODO"
    },
    image: "/images/projects/video-microservices.jpg"
  },
  {
    id: "ev-gui",
    title: "EV Embedded Control GUI (TM4C1294)",
    tagline: "FreeRTOS + TivaWare GUI with live plots, e-stop, touch navigation",
    description: "Dedicated display task, sensor queues, real-time plotting, motor control & fault UX",
    categories: ["Embedded"],
    tech: ["C", "FreeRTOS", "TivaWare/grlib", "UART/I2C", "Kentec LCD"],
    year: "2025",
    featured: true,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/ev-gui.jpg"
  },
  {
    id: "job-tracker",
    title: "Job Application Tracker",
    tagline: "Minimal, modern tracker with filters, labels, and platform integrations (Prosple/Workday)",
    description: "Notion-style UI, search/sort, future Gmail integration for responses",
    categories: ["Full-Stack"],
    tech: ["Next.js", "Supabase/Firebase", "Tailwind"],
    year: "2025",
    featured: false,
    links: {
      github: "#TODO",
      demo: "#TODO"
    },
    image: "/images/projects/job-tracker.jpg"
  },
  {
    id: "maglev-control",
    title: "Maglev Control System (EGH445)",
    tagline: "Nonlinear + linearised models with DLQR, observer, and Kalman filtering",
    description: "MATLAB/Simulink models, performance metrics, and design report",
    categories: ["Research"],
    tech: ["MATLAB/Simulink", "Control Theory"],
    year: "2025",
    featured: false,
    links: {
      report: "#TODO"
    },
    image: "/images/projects/maglev.jpg"
  },
  {
    id: "sokoban-solver",
    title: "Sokoban Solver (CAB320)",
    tagline: "A* search with Manhattan heuristic, taboo cells, and dynamic deadlock detection",
    description: "Efficient state representation, Hungarian matching validation, test harness",
    categories: ["AI/ML", "Other"],
    tech: ["Python"],
    year: "2025",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/sokoban.jpg"
  },
  {
    id: "canvas-integrator",
    title: "Canvas LMS Integrator (PoC)",
    tagline: "OAuth2 + REST to collate weekly units, rubrics, and deadlines",
    description: "Study planner with calendar sync; groundwork for broader student tooling",
    categories: ["Full-Stack"],
    tech: ["Next.js", "OAuth2", "Canvas API"],
    year: "2025",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/canvas-integrator.jpg"
  }
];
