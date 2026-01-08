
export type Persona = 'Analyst' | 'Developer' | 'Admin' | 'Executive' | 'General';
export type IAStatus = 'Draft' | 'In Review' | 'Approved' | 'Live';

export interface SitemapItem {
  level1: string;
  purpose: string;
  contentType: string;
  status: IAStatus;
  owner: string;
  subItems?: SitemapSubItem[];
}

export interface SitemapSubItem {
  level2: string;
  level3: string;
  contentType: string;
  status: IAStatus;
  description?: string;
}

export interface Session {
  id: string;
  title: string;
  abstract: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  track: string;
  speaker: string;
  time: string;
  audience: Persona;
  sessionType: string;
  product: 'Desktop' | 'Cloud' | 'Server' | 'Prep' | 'Multiple';
  industry: string;
  delivery: 'In-person' | 'Virtual';
}

export interface Speaker {
  name: string;
  bio: string;
  role: string;
  org: string;
  sessions: string[];
}

export enum NavigationTab {
  HOME = 'Home',
  PROGRAM = 'Program',
  SPEAKERS = 'Speakers',
  SPONSORS = 'Sponsors',
  VENUE = 'Venue & Travel',
  ABOUT = 'About',
  TICKETS = 'Tickets'
}
