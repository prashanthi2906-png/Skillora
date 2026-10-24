import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Code2,
  Cpu,
  Compass,
  Calendar,
  Building,
  Award,
  Mail,
  User,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { LanguageSkill, Proficiency, StudentProfile, TechnicalSkill } from '../../types';
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_TECHNICAL_SKILLS,
  AVAILABLE_SOFT_SKILLS,
  CAREER_INTEREST_SUGGESTIONS,
} from '../../constants/demoData';
import { StorageService } from '../../utils/storage';
import { calculateProfileCompletion, EMAIL_REGEX } from '../../utils/profileCompletion';

interface MyProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile?: (updatedProfile: StudentProfile, previousEmail?: string) => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  profile: initialProfile,
  onUpdateProfile,
}) => {
  const [localProfile, setLocalProfile] = useState<StudentProfile>(initialProfile);

  // Sync if parent profile prop changes externally
  useEffect(() => {
    setLocalProfile(initialProfile);
  }, [initialProfile]);

  // Personal and Academic Editing State
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    fullName: initialProfile.personalDetails?.fullName || '',
    email: initialProfile.email || '',
    college: initialProfile.personalDetails?.college || '',
    degree: initialProfile.personalDetails?.degree || '',
    yearOfStudy: initialProfile.personalDetails?.yearOfStudy || '',
  });
  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});

  // Notification feedback
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Profile completion checklist toggle
  const [showChecklist, setShowChecklist] = useState(false);

  // Programming Language Form State
  const [newLangName, setNewLangName] = useState('');
  const [newLangProficiency, setNewLangProficiency] = useState<Proficiency>('Intermediate');
  const [langError, setLangError] = useState<string | null>(null);

  // Technical Skill Form State
  const [newTechName, setNewTechName] = useState('');
  const [newTechProficiency, setNewTechProficiency] = useState<Proficiency>('Intermediate');
  const [techError, setTechError] = useState<string | null>(null);

  // Soft Skill Form State
  const [newSoftName, setNewSoftName] = useState('');
  const [softError, setSoftError] = useState<string | null>(null);

  // Career Interest Form State
  const [newCareerName, setNewCareerName] = useState('');
  const [careerError, setCareerError] = useState<string | null>(null);

  // Calculate real-time completion status
  const completion = calculateProfileCompletion(localProfile);

  // Helper to trigger save, persistence, and optional parent notification
  const persistChanges = (
    updated: StudentProfile,
    previousEmail?: string,
    successMessage?: string
  ) => {
    try {
      setLocalProfile(updated);
      StorageService.saveCurrentProfile(updated, previousEmail);
      if (onUpdateProfile) {
        onUpdateProfile(updated, previousEmail);
      }
      if (successMessage) {
        setFeedback({ type: 'success', message: successMessage });
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Failed to persist profile changes. Please try again.',
      });
    }
  };

  // Start editing personal info
  const handleStartEditPersonal = () => {
    setPersonalForm({
      fullName: localProfile.personalDetails?.fullName || '',
      email: localProfile.email || '',
      college: localProfile.personalDetails?.college || '',
      degree: localProfile.personalDetails?.degree || '',
      yearOfStudy: localProfile.personalDetails?.yearOfStudy || '',
    });
    setPersonalErrors({});
    setIsEditingPersonal(true);
  };

  // Cancel editing personal info
  const handleCancelEditPersonal = () => {
    setPersonalErrors({});
    setIsEditingPersonal(false);
  };

  // Validate and save personal and academic info
  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const trimmedName = personalForm.fullName.trim();
    if (!trimmedName) {
      errors.fullName = 'Full name is required.';
    } else if (trimmedName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    } else if (trimmedName.length > 80) {
      errors.fullName = 'Full name cannot exceed 80 characters.';
    }

    const trimmedEmail = personalForm.email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = 'Please provide a valid email format (e.g., student@university.edu).';
    } else if (trimmedEmail.length > 100) {
      errors.email = 'Email address cannot exceed 100 characters.';
    }

    const trimmedCollege = personalForm.college.trim();
    if (!trimmedCollege) {
      errors.college = 'College or university is required.';
    } else if (trimmedCollege.length < 2) {
      errors.college = 'College name must be at least 2 characters.';
    } else if (trimmedCollege.length > 120) {
      errors.college = 'College name cannot exceed 120 characters.';
    }

    const trimmedDegree = personalForm.degree.trim();
    if (!trimmedDegree) {
      errors.degree = 'Degree or course is required.';
    } else if (trimmedDegree.length < 2) {
      errors.degree = 'Degree name must be at least 2 characters.';
    } else if (trimmedDegree.length > 100) {
      errors.degree = 'Degree name cannot exceed 100 characters.';
    }

    const trimmedYear = personalForm.yearOfStudy.trim();
    if (!trimmedYear) {
      errors.yearOfStudy = 'Please select or enter your academic year.';
    }

    if (Object.keys(errors).length > 0) {
      setPersonalErrors(errors);
      setFeedback({
        type: 'error',
        message: 'Please resolve the highlighted validation errors before saving.',
      });
      return;
    }

    const previousEmail = localProfile.email;
    const updatedProfile: StudentProfile = {
      ...localProfile,
      email: trimmedEmail,
      personalDetails: {
        fullName: trimmedName,
        college: trimmedCollege,
        degree: trimmedDegree,
        yearOfStudy: trimmedYear,
      },
    };

    setIsEditingPersonal(false);
    setPersonalErrors({});
    persistChanges(
      updatedProfile,
      previousEmail !== trimmedEmail ? previousEmail : undefined,
      'Personal and academic details saved successfully!'
    );
  };

  // --- PROGRAMMING LANGUAGES ---
  const handleAddLanguage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLangError(null);

    const trimmed = newLangName.trim();
    if (!trimmed) {
      setLangError('Please enter or select a programming language name.');
      return;
    }

    if (trimmed.length > 40) {
      setLangError('Language name cannot exceed 40 characters.');
      return;
    }

    const exists = localProfile.languages.some(
      (l) => l.name.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setLangError(`"${trimmed}" is already declared in your languages.`);
      return;
    }

    const updatedLanguages: LanguageSkill[] = [
      ...localProfile.languages,
      { name: trimmed, proficiency: newLangProficiency },
    ];

    const updatedProfile: StudentProfile = {
      ...localProfile,
      languages: updatedLanguages,
    };

    setNewLangName('');
    persistChanges(updatedProfile, undefined, `Added ${trimmed} (${newLangProficiency}) to languages!`);
  };

  const handleUpdateLanguageProficiency = (langName: string, proficiency: Proficiency) => {
    const updatedLanguages = localProfile.languages.map((l) =>
      l.name.toLowerCase() === langName.toLowerCase() ? { ...l, proficiency } : l
    );
    const updatedProfile: StudentProfile = {
      ...localProfile,
      languages: updatedLanguages,
    };
    persistChanges(updatedProfile, undefined, `Updated ${langName} proficiency to ${proficiency}.`);
  };

  const handleRemoveLanguage = (langName: string) => {
    const updatedLanguages = localProfile.languages.filter(
      (l) => l.name.toLowerCase() !== langName.toLowerCase()
    );
    const updatedProfile: StudentProfile = {
      ...localProfile,
      languages: updatedLanguages,
    };
    persistChanges(updatedProfile, undefined, `Removed ${langName} from your languages.`);
  };

  // --- TECHNICAL SKILLS ---
  const handleAddTechnicalSkill = (nameToAdd?: string) => {
    setTechError(null);
    const candidateName = (nameToAdd || newTechName).trim();

    if (!candidateName) {
      setTechError('Please enter or select a technical skill.');
      return;
    }

    if (candidateName.length > 50) {
      setTechError('Skill name cannot exceed 50 characters.');
      return;
    }

    const exists = localProfile.technicalSkills.some(
      (s) => s.name.trim().toLowerCase() === candidateName.toLowerCase()
    );
    if (exists) {
      setTechError(`"${candidateName}" is already listed in your technical skills.`);
      return;
    }

    const updatedSkills: TechnicalSkill[] = [
      ...localProfile.technicalSkills,
      {
        name: candidateName,
        proficiency: newTechProficiency,
        isCustom: !AVAILABLE_TECHNICAL_SKILLS.includes(candidateName),
      },
    ];

    const updatedProfile: StudentProfile = {
      ...localProfile,
      technicalSkills: updatedSkills,
    };

    setNewTechName('');
    persistChanges(
      updatedProfile,
      undefined,
      `Added ${candidateName} (${newTechProficiency}) to technical skills!`
    );
  };

  const handleUpdateTechProficiency = (skillName: string, proficiency: Proficiency) => {
    const updatedSkills = localProfile.technicalSkills.map((s) =>
      s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, proficiency } : s
    );
    const updatedProfile: StudentProfile = {
      ...localProfile,
      technicalSkills: updatedSkills,
    };
    persistChanges(updatedProfile, undefined, `Updated ${skillName} proficiency to ${proficiency}.`);
  };

  const handleRemoveTechnicalSkill = (skillName: string) => {
    const updatedSkills = localProfile.technicalSkills.filter(
      (s) => s.name.toLowerCase() !== skillName.toLowerCase()
    );
    const updatedProfile: StudentProfile = {
      ...localProfile,
      technicalSkills: updatedSkills,
    };
    persistChanges(updatedProfile, undefined, `Removed ${skillName} from technical skills.`);
  };

  // --- SOFT SKILLS ---
  const handleAddSoftSkill = (nameToAdd?: string) => {
    setSoftError(null);
    const candidateName = (nameToAdd || newSoftName).trim();

    if (!candidateName) {
      setSoftError('Please enter or choose a soft skill.');
      return;
    }

    if (candidateName.length > 50) {
      setSoftError('Soft skill cannot exceed 50 characters.');
      return;
    }

    const exists = localProfile.softSkills.some(
      (s) => s.trim().toLowerCase() === candidateName.toLowerCase()
    );
    if (exists) {
      setSoftError(`"${candidateName}" is already declared in your soft skills.`);
      return;
    }

    const updatedSoftSkills = [...localProfile.softSkills, candidateName];
    const updatedProfile: StudentProfile = {
      ...localProfile,
      softSkills: updatedSoftSkills,
    };

    setNewSoftName('');
    persistChanges(updatedProfile, undefined, `Added "${candidateName}" to soft skills!`);
  };

  const handleRemoveSoftSkill = (skillName: string) => {
    const updatedSoftSkills = localProfile.softSkills.filter(
      (s) => s.toLowerCase() !== skillName.toLowerCase()
    );
    const updatedProfile: StudentProfile = {
      ...localProfile,
      softSkills: updatedSoftSkills,
    };
    persistChanges(updatedProfile, undefined, `Removed "${skillName}" from soft skills.`);
  };

  // --- CAREER INTERESTS ---
  const handleAddCareerInterest = (nameToAdd?: string) => {
    setCareerError(null);
    const candidateName = (nameToAdd || newCareerName).trim();

    if (!candidateName) {
      setCareerError('Please choose or enter a career interest.');
      return;
    }

    if (candidateName.length > 60) {
      setCareerError('Career interest name cannot exceed 60 characters.');
      return;
    }

    const exists = localProfile.careerInterests.some(
      (c) => c.trim().toLowerCase() === candidateName.toLowerCase()
    );
    if (exists) {
      setCareerError(`"${candidateName}" is already in your career interests.`);
      return;
    }

    const updatedInterests = [...localProfile.careerInterests, candidateName];
    const updatedProfile: StudentProfile = {
      ...localProfile,
      careerInterests: updatedInterests,
    };

    setNewCareerName('');
    persistChanges(updatedProfile, undefined, `Added "${candidateName}" to target careers!`);
  };

  const handleRemoveCareerInterest = (interestName: string) => {
    const updatedInterests = localProfile.careerInterests.filter(
      (c) => c.toLowerCase() !== interestName.toLowerCase()
    );
    const updatedProfile: StudentProfile = {
      ...localProfile,
      careerInterests: updatedInterests,
    };
    persistChanges(updatedProfile, undefined, `Removed "${interestName}" from target careers.`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast Feedback Alert */}
      {feedback && (
        <div
          role="alert"
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium shadow-lg transition-all animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
              : 'bg-red-950/80 border-red-800 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. PROFILE OVERVIEW & COMPLETION BANNER */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-indigo-600/30 shrink-0">
              {localProfile.personalDetails?.fullName?.charAt(0) || 'S'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {localProfile.personalDetails?.fullName || 'Unnamed Student'}
                </h1>
                {localProfile.isDemoUser ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Demo Account
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Registered Student
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{localProfile.email}</span>
              </p>
            </div>
          </div>

          {/* Profile Completion Score Meter */}
          <div className="w-full md:w-auto p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2 shrink-0 md:min-w-[240px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Profile Completion</span>
              </span>
              <span
                className={`text-sm font-extrabold ${
                  completion.percentage >= 100
                    ? 'text-emerald-400'
                    : completion.percentage >= 70
                    ? 'text-indigo-400'
                    : 'text-amber-400'
                }`}
              >
                {completion.percentage}%
              </span>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completion.percentage >= 100
                    ? 'bg-emerald-500'
                    : completion.percentage >= 70
                    ? 'bg-indigo-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${completion.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>{completion.completedCount} of {completion.totalCount} sections complete</span>
              <button
                type="button"
                onClick={() => setShowChecklist(!showChecklist)}
                className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-0.5"
              >
                <span>{showChecklist ? 'Hide' : 'Checklist'}</span>
                {showChecklist ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Missing Information Checklist Dropdown */}
        {showChecklist && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Profile Checklist Status</span>
              </span>
              <span className="text-slate-400 text-[11px]">
                {completion.missingCriteria.length === 0
                  ? 'All sections complete! 🎉'
                  : `${completion.missingCriteria.length} item(s) pending`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {completion.criteria.map((item) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                    item.isComplete
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
                  }`}
                >
                  {item.isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <p className={`font-medium ${item.isComplete ? 'text-white' : 'text-amber-200'}`}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {item.isComplete ? 'Declared' : item.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Details Quick Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              <span>College / University</span>
            </div>
            <p className="font-semibold text-white truncate">
              {localProfile.personalDetails?.college || (
                <span className="text-slate-500 italic">Not specified</span>
              )}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Degree / Course</span>
            </div>
            <p className="font-semibold text-white truncate">
              {localProfile.personalDetails?.degree || (
                <span className="text-slate-500 italic">Not specified</span>
              )}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Academic Year</span>
            </div>
            <p className="font-semibold text-white">
              {localProfile.personalDetails?.yearOfStudy || (
                <span className="text-slate-500 italic">Not specified</span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Career Aspirations Badges */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 font-medium">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target Career Directions:</span>
          </div>
          {localProfile.careerInterests.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No career directions selected yet. Add interests below to enable career matching.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {localProfile.careerInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-200 text-xs font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. PERSONAL & ACADEMIC INFORMATION SECTION */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Personal & Academic Details</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Update your student identity and institutional enrollment details
            </p>
          </div>

          {!isEditingPersonal && (
            <button
              type="button"
              onClick={handleStartEditPersonal}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edit Details</span>
            </button>
          )}
        </div>

        {isEditingPersonal ? (
          <form onSubmit={handleSavePersonal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-300">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={personalForm.fullName}
                  onChange={(e) =>
                    setPersonalForm({ ...personalForm, fullName: e.target.value })
                  }
                  placeholder="e.g. Alex Rivera"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    personalErrors.fullName
                      ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {personalErrors.fullName && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{personalErrors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-300">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={personalForm.email}
                  onChange={(e) =>
                    setPersonalForm({ ...personalForm, email: e.target.value })
                  }
                  placeholder="e.g. student@skillora.demo"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    personalErrors.email
                      ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {personalErrors.email && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{personalErrors.email}</span>
                  </p>
                )}
              </div>

              {/* College / University */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300">
                  College or University <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={personalForm.college}
                  onChange={(e) =>
                    setPersonalForm({ ...personalForm, college: e.target.value })
                  }
                  placeholder="e.g. Apex Institute of Technology"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    personalErrors.college
                      ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {personalErrors.college && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{personalErrors.college}</span>
                  </p>
                )}
              </div>

              {/* Degree or Course */}
              <div className="space-y-1 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-300">
                  Degree or Course <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={personalForm.degree}
                  onChange={(e) =>
                    setPersonalForm({ ...personalForm, degree: e.target.value })
                  }
                  placeholder="e.g. B.Tech in Computer Science"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    personalErrors.degree
                      ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                {personalErrors.degree && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{personalErrors.degree}</span>
                  </p>
                )}
              </div>

              {/* Academic Year */}
              <div className="space-y-1 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-300">
                  Academic Year <span className="text-red-400">*</span>
                </label>
                <select
                  value={personalForm.yearOfStudy}
                  onChange={(e) =>
                    setPersonalForm({ ...personalForm, yearOfStudy: e.target.value })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white focus:outline-none transition-colors ${
                    personalErrors.yearOfStudy
                      ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/30'
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                >
                  <option value="">Select Year of Study...</option>
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                  <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                  <option value="Graduated">Graduated / Alum</option>
                </select>
                {personalErrors.yearOfStudy && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{personalErrors.yearOfStudy}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Actions: Save & Cancel */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCancelEditPersonal}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Full Name</span>
              <p className="font-semibold text-white text-sm">
                {localProfile.personalDetails?.fullName || 'Not provided'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Email Address</span>
              <p className="font-semibold text-white text-sm truncate">
                {localProfile.email || 'Not provided'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">College / University</span>
              <p className="font-semibold text-white text-sm truncate">
                {localProfile.personalDetails?.college || 'Not provided'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Degree / Program</span>
              <p className="font-semibold text-white text-sm truncate">
                {localProfile.personalDetails?.degree || 'Not provided'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Current Academic Year</span>
              <p className="font-semibold text-white text-sm">
                {localProfile.personalDetails?.yearOfStudy || 'Not provided'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Account Type</span>
              <p className="font-semibold text-white text-sm">
                {localProfile.isDemoUser ? 'Demo Sandbox User' : 'Registered Student'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 3. PROGRAMMING LANGUAGES SECTION */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Programming Languages ({localProfile.languages.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Declare the programming languages you know along with your current proficiency level
            </p>
          </div>
        </div>

        {/* Add Language Form */}
        <form onSubmit={handleAddLanguage} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Add New Language
          </span>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newLangName}
                onChange={(e) => {
                  setNewLangName(e.target.value);
                  setLangError(null);
                }}
                placeholder="Type or select a language (e.g., Python, Rust, SQL)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <select
              value={newLangProficiency}
              onChange={(e) => setNewLangProficiency(e.target.value as Proficiency)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Language</span>
            </button>
          </div>

          {/* Quick presets for common languages */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-medium mr-1">Suggestions:</span>
            {AVAILABLE_LANGUAGES.slice(0, 8).map((lang) => {
              const isAdded = localProfile.languages.some(
                (l) => l.name.toLowerCase() === lang.toLowerCase()
              );
              return (
                <button
                  key={lang}
                  type="button"
                  disabled={isAdded}
                  onClick={() => {
                    setNewLangName(lang);
                    setLangError(null);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                    isAdded
                      ? 'bg-slate-900 text-slate-600 border-slate-800/60 cursor-not-allowed'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {isAdded ? `✓ ${lang}` : `+ ${lang}`}
                </button>
              );
            })}
          </div>

          {langError && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 pt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{langError}</span>
            </p>
          )}
        </form>

        {/* Declared Languages List */}
        {localProfile.languages.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <Code2 className="w-6 h-6 text-slate-600 mx-auto" />
            <p className="text-xs font-medium text-slate-400">No programming languages declared yet.</p>
            <p className="text-[11px] text-slate-500">
              Add languages above to calculate accurate match percentages for tech roles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {localProfile.languages.map((lang) => (
              <div
                key={lang.name}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-3 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white truncate">{lang.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(lang.name)}
                    className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors"
                    title={`Remove ${lang.name}`}
                    aria-label={`Remove ${lang.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Inline proficiency selector */}
                <div className="flex items-center gap-1 pt-2 border-t border-slate-900">
                  {(['Beginner', 'Intermediate', 'Advanced'] as Proficiency[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleUpdateLanguageProficiency(lang.name, level)}
                      className={`flex-1 py-1 rounded-md text-[10px] font-semibold border transition-all ${
                        lang.proficiency === level
                          ? level === 'Advanced'
                            ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-sm'
                            : level === 'Intermediate'
                            ? 'bg-blue-600/30 text-blue-200 border-blue-500/50 shadow-sm'
                            : 'bg-slate-800 text-slate-200 border-slate-600 shadow-sm'
                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
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
      </section>

      {/* 4. TECHNICAL & SOFT SKILLS SECTION */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        {/* A. Technical Skills */}
        <div className="space-y-4">
          <div className="pb-2 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Technical Skills & Frameworks ({localProfile.technicalSkills.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specify developer frameworks, cloud platforms, databases, and tooling
            </p>
          </div>

          {/* Add Technical Skill Form */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Add Technical Skill
            </span>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={newTechName}
                onChange={(e) => {
                  setNewTechName(e.target.value);
                  setTechError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTechnicalSkill();
                  }
                }}
                placeholder="Type skill (e.g., React, Docker, Spring Boot, PostgreSQL)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-white placeholder-slate-500 focus:outline-none"
              />

              <select
                value={newTechProficiency}
                onChange={(e) => setNewTechProficiency(e.target.value as Proficiency)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <button
                type="button"
                onClick={() => handleAddTechnicalSkill()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Quick Add:</span>
              {AVAILABLE_TECHNICAL_SKILLS.slice(0, 10).map((skill) => {
                const isAdded = localProfile.technicalSkills.some(
                  (s) => s.name.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <button
                    key={skill}
                    type="button"
                    disabled={isAdded}
                    onClick={() => handleAddTechnicalSkill(skill)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                      isAdded
                        ? 'bg-slate-900 text-slate-600 border-slate-800/60 cursor-not-allowed'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {isAdded ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>

            {techError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 pt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{techError}</span>
              </p>
            )}
          </div>

          {/* Declared Technical Skills List */}
          {localProfile.technicalSkills.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <Cpu className="w-6 h-6 text-slate-600 mx-auto" />
              <p className="text-xs font-medium text-slate-400">No technical skills added yet.</p>
              <p className="text-[11px] text-slate-500">
                Add frameworks, databases, and tooling above to close skill gaps.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {localProfile.technicalSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-3 text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-semibold text-white truncate">{skill.name}</span>
                      {skill.isCustom && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-indigo-300 font-mono">
                          Custom
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnicalSkill(skill.name)}
                      className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors"
                      title={`Remove ${skill.name}`}
                      aria-label={`Remove ${skill.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Inline proficiency selector */}
                  <div className="flex items-center gap-1 pt-2 border-t border-slate-900">
                    {(['Beginner', 'Intermediate', 'Advanced'] as Proficiency[]).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleUpdateTechProficiency(skill.name, level)}
                        className={`flex-1 py-1 rounded-md text-[10px] font-semibold border transition-all ${
                          skill.proficiency === level
                            ? level === 'Advanced'
                              ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-sm'
                              : level === 'Intermediate'
                              ? 'bg-blue-600/30 text-blue-200 border-blue-500/50 shadow-sm'
                              : 'bg-slate-800 text-slate-200 border-slate-600 shadow-sm'
                            : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
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

        {/* B. Soft Skills */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Soft Skills & Professional Strengths ({localProfile.softSkills.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Highlight interpersonal strengths, collaboration methodologies, and workplace competencies
            </p>
          </div>

          {/* Add Soft Skill Form */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Add Soft Skill
            </span>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSoftName}
                onChange={(e) => {
                  setNewSoftName(e.target.value);
                  setSoftError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSoftSkill();
                  }
                }}
                placeholder="Type custom soft skill (e.g., Critical Thinking, Agile / Scrum)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddSoftSkill()}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md shadow-emerald-700/30 transition-all shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Suggestions:</span>
              {AVAILABLE_SOFT_SKILLS.map((skill) => {
                const isAdded = localProfile.softSkills.some(
                  (s) => s.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <button
                    key={skill}
                    type="button"
                    disabled={isAdded}
                    onClick={() => handleAddSoftSkill(skill)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                      isAdded
                        ? 'bg-slate-900 text-slate-600 border-slate-800/60 cursor-not-allowed'
                        : 'bg-emerald-950/20 text-emerald-300 border-emerald-900/40 hover:bg-emerald-900/30'
                    }`}
                  >
                    {isAdded ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>

            {softError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 pt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{softError}</span>
              </p>
            )}
          </div>

          {/* Declared Soft Skills Tags */}
          {localProfile.softSkills.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              No soft skills listed yet. Select or type competencies above.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {localProfile.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 text-xs font-medium flex items-center gap-2 group"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSoftSkill(skill)}
                    className="text-emerald-400 hover:text-red-400 transition-colors"
                    title={`Remove ${skill}`}
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. CAREER INTERESTS SECTION */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Target Career Aspirations ({localProfile.careerInterests.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add or manage the career pathways that drive your matching analysis and roadmap suggestions
          </p>
        </div>

        {/* Add Career Interest Form */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Add Career Direction
          </span>

          <div className="flex gap-2">
            <input
              type="text"
              value={newCareerName}
              onChange={(e) => {
                setNewCareerName(e.target.value);
                setCareerError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCareerInterest();
                }
              }}
              placeholder="e.g. AI/ML Engineer, Full-Stack Developer, Cloud Engineer..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddCareerInterest()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Interest</span>
            </button>
          </div>

          {/* Career Catalog Suggestions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-medium block">
              Suggested Career Catalog Roles:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CAREER_INTEREST_SUGGESTIONS.map((career) => {
                const isSelected = localProfile.careerInterests.some(
                  (c) => c.toLowerCase() === career.toLowerCase()
                );
                return (
                  <button
                    key={career}
                    type="button"
                    disabled={isSelected}
                    onClick={() => handleAddCareerInterest(career)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-slate-600 border-slate-800/60 cursor-not-allowed'
                        : 'bg-indigo-950/40 text-indigo-300 border-indigo-800/50 hover:bg-indigo-900/50 hover:text-white'
                    }`}
                  >
                    {isSelected ? `✓ ${career}` : `+ ${career}`}
                  </button>
                );
              })}
            </div>
          </div>

          {careerError && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 pt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{careerError}</span>
            </p>
          )}
        </div>

        {/* Selected Career Interests Chips */}
        {localProfile.careerInterests.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <Compass className="w-6 h-6 text-slate-600 mx-auto" />
            <p className="text-xs font-medium text-slate-400">No career directions selected yet.</p>
            <p className="text-[11px] text-slate-500">
              Select or add at least one career interest to receive priority matching bonuses.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {localProfile.careerInterests.map((interest) => (
              <span
                key={interest}
                className="px-3.5 py-2 rounded-xl bg-indigo-950/50 text-indigo-200 border border-indigo-800 text-xs font-medium flex items-center gap-2 group shadow-sm"
              >
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCareerInterest(interest)}
                  className="text-indigo-400 hover:text-red-400 transition-colors"
                  title={`Remove ${interest}`}
                  aria-label={`Remove ${interest}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
