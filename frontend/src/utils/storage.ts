import { RoadmapItemStatus, StudentProfile } from '../types';
import { DEMO_STUDENT_PROFILE } from '../constants/demoData';

const STORAGE_KEYS = {
  CURRENT_USER: 'skillora_current_user',
  CURRENT_PROFILE: 'skillora_student_profile',
  REGISTERED_PROFILES: 'skillora_registered_profiles',
  ROADMAP_PROGRESS: 'skillora_roadmap_progress',
};

export interface AuthSession {
  email: string;
  isDemoUser: boolean;
  onboardingCompleted: boolean;
}

export const StorageService = {
  getAuthSession(): AuthSession | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setAuthSession(session: AuthSession): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    } catch (e) {
      console.warn('Unable to persist session to localStorage', e);
    }
  },

  clearAuthSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PROFILE);
    } catch (e) {
      console.warn('Unable to clear session from localStorage', e);
    }
  },

  getCurrentProfile(): StudentProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
      let profile: StudentProfile | null = null;
      if (data) {
        profile = JSON.parse(data);
      } else {
        // If user is demo user, default to demo profile
        const session = this.getAuthSession();
        if (session && session.isDemoUser) {
          profile = DEMO_STUDENT_PROFILE;
        }
      }

      if (profile) {
        // Sanitize arrays to prevent null pointer exceptions if storage was malformed
        return {
          ...profile,
          personalDetails: {
            fullName: profile.personalDetails?.fullName || '',
            college: profile.personalDetails?.college || '',
            degree: profile.personalDetails?.degree || '',
            yearOfStudy: profile.personalDetails?.yearOfStudy || '',
          },
          languages: Array.isArray(profile.languages) ? profile.languages : [],
          technicalSkills: Array.isArray(profile.technicalSkills) ? profile.technicalSkills : [],
          softSkills: Array.isArray(profile.softSkills) ? profile.softSkills : [],
          careerInterests: Array.isArray(profile.careerInterests) ? profile.careerInterests : [],
        };
      }
      return null;
    } catch {
      return null;
    }
  },

  saveCurrentProfile(profile: StudentProfile, previousEmail?: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));

      // Also persist to registered profiles list if not demo user
      if (!profile.isDemoUser) {
        const registered = this.getRegisteredProfiles();
        const emailsToRemove = [profile.email.toLowerCase()];
        if (previousEmail) {
          emailsToRemove.push(previousEmail.toLowerCase());
        }
        const updated = registered.filter(
          (p) => !emailsToRemove.includes(p.email.toLowerCase())
        );
        updated.push(profile);
        localStorage.setItem(STORAGE_KEYS.REGISTERED_PROFILES, JSON.stringify(updated));

        // Update active auth session if email changed
        const session = this.getAuthSession();
        if (session && previousEmail && session.email.toLowerCase() === previousEmail.toLowerCase()) {
          this.setAuthSession({
            ...session,
            email: profile.email,
          });
        }
      }
    } catch (e) {
      console.warn('Unable to save profile to localStorage', e);
    }
  },

  getRegisteredProfiles(): StudentProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTERED_PROFILES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  findRegisteredProfile(email: string): StudentProfile | null {
    const list = this.getRegisteredProfiles();
    return list.find((p) => p.email.toLowerCase() === email.toLowerCase()) || null;
  },

  getRoadmapProgress(email: string, careerId: string): Record<string, RoadmapItemStatus> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROADMAP_PROGRESS);
      if (!data) return {};
      const parsed = JSON.parse(data);
      const userProgress = parsed[email.toLowerCase()] || {};
      return userProgress[careerId] || {};
    } catch {
      return {};
    }
  },

  getAllRoadmapProgressForUser(email: string): Record<string, Record<string, RoadmapItemStatus>> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROADMAP_PROGRESS);
      if (!data) return {};
      const parsed = JSON.parse(data);
      return parsed[email.toLowerCase()] || {};
    } catch {
      return {};
    }
  },

  saveRoadmapItemStatus(
    email: string,
    careerId: string,
    itemId: string,
    status: RoadmapItemStatus
  ): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ROADMAP_PROGRESS);
      const parsed = raw ? JSON.parse(raw) : {};
      const normalizedEmail = email.toLowerCase();
      if (!parsed[normalizedEmail]) {
        parsed[normalizedEmail] = {};
      }
      if (!parsed[normalizedEmail][careerId]) {
        parsed[normalizedEmail][careerId] = {};
      }
      parsed[normalizedEmail][careerId][itemId] = status;
      localStorage.setItem(STORAGE_KEYS.ROADMAP_PROGRESS, JSON.stringify(parsed));
    } catch (e) {
      console.warn('Unable to persist roadmap progress to localStorage', e);
    }
  },
};
