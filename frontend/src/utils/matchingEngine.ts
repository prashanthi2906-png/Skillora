import { CareerMatchResult, CareerRequirement, RoadmapStep, StudentProfile } from '../types';
import { CAREER_REQUIREMENTS } from '../constants/demoData';

const PROFICIENCY_WEIGHT: Record<string, number> = {
  Beginner: 0.5,
  Intermediate: 0.8,
  Advanced: 1.0,
};

/**
 * Transparent rule-based career match calculator.
 * Evaluates overlapping languages and technical skills with proficiency weighting.
 * Explicitly deterministic - does NOT use an external AI/ML blackbox.
 */
export function calculateCareerMatches(profile: StudentProfile): CareerMatchResult[] {
  const studentLanguages = new Map(profile.languages.map((l) => [l.name.toLowerCase(), l.proficiency]));
  const studentSkills = new Map(profile.technicalSkills.map((s) => [s.name.toLowerCase(), s.proficiency]));

  return CAREER_REQUIREMENTS.map((career: CareerRequirement) => {
    let langScore = 0;
    const matchedLanguages: string[] = [];

    career.requiredLanguages.forEach((lang) => {
      const prof = studentLanguages.get(lang.toLowerCase());
      if (prof) {
        matchedLanguages.push(lang);
        langScore += PROFICIENCY_WEIGHT[prof] || 0.6;
      }
    });

    const langPercentage = career.requiredLanguages.length > 0
      ? (langScore / career.requiredLanguages.length) * 35
      : 35;

    let reqSkillScore = 0;
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    career.requiredSkills.forEach((skill) => {
      const prof = studentSkills.get(skill.toLowerCase());
      if (prof) {
        matchedSkills.push(skill);
        reqSkillScore += PROFICIENCY_WEIGHT[prof] || 0.6;
      } else {
        missingSkills.push(skill);
      }
    });

    const reqSkillPercentage = career.requiredSkills.length > 0
      ? (reqSkillScore / career.requiredSkills.length) * 50
      : 50;

    let recSkillScore = 0;
    career.recommendedSkills.forEach((skill) => {
      const prof = studentSkills.get(skill.toLowerCase());
      if (prof) {
        matchedSkills.push(skill);
        recSkillScore += (PROFICIENCY_WEIGHT[prof] || 0.6) * 0.5;
      } else if (!missingSkills.includes(skill)) {
        missingSkills.push(skill);
      }
    });

    const recSkillPercentage = career.recommendedSkills.length > 0
      ? Math.min(15, (recSkillScore / career.recommendedSkills.length) * 15)
      : 15;

    // Bonus if student explicitly selected this career as an interest
    const interestBonus = profile.careerInterests.some(
      (interest) => interest.toLowerCase() === career.title.toLowerCase()
    ) ? 5 : 0;

    const rawMatch = Math.round(langPercentage + reqSkillPercentage + recSkillPercentage + interestBonus);
    const matchPercentage = Math.min(98, Math.max(20, rawMatch));

    let readinessLevel: 'High' | 'Moderate' | 'Developing' = 'Developing';
    if (matchPercentage >= 75) {
      readinessLevel = 'High';
    } else if (matchPercentage >= 50) {
      readinessLevel = 'Moderate';
    }

    return {
      career,
      matchPercentage,
      matchedLanguages,
      matchedSkills: Array.from(new Set(matchedSkills)),
      missingSkills,
      readinessLevel,
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

/**
 * Generates transparent roadmap steps tailored to missing skills and chosen targets.
 */
export function generateLearningRoadmap(profile: StudentProfile, topMatch: CareerMatchResult): RoadmapStep[] {
  const missing = topMatch.missingSkills;

  const steps: RoadmapStep[] = [
    {
      id: 'step-1',
      title: 'Foundation & Core Alignment',
      category: 'Foundation',
      description: `Solidify your foundational proficiencies in ${profile.languages.slice(0, 2).map((l) => l.name).join(' & ')} with clean architecture patterns and unit testing.`,
      estimatedWeeks: 2,
      skillsCovered: profile.languages.slice(0, 2).map((l) => l.name),
      status: 'Completed',
    },
    {
      id: 'step-2',
      title: `Skill Gap Focus: ${missing[0] || 'Advanced Frameworks'}`,
      category: 'Core',
      description: `Target high-priority skill gap required for ${topMatch.career.title}: master core concepts, practical hands-on examples, and production patterns.`,
      estimatedWeeks: 3,
      skillsCovered: [missing[0] || 'API Architecture', missing[1] || 'Testing'].filter(Boolean),
      status: 'In Progress',
    },
    {
      id: 'step-3',
      title: `Deployment & Infrastructure (${missing[2] || 'Cloud & Containers'})`,
      category: 'Advanced',
      description: `Integrate containerization, continuous integration, and secure environment configurations into your stack.`,
      estimatedWeeks: 4,
      skillsCovered: [missing[2] || 'Docker', missing[3] || 'PostgreSQL'].filter(Boolean),
      status: 'Upcoming',
    },
    {
      id: 'step-4',
      title: 'Full Capstone & Portfolio Deployment',
      category: 'Project',
      description: `Build and showcase a production-grade project matching the real-world job criteria for ${topMatch.career.title}.`,
      estimatedWeeks: 4,
      skillsCovered: [topMatch.career.title, 'System Design', 'Code Review'],
      status: 'Upcoming',
    },
  ];

  return steps;
}
