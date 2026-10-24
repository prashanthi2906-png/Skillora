import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Cpu,
  Compass,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_TECHNICAL_SKILLS,
  AVAILABLE_SOFT_SKILLS,
  CAREER_REQUIREMENTS,
} from '../../constants/demoData';
import { LanguageSkill, Proficiency, StudentProfile, TechnicalSkill } from '../../types';

interface OnboardingFlowProps {
  email: string;
  onComplete: (profile: StudentProfile) => void;
  onCancel: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  email,
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Step 1: Personal & Education
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');

  // Step 2: Languages
  const [languages, setLanguages] = useState<LanguageSkill[]>([
    { name: 'JavaScript', proficiency: 'Intermediate' },
    { name: 'TypeScript', proficiency: 'Beginner' },
  ]);

  // Step 3: Technical & Soft Skills
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([
    { name: 'React', proficiency: 'Intermediate' },
    { name: 'Git & GitHub', proficiency: 'Intermediate' },
    { name: 'REST APIs', proficiency: 'Beginner' },
  ]);
  const [customSkillName, setCustomSkillName] = useState('');
  const [softSkills, setSoftSkills] = useState<string[]>([
    'Problem Solving',
    'Team Collaboration',
  ]);

  // Step 4: Career Interests
  const [careerInterests, setCareerInterests] = useState<string[]>([
    'Full-Stack Developer',
  ]);

