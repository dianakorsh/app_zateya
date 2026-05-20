import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Activity, ACTIVITIES } from '../data/activities'

interface OnboardingData {
  city: string;
  company: string;
  budget: string;
  timeWeekend: string[];
  timeWeekdays: string[];
  interests: string[];
  excludes: string[];
}

interface AppStore {
  onboardingData: OnboardingData;
  isOnboardingComplete: boolean;

  activities: Activity[];
  likedActivities: Activity[];
  plannedActivities: { activity: Activity; date: string }[];
  swipeCount: number;
  isPremium: boolean;

  currentTab: 'feed' | 'search' | 'my' | 'profile';

  setOnboardingField: (field: keyof OnboardingData, value: string | string[]) => void;
  completeOnboarding: () => void;
  likeActivity: (id: number) => void;
  skipActivity: (id: number) => void;
  planActivity: (id: number, date: string) => void;
  setCurrentTab: (tab: 'feed' | 'search' | 'my' | 'profile') => void;
  setPremium: () => void;
  resetSwipes: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      onboardingData: {
        city: 'Москва',
        company: '',
        budget: '',
        timeWeekend: [],
        timeWeekdays: [],
        interests: [],
        excludes: [],
      },
      isOnboardingComplete: false,
      activities: ACTIVITIES,
      likedActivities: [],
      plannedActivities: [],
      swipeCount: 0,
      isPremium: false,
      currentTab: 'feed',

      setOnboardingField: (field, value) =>
        set((s) => ({
          onboardingData: { ...s.onboardingData, [field]: value },
        })),

      completeOnboarding: () => set({ isOnboardingComplete: true }),

      likeActivity: (id) => {
        const activity = get().activities.find((a) => a.id === id);
        if (!activity) return;
        const already = get().likedActivities.find((a) => a.id === id);
        if (already) return;
        set((s) => ({
          likedActivities: [activity, ...s.likedActivities],
          swipeCount: s.swipeCount + 1,
        }));
      },

      skipActivity: (id) => {
        set((s) => ({ swipeCount: s.swipeCount + 1 }));
      },

      planActivity: (id, date) => {
        const activity = get().activities.find((a) => a.id === id);
        if (!activity) return;
        set((s) => ({
          plannedActivities: [
            { activity, date },
            ...s.plannedActivities.filter((p) => p.activity.id !== id),
          ],
        }));
      },

      setCurrentTab: (tab) => set({ currentTab: tab }),
      setPremium: () => set({ isPremium: true }),
      resetSwipes: () => set({ swipeCount: 0 }),
    }),
    {
      name: 'zateia-store',
    }
  )
);
