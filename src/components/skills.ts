// components/skills.ts
import React from "react";
import { Code2, Cpu, Brain, Boxes, Cloud, Database, Sigma } from "lucide-react";

export type Skill = {
  id: string;
  title: string;
  subtitle: string;   // e.g., Languages / Embedded / AI/ML
  icon: React.ComponentType<{ className?: string }>;  // lucide icon component
  bullets: string[];  // short 3–5 bullets
  tags: string[];     // chips
};

export const skills: Skill[] = [
  {
    id: "c",
    title: "C/C++",
    subtitle: "Languages",
    icon: Code2,
    bullets: [
      "Real-time embedded on TM4C1294: ISRs, queues, drivers (I²C, UART), display task.",
      "Projects: EV Embedded GUI (FreeRTOS, grlib), Fruit Catcher (timers/ISRs).",
      "Deterministic UI; ISR-safe message passing; low input→draw latency.",
      "Stack: TivaWare/grlib, FreeRTOS, arm-gcc, CMake."
    ],
    tags: ["Embedded", "TM4C1294", "grlib", "FreeRTOS"]
  },
  {
    id: "python",
    title: "Python",
    subtitle: "Languages",
    icon: Code2,
    bullets: [
      "ML training/eval (DeepLabv3+), OpenCV preprocessing, GIS overlays.",
      "Flask/SocketIO GCS: telemetry ingest + drill control to RPi.",
      "Metrics/visualization for segmentation; live map layers.",
      "Stack: PyTorch, NumPy, Pandas, Flask/FastAPI."
    ],
    tags: ["PyTorch", "OpenCV", "Flask", "GIS"]
  },
  {
    id: "freertos",
    title: "FreeRTOS",
    subtitle: "Embedded",
    icon: Cpu,
    bullets: [
      "Task graph, queues/semaphores, software timers; ISR-safe design.",
      "Sensor @10 Hz → queue → display task; RTC banner & e-stop flow.",
      "Display isolated from ISRs; smooth updates.",
      "Stack: FreeRTOS API, TivaWare."
    ],
    tags: ["Tasks", "Queues", "Timers", "ISR"]
  },
  {
    id: "tensorflow",
    title: "TensorFlow",
    subtitle: "AI/ML",
    icon: Brain,
    bullets: [
      "Familiar with Keras for quick prototypes; primarily a PyTorch user.",
      "Comfortable with tf.data pipelines & SavedModel export.",
      "Used for baselines and on-device inference experiments."
    ],
    tags: ["Keras", "tf.data", "SavedModel"]
  },
  {
    id: "docker",
    title: "Docker",
    subtitle: "DevOps",
    icon: Boxes,
    bullets: [
      "Containerized APIs/CPU workers; Compose for local dev.",
      "Deployed to ECS tasks; logging sidecar for observability.",
      "Reproducible builds; simpler deploys."
    ],
    tags: ["Compose", "ECS", "Sidecars"]
  },
  {
    id: "aws",
    title: "AWS",
    subtitle: "Cloud",
    icon: Cloud,
    bullets: [
      "ECS (FE/API/CPU), ALB, Service Connect, CloudWatch, S3, ElastiCache (Redis).",
      "Autoscaling demo 1→3→1; Lambda notifications.",
      "Cached metadata reduced API latency under load."
    ],
    tags: ["ECS", "ALB", "Redis", "CloudWatch"]
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    subtitle: "Database",
    icon: Database,
    bullets: [
      "Schemas for telemetry/events; time-series queries & indexing.",
      "GCS telemetry store + analytics.",
      "Simple ORMs (Knex) & parameterized queries."
    ],
    tags: ["Schema", "Indexes", "Knex"]
  },
  {
    id: "matlab",
    title: "MATLAB",
    subtitle: "Tools",
    icon: Sigma,
    bullets: [
      "Maglev nonlinear model; DLQR/observer/Kalman.",
      "Disturbance tests & metrics (MAE/RMSE, overshoot/settling).",
      "Plots & analysis to validate controller behavior."
    ],
    tags: ["Simulink", "DLQR", "Kalman"]
  }
];
