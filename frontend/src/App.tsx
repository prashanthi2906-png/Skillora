import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Sidebar } from './components/dashboard/Sidebar';
import { Header } from './components/dashboard/Header';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MyProfileView } from './components/dashboard/MyProfileView';
import { SkillGapView } from './components/dashboard/SkillGapView';
import { LearningRoadmapView } from './components/dashboard/LearningRoadmapView';
import { ProgressView } from './components/dashboard/ProgressView';
import { DEMO_STUDENT_PROFILE } from './constants/demoData';
import { calculateCareerMatches } from './utils/matchingEngine';
import { AuthSession, StorageService } from './utils/storage';
import { ActiveTab, CareerMatchResult, StudentProfile } from './types';

type ViewMode = 'login' | 'register' | 'onboarding' | 'dashboard';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Load session from storage on initial mount
  useEffect(() => {
    const session = StorageService.getAuthSession();
    if (session) {
      setCurrentEmail(session.email);
      if (session.onboardingCompleted) {
        const loadedProfile = StorageService.getCurrentProfile();
        if (loadedProfile) {
          setProfile(loadedProfile);
          setViewMode('dashboard');
        } else if (session.isDemoUser) {
          setProfile(DEMO_STUDENT_PROFILE);
          setViewMode('dashboard');
        } else {
          setViewMode('onboarding');
        }
      } else {
        setViewMode('onboarding');
      }
    } else {
      setViewMode('login');
    }
  }, []);

  const handleLoginSuccess = (
    email: string,
    isDemoUser: boolean,
    onboardingCompleted: boolean
  ) => {
    setCurrentEmail(email);

    const session: AuthSession = {
      email,
      isDemoUser,
      onboardingCompleted,
    };
    StorageService.setAuthSession(session);

    if (isDemoUser) {
      setProfile(DEMO_STUDENT_PROFILE);
      StorageService.saveCurrentProfile(DEMO_STUDENT_PROFILE);
      setViewMode('dashboard');
    } else if (onboardingCompleted) {
      const existing = StorageService.findRegisteredProfile(email);
      if (existing) {
        setProfile(existing);
        StorageService.saveCurrentProfile(existing);
        setViewMode('dashboard');
      } else {
        setViewMode('onboarding');
      }
    } else {
      setViewMode('onboarding');
    }
  };

  const handleRegisterSuccess = (email: string) => {
    setCurrentEmail(email);
    const session: AuthSession = {
      email,
      isDemoUser: false,
      onboardingCompleted: false,
    };
    StorageService.setAuthSession(session);
    setViewMode('onboarding');
  };

  const handleOnboardingComplete = (completedProfile: StudentProfile) => {
    setProfile(completedProfile);
    StorageService.saveCurrentProfile(completedProfile);

    const session: AuthSession = {
      email: completedProfile.email,
      isDemoUser: false,
      onboardingCompleted: true,
    };
    StorageService.setAuthSession(session);
    setViewMode('dashboard');
  };

  const handleLogout = () => {
    StorageService.clearAuthSession();
    setProfile(null);
    setCurrentEmail('');
    setActiveTab('dashboard');
    setViewMode('login');
  };

  // If in auth flows:
  if (viewMode === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigateToRegister={() => setViewMode('register')}
      />
    );
  }

  if (viewMode === 'register') {
    return (
      <RegisterPage
        onRegisterSuccess={handleRegisterSuccess}
        onNavigateToLogin={() => setViewMode('login')}
      />
    );
  }

  if (viewMode === 'onboarding') {
    return (
      <OnboardingFlow
        email={currentEmail}
        onComplete={handleOnboardingComplete}
        onCancel={handleLogout}
      />
    );
  }

  // Dashboard flow
  const currentProfile = profile || DEMO_STUDENT_PROFILE;
  const careerMatches: CareerMatchResult[] = calculateCareerMatches(currentProfile);
  const topMatch = careerMatches[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={currentProfile}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header activeTab={activeTab} profile={currentProfile} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              profile={currentProfile}
              careerMatches={careerMatches}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'profile' && (
            <MyProfileView profile={currentProfile} />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapView
              careerMatches={careerMatches}
              profile={currentProfile}
            />
          )}

          {activeTab === 'roadmap' && (
            <LearningRoadmapView
              profile={currentProfile}
              topMatch={topMatch}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView
              profile={currentProfile}
              topMatch={topMatch}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
