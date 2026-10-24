import React from 'react';
import {
  GraduationCap,
  Code2,
  Cpu,
  Compass,
  Calendar,
  Building,
  Award,
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface MyProfileViewProps {
  profile: StudentProfile;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({ profile }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-indigo-600/30">
              {profile.personalDetails.fullName.charAt(0) || 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {profile.personalDetails.fullName}
                </h1>
                {profile.isDemoUser ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Demo Account
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Registered Student
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Education Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              <span>College</span>
            </div>
            <p className="font-semibold text-white truncate">
              {profile.personalDetails.college}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Degree</span>
            </div>
            <p className="font-semibold text-white truncate">
              {profile.personalDetails.degree}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Academic Year</span>
            </div>
            <p className="font-semibold text-white">
              {profile.personalDetails.yearOfStudy}
            </p>
          </div>
        </div>
      </div>

      {/* Languages & Proficiency Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span>Programming Languages ({profile.languages.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {profile.languages.map((lang) => (
            <div
              key={lang.name}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
            >
              <span className="font-semibold text-white">{lang.name}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  lang.proficiency === 'Advanced'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : lang.proficiency === 'Intermediate'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical & Soft Skills Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Technical Skills & Frameworks ({profile.technicalSkills.length})</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.technicalSkills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white flex items-center gap-2"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-900/50">
                  {skill.proficiency}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Soft Skills & Competencies ({profile.softSkills.length})</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.softSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Target Careers */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Selected Career Aspirations</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.careerInterests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 rounded-xl bg-indigo-950/50 text-indigo-200 border border-indigo-800 text-xs font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
