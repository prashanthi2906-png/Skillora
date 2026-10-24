import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  Clock,
  CheckCircle2,
  Play,
  RotateCcw,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  Check,
  BookOpen,
} from 'lucide-react';
import {
  CareerMatchResult,
  RoadmapItemStatus,
  RoadmapPriority,
  RoadmapStage,
  StudentProfile,
} from '../../types';
import { StorageService } from '../../utils/storage';
import { generatePersonalizedRoadmap } from '../../utils/roadmapEngine';

interface LearningRoadmapViewProps {
  profile: StudentProfile;
  topMatch: CareerMatchResult;
  careerMatches?: CareerMatchResult[];
}

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({
  profile,
  topMatch,
  careerMatches = [],
}) => {
  // Available career matches fallback to topMatch if empty
  const allMatches = careerMatches.length > 0 ? careerMatches : [topMatch];

  // Active target career ID
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    topMatch?.career.id || allMatches[0]?.career.id || ''
  );

  // Active match object
  const currentMatch = useMemo(() => {
    return allMatches.find((m) => m.career.id === selectedCareerId) || topMatch || allMatches[0];
  }, [allMatches, selectedCareerId, topMatch]);

  // Saved statuses loaded from storage for the active student & career
  const [statuses, setStatuses] = useState<Record<string, RoadmapItemStatus>>(() => {
    return StorageService.getRoadmapProgress(profile.email, currentMatch.career.id);
  });

  // Reload saved statuses whenever student email or selected career changes
  useEffect(() => {
    const loaded = StorageService.getRoadmapProgress(profile.email, currentMatch.career.id);
    setStatuses(loaded);
  }, [profile.email, currentMatch.career.id]);

  // Generate personalized roadmap items using current profile, gaps, and saved statuses
  const roadmapItems = useMemo(() => {
    return generatePersonalizedRoadmap(profile, currentMatch, statuses);
  }, [profile, currentMatch, statuses]);

  // Filters state
  const [statusFilter, setStatusFilter] = useState<'All' | RoadmapItemStatus>('All');
  const [stageFilter, setStageFilter] = useState<'All' | RoadmapStage>('All');

  // Status transition handler
  const handleUpdateStatus = (itemId: string, newStatus: RoadmapItemStatus) => {
    const updated = {
      ...statuses,
      [itemId]: newStatus,
    };
    setStatuses(updated);
    StorageService.saveRoadmapItemStatus(profile.email, currentMatch.career.id, itemId, newStatus);
  };

  // Metrics calculation
  const totalCount = roadmapItems.length;
  const completedCount = roadmapItems.filter((i) => i.status === 'Completed').length;
  const inProgressCount = roadmapItems.filter((i) => i.status === 'In Progress').length;
  const remainingCount = roadmapItems.filter((i) => i.status === 'Not Started').length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtered items
  const filteredItems = useMemo(() => {
    return roadmapItems.filter((item) => {
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchStage = stageFilter === 'All' || item.stage === stageFilter;
      return matchStatus && matchStage;
    });
  }, [roadmapItems, statusFilter, stageFilter]);

  // Stages group definition
  const stages: { stage: RoadmapStage; description: string }[] = [
    {
      stage: 'Foundations',
      description: 'Foundational language competencies, clean code patterns, and syntax conventions',
    },
    {
      stage: 'Core Skills',
      description: 'Critical missing frameworks, databases, and architectural gaps for this role',
    },
    {
      stage: 'Practical Projects',
      description: 'End-to-end production-grade portfolio showcase integrating acquired skills',
    },
    {
      stage: 'Career Preparation',
      description: 'System design trade-offs, architecture reviews, and technical interview readiness',
    },
  ];

  const getPriorityBadgeClass = (priority: RoadmapPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Medium':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Low':
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. Header & Target Career Selector */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Personalized Learning Roadmap</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curated Roadmap for {currentMatch.career.title}
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Targeting your actual skill gaps ({currentMatch.missingSkills.length > 0 ? currentMatch.missingSkills.slice(0, 4).join(', ') : 'Ready for Advanced Mastery'}) with structured milestones and verified learning documentation.
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center shrink-0 min-w-[140px]">
            <span className="text-2xl font-extrabold text-indigo-400">
              {currentMatch.matchPercentage}%
            </span>
            <span className="block text-[10px] text-slate-400 font-medium">
              Career Readiness
            </span>
          </div>
        </div>

        {/* Career Target Switcher Pills */}
        {allMatches.length > 1 && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Switch Target Career Pathway:
            </span>
            <div className="flex flex-wrap gap-2">
              {allMatches.map((m) => {
                const isSelected = m.career.id === currentMatch.career.id;
                return (
                  <button
                    key={m.career.id}
                    type="button"
                    onClick={() => setSelectedCareerId(m.career.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{m.career.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isSelected
                          ? 'bg-indigo-700 text-indigo-100'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {m.matchPercentage}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Interactive Roadmap Progress Meter & Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Progress Bar Card */}
        <div className="md:col-span-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Roadmap Completion Status
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-extrabold ${
                  completionPercentage === 100
                    ? 'text-emerald-400'
                    : completionPercentage >= 50
                    ? 'text-indigo-400'
                    : 'text-amber-400'
                }`}
              >
                {completionPercentage}% Complete
              </span>
              <span className="text-xs text-slate-400">
                ({completedCount} of {totalCount} Milestones)
              </span>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                completionPercentage === 100
                  ? 'bg-emerald-500'
                  : completionPercentage >= 50
                  ? 'bg-indigo-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Detailed Metric Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[11px] text-slate-400 font-medium">Completed</span>
              <span className="text-base font-bold text-emerald-400">{completedCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[11px] text-slate-400 font-medium">In Progress</span>
              <span className="text-base font-bold text-indigo-400">{inProgressCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[11px] text-slate-400 font-medium">Not Started</span>
              <span className="text-base font-bold text-slate-400">{remainingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Controls */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1">Status:</span>
          {(['All', 'Not Started', 'In Progress', 'Completed'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg font-medium border transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {st} {st === 'All' ? `(${totalCount})` : st === 'Completed' ? `(${completedCount})` : st === 'In Progress' ? `(${inProgressCount})` : `(${remainingCount})`}
            </button>
          ))}
        </div>

        {/* Stage Filters */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Stage:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as 'All' | RoadmapStage)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Stages</option>
            <option value="Foundations">Foundations</option>
            <option value="Core Skills">Core Skills</option>
            <option value="Practical Projects">Practical Projects</option>
            <option value="Career Preparation">Career Preparation</option>
          </select>
        </div>
      </div>

      {/* 4. Milestone Stages & Item Cards */}
      {filteredItems.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <Layers className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No roadmap items match the selected filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try switching your status or stage filter above to view your tailored milestones.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatusFilter('All');
              setStageFilter('All');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium border border-slate-700 mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {stages
            .filter((st) => stageFilter === 'All' || stageFilter === st.stage)
            .map((stDef) => {
              const stageItems = filteredItems.filter((item) => item.stage === stDef.stage);
              if (stageItems.length === 0) return null;

              return (
                <div key={stDef.stage} className="space-y-3">
                  {/* Stage Header Banner */}
                  <div className="flex items-center justify-between pb-1">
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span>{stDef.stage}</span>
                        <span className="text-[11px] font-normal text-slate-400 lowercase">
                          ({stageItems.length} milestone{stageItems.length > 1 ? 's' : ''})
                        </span>
                      </h2>
                      <p className="text-[11px] text-slate-400">{stDef.description}</p>
                    </div>
                  </div>

                  {/* Stage Items Grid */}
                  <div className="space-y-3">
                    {stageItems.map((item) => {
                      const isCompleted = item.status === 'Completed';
                      const isInProgress = item.status === 'In Progress';
                      const isNotStarted = item.status === 'Not Started';

                      return (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            isCompleted
                              ? 'bg-slate-900/90 border-emerald-900/50 shadow-md shadow-emerald-950/20'
                              : isInProgress
                              ? 'bg-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {/* Card Header Row */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950 text-indigo-300 border border-slate-800">
                                  {item.skill}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getPriorityBadgeClass(
                                    item.priority
                                  )}`}
                                >
                                  {item.priority} Priority
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  <span>{item.estimatedDuration}</span>
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-white">{item.title}</h3>
                            </div>

                            {/* Status Actions */}
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              {isNotStarted && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStatus(item.id, 'In Progress')}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                                >
                                  <Play className="w-3 h-3" />
                                  <span>Start Milestone</span>
                                </button>
                              )}

                              {isInProgress && (
                                <>
                                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                    <span>In Progress</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateStatus(item.id, 'Completed')}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Mark Completed</span>
                                  </button>
                                </>
                              )}

                              {isCompleted && (
                                <>
                                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Completed</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateStatus(item.id, 'In Progress')}
                                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors"
                                    title="Reopen milestone"
                                  >
                                    <RotateCcw className="w-3 h-3 text-slate-400" />
                                    <span>Reopen</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="pt-3 space-y-3 text-xs">
                            <p className="text-slate-300 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Why it Matters Callout */}
                            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block">
                                Why this matters for {currentMatch.career.title}:
                              </span>
                              <p className="text-slate-300 leading-relaxed">
                                {item.whyItMatters}
                              </p>
                            </div>

                            {/* Learning Resources */}
                            {item.resources && item.resources.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>Verified Learning Resources:</span>
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {item.resources.map((res, rIdx) => {
                                    if (res.url) {
                                      return (
                                        <a
                                          key={rIdx}
                                          href={res.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-600/50 text-indigo-300 text-xs font-medium transition-colors"
                                        >
                                          <span>{res.title}</span>
                                          <ExternalLink className="w-3 h-3 text-indigo-400 shrink-0" />
                                        </a>
                                      );
                                    }
                                    return (
                                      <span
                                        key={rIdx}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                                      >
                                        <Search className="w-3 h-3 text-slate-400 shrink-0" />
                                        <span>Suggested Search: <code className="text-indigo-300 font-mono text-[11px]">{res.searchQuery}</code></span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
