import { ReactNode } from "react";

export interface Extension {
  id: string;
  title: string;
  description: string;
  features: string[];
  stats: string;
  link: string;
  gradient: string;
  icon: ReactNode;
  tags: string[];
  image?: string; // Added optional image property
}

export interface StatItem {
  id: number;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon: ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
}

export interface Achievement {
  year: string;
  title: string;
  highlights: string[];
  link: string;
  color: string; // Tailwind gradient color
}