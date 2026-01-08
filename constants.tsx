
import { SitemapItem, Session, Persona, NavigationTab } from './types';

export const SITEMAP_DATA: SitemapItem[] = [
  {
    level1: 'Home',
    purpose: 'Primary entry point and brand mission',
    contentType: 'Page',
    status: 'Live',
    owner: 'Brand Marketing',
  },
  {
    level1: 'Program',
    purpose: 'Core session discovery and schedule management',
    contentType: 'Collection',
    status: 'Approved',
    owner: 'Events Content',
    subItems: [
      { level2: 'Program', level3: 'Overview', contentType: 'Page', status: 'Live' },
      { level2: 'Program', level3: 'Agenda', contentType: 'Page', status: 'Live' },
      { level2: 'Program', level3: 'Schedule', contentType: 'Interactive', status: 'In Review' },
      { level2: 'Program', level3: 'Keynotes', contentType: 'Collection', status: 'Approved' },
      { level2: 'Program', level3: 'Breakout Sessions', contentType: 'Collection', status: 'Approved' },
      { level2: 'Program', level3: 'Hands-on Training', contentType: 'Collection', status: 'Draft' },
      { level2: 'Program', level3: 'Community Sessions', contentType: 'Collection', status: 'Approved' },
      { level2: 'Program', level3: 'Tracks', contentType: 'Taxonomy Hub', status: 'Live' },
    ]
  },
  {
    level1: 'Speakers',
    purpose: 'Highlighting thought leadership and DataFam stars',
    contentType: 'Collection',
    status: 'In Review',
    owner: 'Speaker Bureau',
    subItems: [
      { level2: 'Speakers', level3: 'Featured Speakers', contentType: 'Collection', status: 'In Review' },
      { level2: 'Speakers', level3: 'Keynote Speakers', contentType: 'Collection', status: 'Live' },
      { level2: 'Speakers', level3: 'Session Speakers', contentType: 'Collection', status: 'Draft' },
      { level2: 'Speakers', level3: 'Community Speakers', contentType: 'Collection', status: 'Draft' },
      { level2: 'Speakers', level3: 'Executives', contentType: 'Collection', status: 'Live' },
      { level2: 'Speakers', level3: 'Alphabetical Index', contentType: 'Directory', status: 'Live' },
    ]
  },
  {
    level1: 'Learn',
    purpose: 'Educational pathways and product proficiency',
    contentType: 'Collection',
    status: 'Approved',
    owner: 'Global Enablement',
    subItems: [
      { level2: 'Learn', level3: 'Learning Paths', contentType: 'Collection', status: 'Approved' },
      { level2: 'Learn', level3: 'Certifications', contentType: 'Page', status: 'Live' },
      { level2: 'Learn', level3: 'Exam Prep', contentType: 'Page', status: 'Live' },
      { level2: 'Learn', level3: 'Product Roadmap', contentType: 'Page', status: 'Draft' },
      { level2: 'Learn', level3: 'Ask the Experts', contentType: 'Events', status: 'In Review' },
      { level2: 'Learn', level3: 'Resources', contentType: 'Assets', status: 'Live' },
    ]
  },
  {
    level1: 'Community',
    purpose: 'Engagement hub for the Global DataFam',
    contentType: 'Collection',
    status: 'Live',
    owner: 'Community Team',
    subItems: [
      { level2: 'Community', level3: 'Tableau User Groups', contentType: 'Collection', status: 'Live' },
      { level2: 'Community', level3: 'Ambassadors', contentType: 'Profiles', status: 'Live' },
      { level2: 'Community', level3: 'DataFam Events', contentType: 'Events', status: 'Approved' },
      { level2: 'Community', level3: 'Iron Viz', contentType: 'Competition', status: 'Live' },
      { level2: 'Community', level3: 'Community Awards', contentType: 'Recognition', status: 'Draft' },
      { level2: 'Community', level3: 'Networking', contentType: 'Events', status: 'Approved' },
    ]
  },
  {
    level1: 'Expo',
    purpose: 'Partner showcase and demo theater',
    contentType: 'Collection',
    status: 'In Review',
    owner: 'Partner Marketing',
    subItems: [
      { level2: 'Expo', level3: 'Partner Expo', contentType: 'Collection', status: 'In Review' },
      { level2: 'Expo', level3: 'Product Demos', contentType: 'Sessions', status: 'Approved' },
      { level2: 'Expo', level3: 'Startup Zone', contentType: 'Collection', status: 'Draft' },
    ]
  },
  {
    level1: 'Sponsors',
    purpose: 'Commercial partnership management',
    contentType: 'Collection',
    status: 'Live',
    owner: 'Sales Operations',
    subItems: [
      { level2: 'Sponsors', level3: 'Become a Sponsor', contentType: 'Page', status: 'Live' },
      { level2: 'Sponsors', level3: 'Sponsor Tiers', contentType: 'Collection', status: 'Live' },
      { level2: 'Sponsors', level3: 'Sponsor Directory', contentType: 'Profiles', status: 'In Review' },
    ]
  },
  {
    level1: 'Venue & Travel',
    purpose: 'Logistics and location details',
    contentType: 'Pages',
    status: 'Approved',
    owner: 'Travel & Logistics',
    subItems: [
      { level2: 'Venue & Travel', level3: 'Venue', contentType: 'Page', status: 'Live' },
      { level2: 'Venue & Travel', level3: 'Hotels', contentType: 'Collection', status: 'Approved' },
      { level2: 'Venue & Travel', level3: 'Travel Info', contentType: 'Page', status: 'Live' },
      { level2: 'Venue & Travel', level3: 'Local Guide', contentType: 'Page', status: 'Draft' },
      { level2: 'Venue & Travel', level3: 'Accessibility', contentType: 'Page', status: 'Live' },
    ]
  },
  {
    level1: 'About',
    purpose: 'Governance & info',
    contentType: 'Pages',
    status: 'Live',
    owner: 'Public Relations',
    subItems: [
      { level2: 'About', level3: 'About TC', contentType: 'Page', status: 'Live' },
      { level2: 'About', level3: 'FAQ', contentType: 'Page', status: 'Live' },
      { level2: 'About', level3: 'Contact', contentType: 'Page', status: 'Live' },
      { level2: 'Governance', level3: 'Code of Conduct', contentType: 'Static', status: 'Live' },
      { level2: 'Sales Enablement', level3: 'Convince Your Boss', contentType: 'Page', status: 'Approved' },
    ]
  },
  {
    level1: 'Blog',
    purpose: 'Updates & stories',
    contentType: 'Articles',
    status: 'Live',
    owner: 'Editorial Team',
  },
  {
    level1: 'Register',
    purpose: 'Conversion (Tickets)',
    contentType: 'Transactional',
    status: 'Live',
    owner: 'Registration Systems',
  },
  {
    level1: 'Legal',
    purpose: 'Compliance',
    contentType: 'Static',
    status: 'Live',
    owner: 'Legal Council',
    subItems: [
      { level2: 'Legal', level3: 'Privacy', contentType: 'Static', status: 'Live' },
      { level2: 'Legal', level3: 'Cookies', contentType: 'Static', status: 'Live' },
      { level2: 'Legal', level3: 'Terms', contentType: 'Static', status: 'Live' },
    ]
  }
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Visual Analytics: Master the Art of Data Storytelling',
    abstract: 'Learn how to transform complex datasets into compelling visual narratives.',
    level: 'Intermediate',
    track: 'Visual Analytics',
    speaker: 'Andy Kriebel',
    time: 'Day 1 - 10:00 AM',
    audience: 'Analyst',
    sessionType: 'Breakout',
    product: 'Desktop',
    industry: 'Retail',
    delivery: 'In-person'
  },
  {
    id: '2',
    title: 'The Future of AI in Tableau: Einstein Copilot',
    abstract: 'Exploring the integration of generative AI within your Tableau workflow.',
    level: 'Beginner',
    track: 'AI & Einstein',
    speaker: 'Francois Ajenstat',
    time: 'Day 2 - 9:00 AM',
    audience: 'Executive',
    sessionType: 'Keynote',
    product: 'Cloud',
    industry: 'BFSI',
    delivery: 'In-person'
  },
  {
    id: '3',
    title: 'Governing Your Data Culture at Scale',
    abstract: 'Best practices for managing large-scale server deployments and user permissions.',
    level: 'Advanced',
    track: 'Data Culture',
    speaker: 'Amanda McDonald',
    time: 'Day 1 - 2:00 PM',
    audience: 'Admin',
    sessionType: 'Hands-on',
    product: 'Server',
    industry: 'Healthcare',
    delivery: 'Virtual'
  },
  {
    id: '4',
    title: 'Building Extensions for Tableau Cloud',
    abstract: 'Deep dive into the Extensions API for developers wanting to push platform limits.',
    level: 'Advanced',
    track: 'Developer & Extensions',
    speaker: 'Keshia Rose',
    time: 'Day 3 - 11:30 AM',
    audience: 'Developer',
    sessionType: 'Breakout',
    product: 'Cloud',
    industry: 'Technology',
    delivery: 'In-person'
  }
];

