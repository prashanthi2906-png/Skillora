import { StudentProfile } from '../types';

export interface ProfileCompletionCriterion {
  id: string;
  label: string;
  section: 'personal' | 'academic' | 'languages' | 'technical' | 'soft' | 'careers';
  isComplete: boolean;
  hint: string;
}

export interface ProfileCompletionResult {
  percentage: number;
  completedCount: number;
  totalCount: number;
  criteria: ProfileCompletionCriterion[];
  missingCriteria: ProfileCompletionCriterion[];
  completedCriteria: ProfileCompletionCriterion[];
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Calculates deterministic profile completion metrics based on required student dimensions.
 * Evaluates full name, email format, college, degree, academic year, declared languages,
 * technical skills, soft skills, and career interests.
 */
export function calculateProfileCompletion(profile: StudentProfile): ProfileCompletionResult {
  const criteria: ProfileCompletionCriterion[] = [
    {
      id: 'fullName',
      label: 'Full Name',
      section: 'personal',
      isComplete: Boolean(profile.personalDetails?.fullName?.trim().length >= 2),
      hint: 'Add your complete full name',
    },
    {
      id: 'email',
      label: 'Email Address',
      section: 'personal',
      isComplete: Boolean(profile.email?.trim() && EMAIL_REGEX.test(profile.email.trim())),
      hint: 'Enter a valid student email address',
    },
    {
      id: 'college',
      label: 'College or University',
      section: 'academic',
      isComplete: Boolean(profile.personalDetails?.college?.trim().length >= 2),
      hint: 'Specify your current college or university',
    },
    {
      id: 'degree',
      label: 'Degree or Course',
      section: 'academic',
      isComplete: Boolean(profile.personalDetails?.degree?.trim().length >= 2),
      hint: 'Declare your academic degree or enrolled course',
    },
    {
      id: 'yearOfStudy',
      label: 'Academic Year',
      section: 'academic',
      isComplete: Boolean(profile.personalDetails?.yearOfStudy?.trim().length >= 1),
      hint: 'Select your current year of study',
    },
    {
      id: 'languages',
      label: 'Programming Languages',
      section: 'languages',
      isComplete: Array.isArray(profile.languages) && profile.languages.length > 0,
      hint: 'Declare at least one programming language with proficiency',
    },
    {
      id: 'technicalSkills',
      label: 'Technical Skills',
      section: 'technical',
      isComplete: Array.isArray(profile.technicalSkills) && profile.technicalSkills.length > 0,
      hint: 'Add at least one framework, tool, or database skill',
    },
    {
      id: 'softSkills',
      label: 'Soft Skills',
      section: 'soft',
      isComplete: Array.isArray(profile.softSkills) && profile.softSkills.length > 0,
      hint: 'List at least one interpersonal or workflow competency',
    },
    {
      id: 'careerInterests',
      label: 'Career Interests',
      section: 'careers',
      isComplete: Array.isArray(profile.careerInterests) && profile.careerInterests.length > 0,
      hint: 'Select at least one target career aspiration',
    },
  ];

  const totalCount = criteria.length;
  const completedCriteria = criteria.filter((c) => c.isComplete);
  const missingCriteria = criteria.filter((c) => !c.isComplete);
  const completedCount = completedCriteria.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return {
    percentage,
    completedCount,
    totalCount,
    criteria,
    missingCriteria,
    completedCriteria,
  };
}

