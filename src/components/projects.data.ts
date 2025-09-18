export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  categories: ("Embedded" | "AI/ML" | "Cloud" | "Full-Stack" | "Research" | "Data Analysis" | "Backend" | "Other")[];
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
  bullets?: string[];
};

export const projects: Project[] = [
  {
    id: "flood-ai",
    title: "AI-Based Flood Detection System (Capstone)",
    tagline: "AI-powered flood detection pipeline integrating CCTV imagery with GIS mapping for real-time decision support",
    description: "Advanced computer vision system leveraging DeepLabv3+ and GANs for automated flood monitoring and early warning systems in vulnerable regions",
    categories: ["AI/ML", "Research", "Full-Stack"],
    tech: ["PyTorch", "DeepLabv3+", "GANs", "Computer Vision", "GIS Integration", "Agile Research"],
    year: "2024",
    featured: true,
    links: {
      github: "#TODO",
      demo: "#TODO",
      report: "#TODO"
    },
    image: "/images/projects/flood_detection.png",
    bullets: [
      "Built deep learning models (DeepLabv3+, SRGAN) with PyTorch for flood recognition",
      "Integrated GIS metadata for spatial flood mapping and emergency response coordination",
      "Applied Agile sprints with weekly deliverables and supervisor feedback cycles",
      "Trained across FloodNet + synthetic datasets for enhanced model robustness",
      "Produced technical reports aligned with QUT engineering standards and documentation"
    ]
  },
  {
    id: "video-microservices",
    title: "Video Processing Microservices Application",
    tagline: "Cloud-deployed microservice app for video upload, transcoding, and caching with scalable AWS infrastructure",
    description: "Full-stack video processing platform with microservices architecture, real-time transcoding, and optimized cloud deployment",
    categories: ["Full-Stack", "Cloud"],
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "AWS ECS", "Docker", "Redis", "CI/CD"],
    year: "2024",
    featured: true,
    links: {
      github: "#TODO",
      demo: "#TODO"
    },
    image: "/images/projects/video-microservices.png",
    bullets: [
      "Implemented Node.js/Express backend APIs for video workflows and processing pipelines",
      "Built responsive Next.js UI with TailwindCSS + Framer Motion for enhanced user experience",
      "Deployed on AWS ECS with Docker + Nginx reverse proxy for scalable infrastructure",
      "Optimized performance with Redis caching (ElastiCache) reducing response times by 70%",
      "Managed CI/CD pipelines with Agile sprint planning for continuous deployment"
    ]
  },
  {
    id: "uav-gcs",
    title: "UAV Ground Control Station",
    tagline: "Full-stack ground control station for UAV payload management with real-time telemetry and visualization",
    description: "Comprehensive UAV control system with real-time data streaming, operator dashboards, and hardware integration",
    categories: ["Full-Stack", "Cloud"],
    tech: ["Flask", "Socket.IO", "PostgreSQL", "WebSockets", "Agile Development", "Systems Engineering"],
    year: "2024",
    featured: true,
    links: {
      github: "#TODO",
      demo: "#TODO",
      docs: "#TODO"
    },
    image: "/images/projects/gcs.png",
    bullets: [
      "Designed Flask + Socket.IO backend for real-time UAV telemetry and data streaming",
      "Built PostgreSQL schema for structured sensor and payload storage with optimized queries",
      "Created operator dashboards with live data visualizations and mission planning tools",
      "Delivered against REQs/HLOs via Agile systems engineering workflow and stakeholder feedback",
      "Coordinated with hardware and software subsystems for seamless integration and testing"
    ]
  },
  {
    id: "ev-gui",
    title: "Embedded Electric Vehicle GUI System",
    tagline: "Real-time GUI for electric vehicle control and telemetry on TM4C1294 with FreeRTOS",
    description: "Embedded control system with touchscreen interface for electric vehicle dashboard and motor control",
    categories: ["Embedded"],
    tech: ["FreeRTOS", "C/C++", "ARM Cortex-M", "TivaWare", "Touchscreen GUI", "Agile Lab Development"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/embedded.png",
    bullets: [
      "Built FreeRTOS task system for concurrent sensor + GUI operations with real-time constraints",
      "Developed multi-screen GUI with TivaWare grlib for intuitive user experience",
      "Integrated queues for live plotting (light/temp/motor RPM) with optimized data flow",
      "Added e-stop + motor control logic through GUI interaction for safety compliance",
      "Iterated features using Agile lab cycles with rapid testing/debugging workflows"
    ]
  },
  {
    id: "auction-house",
    title: "Auction House CLI Application",
    tagline: "Object-oriented C# command-line tool for auction data management and processing",
    description: "Command-line application for auction data management with optimized data structures and user interaction",
    categories: ["Backend"],
    tech: ["C#", "OOP", "Data Structures", "Command-Line Tools"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/placeholder.svg",
    bullets: [
      "Applied OOP principles (inheritance, streams) for modular design and code reusability",
      "Optimized data handling and memory management in C# for performance efficiency",
      "Designed intuitive CLI menus for user interaction and data navigation",
      "Followed Agile-style iteration cycles for feature delivery and user feedback"
    ]
  },
  {
    id: "cloud-webapp",
    title: "Cloud-Based Web App Deployment",
    tagline: "Full-stack web app deployed on AWS using microservices architecture with scalable infrastructure",
    description: "Cloud-native web application with microservices architecture and cost-efficient AWS deployment",
    categories: ["Full-Stack", "Cloud"],
    tech: ["Node.js", "React", "AWS ECS", "Lambda", "S3", "Microservices"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO",
      demo: "#TODO"
    },
    image: "/images/projects/placeholder.svg",
    bullets: [
      "Designed React + Node.js app with modular microservices for scalability and maintainability",
      "Deployed with AWS ECS, Lambda, and S3 for cloud-native scalability and cost efficiency",
      "Configured cost-efficient cloud infrastructure with auto-scaling and load balancing",
      "Delivered incrementally with Agile deployment strategy and continuous monitoring"
    ]
  },
  {
    id: "smart-infrastructure",
    title: "Smart Infrastructure Data Analysis",
    tagline: "IoT-driven data analysis for predictive air conditioning scheduling and energy optimization",
    description: "Data analytics solution for smart building optimization using IoT sensor data and predictive modeling",
    categories: ["Data Analysis"],
    tech: ["Python", "Pandas", "IoT", "Predictive Modelling"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO",
      report: "#TODO"
    },
    image: "/images/projects/placeholder.svg",
    bullets: [
      "Used Python (Pandas/NumPy) to process QUT building IoT data for insights and patterns",
      "Developed predictive algorithms to automate scheduling and optimize energy consumption",
      "Identified resource optimization insights for energy efficiency and cost reduction",
      "Proposed ML predictive modelling to refine future strategy and improve accuracy"
    ]
  },
  {
    id: "simon-says",
    title: "'Simon Says' Microprocessor Game",
    tagline: "Microcontroller-based Simon Says game built with low-level C and Assembly programming",
    description: "Embedded game development with hardware interaction and optimized microcontroller programming",
    categories: ["Embedded"],
    tech: ["Assembly", "C", "Microcontrollers"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/placeholder.svg",
    bullets: [
      "Programmed peripheral I/O with Assembly + C for direct hardware control and optimization",
      "Designed LED + button interactions for game logic and user feedback systems",
      "Optimized bit-level operations for hardware efficiency and performance",
      "Iterated using Agile-style test cycles in lab environments for rapid development"
    ]
  },
  {
    id: "java-scheduler",
    title: "Java Study Scheduler",
    tagline: "Java-based scheduler for prioritizing student study tasks with intelligent time management",
    description: "Task management application with intelligent scheduling algorithms and OOP design principles",
    categories: ["Backend"],
    tech: ["Java", "OOP", "Scheduling", "Task Management"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/placeholder.svg",
    bullets: [
      "Implemented task prioritization + time management algorithms for efficient scheduling",
      "Applied OOP design principles for modularity, maintainability, and code organization",
      "Ensured scalable + maintainable codebase with proper architecture and documentation",
      "Delivered iteratively with Agile backlog grooming and continuous improvement"
    ]
  },
  {
    id: "sokoban-solver",
    title: "Sokoban Solver",
    tagline: "A* search with Manhattan heuristic, taboo cells, and dynamic deadlock detection",
    description: "Advanced puzzle-solving algorithm with optimized state representation and intelligent search strategies for Sokoban game solutions",
    categories: ["AI/ML"],
    tech: ["Python", "A* Search", "Algorithms", "Data Structures"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO"
    },
    image: "/images/projects/sokoban.png",
    bullets: [
      "Implemented A* search algorithm with Manhattan heuristic for optimal pathfinding",
      "Developed efficient state representation with optimized data structures for memory management",
      "Applied Hungarian matching validation for solution verification and correctness",
      "Built comprehensive test harness for algorithm performance analysis and optimization",
      "Implemented dynamic deadlock detection for improved solving efficiency and reduced search space"
    ]
  },
  {
    id: "motorsport-telemetry",
    title: "Vehicle Telemetry Data Analysis",
    tagline: "MATLAB pipeline for telemetry analysis of QUT Motorsport vehicles with performance optimization",
    description: "Advanced data analytics solution for motorsports performance analysis and race strategy optimization",
    categories: ["Data Analysis"],
    tech: ["MATLAB", "InfluxDB", "IoT", "Motorsports Analytics"],
    year: "2024",
    featured: false,
    links: {
      github: "#TODO",
      report: "#TODO"
    },
    image: "/images/projects/motorsport.png",
    bullets: [
      "Built MATLAB pipeline to process InfluxDB telemetry data for performance insights",
      "Analyzed speed, lap times, battery voltage for performance tuning and optimization",
      "Applied geographic mapping for track positioning and racing line analysis",
      "Proposed ML-based predictive modelling for race strategy and competitive advantage",
      "Collaborated with QUT Motorsports team for integration and real-world validation"
    ]
  }
];