export const TRACKS = [
  'Visual Analytics', 
  'Business Intelligence', 
  'Data Storytelling',
  'Tableau Prep & Modeling', 
  'Tableau Cloud & Server', 
  'Administration',
  'Advanced Analytics', 
  'AI & Einstein', 
  'Embedded Analytics',
  'Industry Solutions', 
  'Data Culture', 
  'Developer & Extensions'
];

export const AUDIENCES: Persona[] = ['Analyst', 'Developer', 'Admin', 'Executive'];
export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const PRODUCTS = ['Desktop', 'Cloud', 'Server', 'Prep', 'Multiple'];

export interface PersonaMetadata {
  tracks: string[];
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  priorityTab: NavigationTab;
  highlightedModules: string[];
}

export const PERSONA_CONFIG: Record<Persona, PersonaMetadata> = {
  Analyst: {
    tracks: ['Visual Analytics', 'Data Storytelling', 'Advanced Analytics'],
    description: 'Focus on uncovering insights and telling stories with data.',
    heroTitle: 'Master the Art of Visual Discovery',
    heroSubtitle: 'Deepen your analytical skills with sessions tailored for data storytellers and visualization experts.',
    priorityTab: NavigationTab.PROGRAM,
    highlightedModules: ['Program', 'Learn']
  },
  Developer: {
    tracks: ['Developer & Extensions', 'Embedded Analytics', 'Tableau Prep & Modeling'],
    description: 'Build applications and extend the Tableau platform.',
    heroTitle: 'The Future of Extensible Analytics',
    heroSubtitle: 'Connect, extend, and embed. Dive deep into the Tableau API and developer ecosystem.',
    priorityTab: NavigationTab.PROGRAM,
    highlightedModules: ['Program', 'Community']
  },
  Admin: {
    tracks: ['Administration', 'Tableau Cloud & Server', 'Data Culture'],
    description: 'Manage deployments, security, and data governance.',
    heroTitle: 'Architecting Trust at Scale',
    heroSubtitle: 'Learn the latest in platform governance, security best practices, and enterprise deployments.',
    priorityTab: NavigationTab.ABOUT,
    highlightedModules: ['About', 'Legal']
  },
  Executive: {
    tracks: ['Business Intelligence', 'Data Culture', 'Industry Solutions'],
    description: 'Drive data-driven decision making across the enterprise.',
    heroTitle: 'Transforming Data into Strategy',
    heroSubtitle: 'Leadership-focused content on building data cultures and maximizing ROI on your analytics investment.',
    priorityTab: NavigationTab.HOME,
    highlightedModules: ['Home', 'Program']
  },
  General: {
    tracks: ['Visual Analytics', 'Data Culture'],
    description: 'Explore the full spectrum of the Tableau Conference.',
    heroTitle: 'The Biggest Data Event of the Year',
    heroSubtitle: 'The central hub for Tableau Conference planning, discoverability, and attendee experience.',
    priorityTab: NavigationTab.HOME,
    highlightedModules: ['Home', 'Program']
  }
};
