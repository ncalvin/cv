// FIX: Import React to resolve 'Cannot find namespace "React"' error.
import React from 'react';

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary?: string;
  description: string[];
  results?: string[];
  skills?: string[];
  link?: string;
  logo?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  details: string | string[];
  year?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCard extends Skill {
  description: string;
  tagline?: string;
  impactStatement?: string;
  results?: string[];
  chips?: string[];
}

export interface Project {
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  imageUrl?: string;
  year?: string;
}

export interface EvidenceFile {
  type: 'pdf' | 'image';
  url: string;
}

export interface CourseItem {
  id: string;
  type: 'course' | 'training' | 'certification';
  title: string;
  institution: string;
  institutionLogoUrl?: string;
  startDate?: string; // YYYY-MM
  endDate?: string; // YYYY-MM or null
  dateCompleted?: string; // YYYY-MM
  duration?: string;
  format?: 'online' | 'presencial' | 'híbrido';
  level?: 'beginner' | 'intermediate' | 'advanced';
  summary: string;
  bullets?: string[];
  skills: string[];
  certificateUrl?: string;
  badgeUrl?: string;
  evidenceFiles?: EvidenceFile[];
  verified: boolean;
  expiresAt?: string; // YYYY-MM or null
}