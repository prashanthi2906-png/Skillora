import React from 'react';
import {
  Compass,
  Clock,
} from 'lucide-react';
import { CareerMatchResult, StudentProfile } from '../../types';
import { generateLearningRoadmap } from '../../utils/matchingEngine';

interface LearningRoadmapViewProps {
  profile: StudentProfile;
  topMatch: CareerMatchResult;
}

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({
  profile,
  topMatch,
}) => {
  const steps = generateLearningRoadmap(profile, topMatch);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400">
          <Compass className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Tailored Pathway
          </span>
        </div>
        <h1 className="text-xl font-bold text-white">
          Learning Roadmap for {topMatch.career.title}
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          This roadmap prioritizes closing your highest-impact skill gaps ({topMatch.missingSkills.slice(0, 3).join(', ')}) through structured practical milestones.
        </p>
      </div>

      {/* Sequential Milestone Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isDone = step.status === 'Completed';
          const isInProgress = step.status === 'In Progress';

          return (
            <div
              key={step.id}
              className={`p-6 rounded-2xl border transition-all ${
                isInProgress
                  ? 'bg-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {step.category} Milestone
                    </span>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {step.status}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{step.estimatedWeeks}w</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium mr-1">
                    Skills Covered:
                  </span>
                  {step.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-slate-950 rounded-md border border-slate-800 text-[11px] text-indigo-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
