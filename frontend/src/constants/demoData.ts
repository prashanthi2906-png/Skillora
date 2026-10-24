import { CareerRequirement, StudentProfile } from '../types';

export const DEMO_CREDENTIALS = {
  email: 'student@skillora.demo',
  password: 'Skillora123!',
};

export const AVAILABLE_LANGUAGES: string[] = [
  'JavaScript',
  'TypeScript',
  'Java',
  'Python',
  'C++',
  'Go',
  'Rust',
  'SQL',
  'C#',
  'Kotlin',
  'Swift',
  'PHP',
];

export const AVAILABLE_TECHNICAL_SKILLS: string[] = [
  'React',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Spring Boot',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'Git & GitHub',
  'REST APIs',
  'GraphQL',
  'AWS',
  'Redis',
  'MongoDB',
  'CI/CD Pipelines',
  'Linux',
  'Microservices',
  'Jest / Unit Testing',
];

export const AVAILABLE_SOFT_SKILLS: string[] = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Critical Thinking',
  'Time Management',
  'Adaptability',
  'Code Review',
  'Agile / Scrum',
  'Mentorship',
];

export const CAREER_INTEREST_SUGGESTIONS: string[] = [
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'AI/ML Engineer',
  'Cybersecurity Analyst',
  'Cloud Engineer',
  'Cloud & DevOps Engineer',
  'Backend Engineer',
  'Frontend Specialist',
  'Data Platform Engineer',
];

export const CAREER_REQUIREMENTS: CareerRequirement[] = [
  {
    id: 'full-stack-dev',
    title: 'Full-Stack Developer',
    description: 'Builds end-to-end web applications covering responsive client interfaces and robust backend microservices.',
    requiredLanguages: ['TypeScript', 'JavaScript', 'SQL'],
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git & GitHub'],
    recommendedSkills: ['Tailwind CSS', 'Docker', 'Redis', 'CI/CD Pipelines'],
    averageSalary: '$95,000 - $130,000',
    growthRate: '+22% (Next 5 Years)',
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    description: 'Designs scalable server architectures, database schema optimizations, high-throughput APIs, and security protocols.',
    requiredLanguages: ['Java', 'SQL', 'Python'],
    requiredSkills: ['Spring Boot', 'PostgreSQL', 'REST APIs', 'Docker', 'Git & GitHub'],
    recommendedSkills: ['Redis', 'Microservices', 'Kubernetes', 'Linux'],
    averageSalary: '$100,000 - $140,000',
    growthRate: '+19% (Next 5 Years)',
  },
  {
    id: 'frontend-specialist',
    title: 'Frontend Specialist',
    description: 'Crafts accessible, high-performance web applications, design systems, and fluid reactive UI state workflows.',
    requiredLanguages: ['JavaScript', 'TypeScript'],
    requiredSkills: ['React', 'Tailwind CSS', 'Vite', 'Git & GitHub'],
    recommendedSkills: ['Jest / Unit Testing', 'REST APIs', 'GraphQL'],
    averageSalary: '$90,000 - $125,000',
    growthRate: '+18% (Next 5 Years)',
  },
  {
    id: 'cloud-devops-engineer',
    title: 'Cloud & DevOps Engineer',
    description: 'Automates deployment pipelines, cloud infrastructure provisioning, container orchestration, and system resilience.',
    requiredLanguages: ['Python', 'Go'],
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines', 'Linux'],
    recommendedSkills: ['Git & GitHub', 'Redis', 'PostgreSQL'],
    averageSalary: '$110,000 - $155,000',
    growthRate: '+25% (Next 5 Years)',
  },
  {
    id: 'data-engineer',
    title: 'Data Platform Engineer',
    description: 'Builds distributed data pipelines, ETL flows, data lakehouses, and real-time streaming architectures.',
    requiredLanguages: ['Python', 'SQL', 'Java'],
    requiredSkills: ['PostgreSQL', 'Docker', 'Linux', 'REST APIs'],
    recommendedSkills: ['Redis', 'AWS', 'MongoDB'],
    averageSalary: '$105,000 - $145,000',
    growthRate: '+21% (Next 5 Years)',
  },
];

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  id: 'demo-student-01',
  email: 'student@skillora.demo',
  isDemoUser: true,
  onboardingCompleted: true,
  personalDetails: {
    fullName: 'Alex Rivera',
    college: 'Apex Institute of Technology',
    degree: 'B.Tech in Computer Science',
    yearOfStudy: '3rd Year',
  },
  languages: [
    { name: 'TypeScript', proficiency: 'Advanced' },
    { name: 'JavaScript', proficiency: 'Advanced' },
    { name: 'Java', proficiency: 'Intermediate' },
    { name: 'SQL', proficiency: 'Intermediate' },
    { name: 'Python', proficiency: 'Beginner' },
  ],
  technicalSkills: [
    { name: 'React', proficiency: 'Advanced' },
    { name: 'Tailwind CSS', proficiency: 'Advanced' },
    { name: 'Vite', proficiency: 'Advanced' },
    { name: 'Spring Boot', proficiency: 'Intermediate' },
    { name: 'PostgreSQL', proficiency: 'Intermediate' },
    { name: 'Git & GitHub', proficiency: 'Advanced' },
    { name: 'REST APIs', proficiency: 'Advanced' },
    { name: 'Docker', proficiency: 'Beginner' },
  ],
  softSkills: [
    'Problem Solving',
    'Team Collaboration',
    'Communication',
    'Agile / Scrum',
  ],
  careerInterests: [
    'Full-Stack Developer',
    'Backend Engineer',
  ],
  createdAt: '2026-10-24T18:00:00.000Z',
};

