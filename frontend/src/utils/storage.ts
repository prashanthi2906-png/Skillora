import { StudentProfile } from '../types';
import { DEMO_STUDENT_PROFILE } from '../constants/demoData';

const STORAGE_KEYS = {
  CURRENT_USER: 'skillora_current_user',
  CURRENT_PROFILE: 'skillora_student_profile',
  REGISTERED_PROFILES: 'skillora_registered_profiles',
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
      if (data) {
        return JSON.parse(data);
      }
      // If user is demo user, default to demo profile
      const session = this.getAuthSession();
      if (session && session.isDemoUser) {
        return DEMO_STUDENT_PROFILE;
      }
      return null;
    } catch {
      return null;
    }
  },

  saveCurrentProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));

      // Also persist to registered profiles list if not demo user
      if (!profile.isDemoUser) {
        const registered = this.getRegisteredProfiles();
        const updated = registered.filter((p) => p.email.toLowerCase() !== profile.email.toLowerCase());
        updated.push(profile);
        localStorage.setItem(STORAGE_KEYS.REGISTERED_PROFILES, JSON.stringify(updated));
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
};
