import React from 'react';
import { ActiveTab, StudentProfile } from '../../types';

interface HeaderProps {
  activeTab: ActiveTab;
  profile: StudentProfile;
}

const TAB_TITLES: Record<ActiveTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Career Matching Dashboard',
    subtitle: 'Transparent, rule-based job alignment & readiness analytics',
  },
  profile: {
    title: 'Student Academic Profile',
    subtitle: 'Your verified education, declared languages, and skill proficiencies',
  },
  'skill-gap': {
    title: 'Skill Gap Analysis',
    subtitle: 'Evaluate missing proficiencies required for your target career paths',
  },
  roadmap: {
    title: 'Curated Learning Roadmap',
    subtitle: 'Step-by-step milestones to close your specific skill gaps',
  },
  progress: {
    title: 'Academic & Career Progress',
    subtitle: 'Track your competency milestones and learning velocity',
  },
};

export const Header: React.FC<HeaderProps> = ({ activeTab, profile }) => {
  const current = TAB_TITLES[activeTab];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-10">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <span>{current.title}</span>
        </h2>
        <p className="text-[11px] text-slate-400 hidden sm:block">
          {current.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-slate-300 font-medium text-[11px]">
            {profile.isDemoUser ? 'Demo Account' : 'Registered Student'}
          </span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-semibold text-xs">
            {profile.personalDetails.fullName.charAt(0) || 'S'}
          </div>
        </div>
      </div>
    </header>
  );
};
