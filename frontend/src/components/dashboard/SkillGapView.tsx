import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { CareerMatchResult, StudentProfile } from '../../types';

interface SkillGapViewProps {
  careerMatches: CareerMatchResult[];
  profile: StudentProfile;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  careerMatches,
  profile,
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    careerMatches[0]?.career.id || ''
  );

  const activeMatch =
    careerMatches.find((m) => m.career.id === selectedCareerId) || careerMatches[0];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              Skill Gap & Readiness Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              Evaluated against industry baseline expectations for tech roles
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-slate-400 hidden sm:block">
          <span>Declared Skills: </span>
          <strong className="text-white">
            {profile.languages.length + profile.technicalSkills.length} Total
          </strong>
        </div>
      </div>

      {/* Career Selection Pills */}
      <div className="flex flex-wrap gap-2">
        {careerMatches.map((item) => (
          <button
            key={item.career.id}
            type="button"
            onClick={() => setSelectedCareerId(item.career.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
              item.career.id === activeMatch?.career.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{item.career.title}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                item.career.id === activeMatch?.career.id
                  ? 'bg-indigo-700 text-indigo-100'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {item.matchPercentage}%
            </span>
          </button>
        ))}
      </div>

      {/* Selected Career Analysis Detail */}
      {activeMatch && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Career Target Analysis
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {activeMatch.career.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {activeMatch.career.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
                <span className="text-2xl font-extrabold text-indigo-400">
                  {activeMatch.matchPercentage}%
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">
                  Match Readiness
                </span>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Acquired / Matched Skills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acquired Competencies ({activeMatch.matchedSkills.length})</span>
                </h4>
              </div>

              {activeMatch.matchedSkills.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 rounded-xl bg-slate-950 border border-slate-800">
                  No direct skill matches found for this career path yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {activeMatch.matchedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-semibold text-white">{skill}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-900/50">
                        Acquired
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Missing Skills (The Gap) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Gaps to Close ({activeMatch.missingSkills.length})</span>
                </h4>
              </div>

              {activeMatch.missingSkills.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs text-emerald-200">
                  🎉 Congratulations! You have covered all primary requirements for this career!
                </div>
              ) : (
                <div className="space-y-2">
                  {activeMatch.missingSkills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="font-semibold text-slate-200">{skill}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-900/50 font-medium">
                        Skill Gap
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
