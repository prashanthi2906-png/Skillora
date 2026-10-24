import React from 'react';
import { Award, TrendingUp, Target, Flame } from 'lucide-react';
import { CareerMatchResult, StudentProfile } from '../../types';

interface ProgressViewProps {
  profile: StudentProfile;
  topMatch: CareerMatchResult;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  profile,
  topMatch,
}) => {
  const totalSkills = profile.languages.length + profile.technicalSkills.length;
  const advancedCount =
    profile.languages.filter((l) => l.proficiency === 'Advanced').length +
    profile.technicalSkills.filter((s) => s.proficiency === 'Advanced').length;

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-indigo-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Skills</span>
            <Target className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalSkills}</p>
          <span className="text-[11px] text-slate-400 block">Declared in Profile</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Advanced Level</span>
            <Award className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{advancedCount}</p>
          <span className="text-[11px] text-slate-400 block">Mastery Competencies</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Match Score</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">{topMatch.matchPercentage}%</p>
          <span className="text-[11px] text-slate-400 block">{topMatch.career.title}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-violet-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-violet-400">Active</p>
          <span className="text-[11px] text-slate-400 block">Career Prep In Progress</span>
        </div>
      </div>

      {/* Progress Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>Competency Distribution</span>
        </h2>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>{topMatch.career.title} Overall Readiness</span>
              <span className="font-bold text-indigo-400">{topMatch.matchPercentage}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${topMatch.matchPercentage}%` }}
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Next Target Milestone: Close gap on {topMatch.missingSkills[0] || 'Cloud Deployment'}</span>
            <span className="text-emerald-400 font-semibold">+8% Estimated Boost</span>
          </div>
        </div>
      </div>
    </div>
  );
};