  // Step Nav validation
  const validateStep = (step: number): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (!fullName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!college.trim()) {
        setValidationError('Please enter your college or university.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (languages.length === 0) {
        setValidationError('Please select at least one programming language.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (technicalSkills.length === 0) {
        setValidationError('Please select at least one technical skill.');
        return false;
      }
      if (softSkills.length === 0) {
        setValidationError('Please select at least one soft skill.');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (careerInterests.length === 0) {
        setValidationError('Please select at least one career interest.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Language management
  const toggleLanguage = (langName: string) => {
    setLanguages((prev) => {
      const exists = prev.some((l) => l.name === langName);
      if (exists) {
        return prev.filter((l) => l.name !== langName);
      }
      return [...prev, { name: langName, proficiency: 'Intermediate' }];
    });
  };

  const updateLanguageProficiency = (langName: string, proficiency: Proficiency) => {
    setLanguages((prev) =>
      prev.map((l) => (l.name === langName ? { ...l, proficiency } : l))
    );
  };

  // Technical skill management
  const toggleTechnicalSkill = (skillName: string) => {
    setTechnicalSkills((prev) => {
      const exists = prev.some((s) => s.name === skillName);
      if (exists) {
        return prev.filter((s) => s.name !== skillName);
      }
      return [...prev, { name: skillName, proficiency: 'Intermediate' }];
    });
  };

  const updateTechnicalProficiency = (skillName: string, proficiency: Proficiency) => {
    setTechnicalSkills((prev) =>
      prev.map((s) => (s.name === skillName ? { ...s, proficiency } : s))
    );
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillName.trim();
    if (!trimmed) return;
    if (technicalSkills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      setCustomSkillName('');
      return;
    }
    setTechnicalSkills((prev) => [
      ...prev,
      { name: trimmed, proficiency: 'Intermediate', isCustom: true },
    ]);
    setCustomSkillName('');
  };

  // Soft skill management
  const toggleSoftSkill = (skill: string) => {
    setSoftSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Career Interest management
  const toggleCareer = (title: string) => {
    setCareerInterests((prev) =>
      prev.includes(title) ? prev.filter((c) => c !== title) : [...prev, title]
    );
  };

  // Finish setup
  const handleFinishSetup = () => {
    const finalProfile: StudentProfile = {
      id: `student-${Date.now()}`,
      email,
      isDemoUser: false,
      onboardingCompleted: true,
      personalDetails: {
        fullName: fullName.trim(),
        college: college.trim(),
        degree,
        yearOfStudy,
      },
      languages,
      technicalSkills,
      softSkills,
      careerInterests,
      createdAt: new Date().toISOString(),
    };

    onComplete(finalProfile);
  };

  const stepsList = [
    { num: 1, title: 'Education', icon: GraduationCap },
    { num: 2, title: 'Languages', icon: Code2 },
    { num: 3, title: 'Skills', icon: Cpu },
    { num: 4, title: 'Careers', icon: Compass },
    { num: 5, title: 'Review', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Header with Exit option */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Student Profile Setup</h1>
              <p className="text-xs text-slate-400">Skillora Onboarding &bull; {email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg border border-slate-800"
          >
            Cancel / Back to Sign In
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-5 gap-2 text-center">
            {stepsList.map((step) => {
              const Icon = step.icon;
              const isCurrent = step.num === currentStep;
              const isDone = step.num < currentStep;

              return (
                <div key={step.num} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isCurrent
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[11px] hidden sm:block ${
                      isCurrent ? 'font-medium text-indigo-300' : isDone ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Validation Banner */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Dynamic Form Step Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* STEP 1: Personal & Education */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  <span>Personal & Academic Details</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tell us about yourself so we can customize your academic pathway recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300">
                    College / University <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Degree / Program
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white"
                  >
                    <option value="B.Tech in Computer Science">B.Tech in Computer Science</option>
                    <option value="B.S. in Software Engineering">B.S. in Software Engineering</option>
                    <option value="B.Tech in Information Technology">B.Tech in Information Technology</option>
                    <option value="B.S. in Data Science">B.S. in Data Science</option>
                    <option value="M.S. in Computer Science">M.S. in Computer Science</option>
                    <option value="Other Engineering / Science">Other Engineering / Science</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Current Year of Study
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Programming Languages */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  <span>Programming Languages & Proficiency</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select the programming languages you know and declare your current proficiency level.
                </p>
              </div>

              {/* Language Selection Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Available Languages (Tap to add/remove)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_LANGUAGES.map((lang) => {
                    const isSelected = languages.some((l) => l.name === lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? `✓ ${lang}` : `+ ${lang}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Languages Proficiency Table */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Selected Languages ({languages.length})
                </label>
                {languages.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    No languages selected yet. Click any language above to declare proficiency.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {languages.map((l) => (
                      <div
                        key={l.name}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <span className="text-sm font-medium text-white">{l.name}</span>
                        <div className="flex items-center gap-1.5">
                          {(['Beginner', 'Intermediate', 'Advanced'] as Proficiency[]).map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => updateLanguageProficiency(l.name, level)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                                l.proficiency === level
                                  ? 'bg-indigo-600/40 border-indigo-500 text-indigo-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Technical & Soft Skills */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <span>Technical & Soft Skills</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Highlight frameworks, databases, developer tooling, and interpersonal strengths.
                </p>
              </div>

              {/* Technical skills selector */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Technical Skills & Frameworks
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TECHNICAL_SKILLS.map((skill) => {
                    const isSelected = technicalSkills.some((s) => s.name === skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleTechnicalSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                      </button>
                    );
                  })}
                </div>

                {/* Custom skill input */}
                <form onSubmit={addCustomSkill} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={customSkillName}
                    onChange={(e) => setCustomSkillName(e.target.value)}
                    placeholder="Add custom skill (e.g. Next.js, Apache Kafka)..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-white rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                {/* Selected Technical Skills Proficiency */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 pt-2">
                  {technicalSkills.map((s) => (
                    <div
                      key={s.name}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{s.name}</span>
                        {s.isCustom && (
                          <span className="text-[10px] bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {(['Beginner', 'Intermediate', 'Advanced'] as Proficiency[]).map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => updateTechnicalProficiency(s.name, level)}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                              s.proficiency === level
                                ? 'bg-indigo-600/40 border-indigo-500 text-indigo-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => toggleTechnicalSkill(s.name)}
                          className="p-1 text-slate-500 hover:text-red-400 ml-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Soft Skills & Strengths
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SOFT_SKILLS.map((skill) => {
                    const isSelected = softSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSoftSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-emerald-600/40 text-emerald-200 border-emerald-500/60'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Career Interests */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  <span>Target Career Interests</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select one or more career directions you aspire towards to guide your recommendations.
                </p>
              </div>

              <div className="space-y-3">
                {CAREER_REQUIREMENTS.map((career) => {
                  const isSelected = careerInterests.includes(career.title);
                  return (
                    <div
                      key={career.id}
                      onClick={() => toggleCareer(career.title)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/30'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white">{career.title}</h3>
                            {isSelected && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{career.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-slate-400">
                            <span className="text-slate-500 font-medium">Core Requirements:</span>
                            {career.requiredSkills.slice(0, 3).map((req) => (
                              <span
                                key={req}
                                className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800 text-slate-300"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // Controlled via parent card click
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700 mt-1"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Profile Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Review Your Profile</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Confirm your entered details before generating your career match analysis.
                </p>
              </div>

              {/* Review Card */}
              <div className="space-y-4 text-xs">
                {/* Personal summary */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Student Identity</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                  <p className="text-base font-bold text-white">{fullName}</p>
                  <p className="text-slate-300">{degree} &bull; {yearOfStudy}</p>
                  <p className="text-slate-400">{college}</p>
                </div>

                {/* Languages */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-slate-400 font-medium block">
                    Languages ({languages.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((l) => (
                      <span
                        key={l.name}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white flex items-center gap-1.5"
                      >
                        <span className="font-medium">{l.name}</span>
                        <span className="text-[10px] text-indigo-400">({l.proficiency})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical & Soft Skills */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div>
                    <span className="text-slate-400 font-medium block mb-1.5">
                      Technical Skills ({technicalSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.map((s) => (
                        <span
                          key={s.name}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white flex items-center gap-1.5"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-[10px] text-indigo-400">({s.proficiency})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 font-medium block mb-1.5">
                      Soft Skills ({softSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {softSkills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-900/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Target Careers */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-slate-400 font-medium block">
                    Target Careers ({careerInterests.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {careerInterests.map((career) => (
                      <span
                        key={career}
                        className="px-3 py-1 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-800/50 font-medium"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishSetup}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Finish Setup & Open Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
