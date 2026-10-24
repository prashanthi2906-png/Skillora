export type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LanguageSkill {
  name: string;
  proficiency: Proficiency;
}

export interface TechnicalSkill {
  name: string;
  proficiency: Proficiency;
  isCustom?: boolean;
}

export interface CareerRequirement {
  id: string;
  title: string;
  description: string;
  requiredLanguages: string[];
  requiredSkills: string[];
  recommendedSkills: string[];
  averageSalary?: string;
  growthRate?: string;
}

export interface CareerMatchResult {
  career: CareerRequirement;
  matchPercentage: number;
  matchedLanguages: string[];
  matchedSkills: string[];
  missingSkills: string[];
  readinessLevel: 'High' | 'Moderate' | 'Developing';
}

export interface StudentProfile {
  id: string;
  email: string;
  isDemoUser: boolean;
  onboardingCompleted: boolean;
  personalDetails: {
    fullName: string;
    college: string;
    degree: string;
    yearOfStudy: string;
  };
  languages: LanguageSkill[];
  technicalSkills: TechnicalSkill[];
  softSkills: string[];
  careerInterests: string[];
  createdAt: string;
}

export type ActiveTab = 'dashboard' | 'profile' | 'skill-gap' | 'roadmap' | 'progress';

export type RoadmapItemStatus = 'Not Started' | 'In Progress' | 'Completed';
export type RoadmapPriority = 'High' | 'Medium' | 'Low';
export type RoadmapStage = 'Foundations' | 'Core Skills' | 'Practical Projects' | 'Career Preparation';

export interface LearningResource {
  title: string;
  url?: string;
  type: 'Documentation' | 'Guide' | 'Tutorial' | 'Search';
  searchQuery?: string;
}

export interface RoadmapItem {
  id: string;
  skill: string;
  title: string;
  stage: RoadmapStage;
  category?: 'Foundation' | 'Core' | 'Advanced' | 'Project';
  description: string;
  whyItMatters: string;
  priority: RoadmapPriority;
  estimatedDuration: string;
  estimatedWeeks?: number;
  skillsCovered: string[];
  status: RoadmapItemStatus;
  resources: LearningResource[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  category: 'Foundation' | 'Core' | 'Advanced' | 'Project';
  description: string;
  estimatedWeeks: number;
  skillsCovered: string[];
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

