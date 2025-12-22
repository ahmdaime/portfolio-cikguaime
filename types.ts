import { ReactNode } from "react";

// Extend HTMLImageElement to include fetchPriority
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

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
  image?: string;
  isInternal?: boolean; // For internal routes (react-router)
  isFeatured?: boolean; // For featured/highlighted card
  rating?: number; // Rating out of 5
  users?: string; // User count string e.g. "2,400+"
  category?: string; // Category label
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

export interface MediaChannel {
  id: string;
  platform: 'youtube' | 'tiktok';
  title: string;
  handle: string;
  description: string;
  link: string;
  gradient: string;
  stats?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  category: 'Tutorial' | 'Tips' | 'Extension' | 'Inovasi' | 'Perkongsian';
  readTime: string;
  thumbnail: string;
  views: string;
  isPopular?: boolean;
}