import React from 'react';
import {
  Sparkles,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Compass,
  Zap,
  Info,
} from 'lucide-react';
import { ActiveTab, CareerMatchResult, StudentProfile } from '../../types';

interface DashboardOverviewProps {
  profile: StudentProfile;
  careerMatches: CareerMatchResult[];
  onNavigateTab: (tab: ActiveTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  profile,
  careerMatches,
  onNavigateTab,
}) => {
  const topMatch = careerMatches[0];
  const primaryCareer = topMatch?.career;

  return (
    <div className="space-y-6">
      {/* 1. Student Welcome Message & Context */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/40 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Readiness Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {profile.personalDetails.fullName}! 👋
          </h1>
          <p className="text-sm text-slate-300">
            {profile.personalDetails.degree} &bull; {profile.personalDetails.yearOfStudy}
          </p>
          <p className="text-xs text-slate-400">
            {profile.personalDetails.college}
          </p>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Transparent rule-based disclaimer banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-slate-200">
            Transparent Rule-Based Recommendation Engine
          </p>
          <p className="text-slate-400 leading-relaxed">
            All career match percentages and recommendations are calculated strictly using deterministic rules matching your declared programming languages, frameworks, and proficiency ratings. Skillora does not rely on opaque AI models.
          </p>
        </div>
      </div>

      {/* 2. Top Career Match Highlight & Key Metrics */}
      {topMatch && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Top Match Card */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Top Matching Career
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  topMatch.readinessLevel === 'High'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {topMatch.readinessLevel} Readiness
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">{primaryCareer.title}</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {primaryCareer.description}
                </p>
              </div>

              {/* Match Percentage Badge */}
              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-center shrink-0">
                <span className="text-3xl font-extrabold text-indigo-300">
                  {topMatch.matchPercentage}%
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">
                  Skill Match
                </span>
              </div>
            </div>

            {/* Matched vs Missing highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="space-y-1.5">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Strengths Matched ({topMatch.matchedSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {topMatch.matchedSkills.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Key Skills to Acquire ({topMatch.missingSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {topMatch.missingSkills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-900/50 text-amber-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action / Next Steps Widget */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/50 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Zap className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Recommended Next Step
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                To reach 90%+ readiness for <strong>{primaryCareer.title}</strong>, focus on closing the highest-impact gaps:
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Milestone 1: {topMatch.missingSkills[0] || 'Advanced Architecture'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Milestone 2: {topMatch.missingSkills[1] || 'Containerization & CI'}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('roadmap')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all mt-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Learning Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Recommended Careers & Sample Match Percentages */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Recommended Career Pathways</span>
          </h2>
          <button
            type="button"
            onClick={() => onNavigateTab('skill-gap')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <span>Full Gap Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerMatches.map((item) => (
            <div
              key={item.career.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{item.career.title}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      item.matchPercentage >= 75
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.matchPercentage >= 50
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.matchPercentage}%
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.career.description}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.matchPercentage >= 75
                        ? 'bg-emerald-500'
                        : item.matchPercentage >= 50
                        ? 'bg-indigo-500'
                        : 'bg-slate-600'
                    }`}
                    style={{ width: `${item.matchPercentage}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Avg Salary:</span>
                  <span className="font-medium text-slate-200">{item.career.averageSalary}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('skill-gap')}
                  className="w-full py-1.5 text-center text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:bg-slate-800/80 rounded-lg transition-colors"
                >
                  View Gap Breakdown &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
