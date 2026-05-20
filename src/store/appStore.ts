import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACTIVITIES } from '../data/activities';
import type { Activity } from '../data/activities';

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
  plannedActivities: (Activity & { date: string })[];
  swipeCount: number;
  isPremium: boolean;
  paywallDismissed: boolean;

  setOnboardingField: (field: keyof OnboardingData, value: string | string[]) => void;
  completeOnboarding: () => void;
  likeActivity: (id: number) => void;
  skipActivity: (id: number) => void;
  planActivity: (id: number, date: string) => void;
  activatePremium: () => void;
  dismissPaywall: () => void;
  resetOnboarding: () => void;
}

const defaultOnboarding: OnboardingData = {
  city: 'Москва',
  company: '',
  budget: '',
  timeWeekend: [],
  timeWeekdays: [],
  interests: [],
  excludes: [],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      onboardingData: defaultOnboarding,
      isOnboardingComplete: false,

      activities: ACTIVITIES,
      likedActivities: [],
      plannedActivities: [],
      swipeCount: 0,
      isPremium: false,
      paywallDismissed: false,

      setOnboardingField: (field, value) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, [field]: value },
        })),

      completeOnboarding: () => set({ isOnboardingComplete: true }),

      likeActivity: (id) => {
        const { activities, likedActivities, swipeCount } = get();
        const activity = activities.find((a) => a.id === id);
        if (activity && !likedActivities.find((a) => a.id === id)) {
          set({
            likedActivities: [...likedActivities, activity],
            swipeCount: swipeCount + 1,
          });
        } else {
          set({ swipeCount: swipeCount + 1 });
        }
      },

      skipActivity: (id) => {
        void id;
        set((state) => ({ swipeCount: state.swipeCount + 1 }));
      },

      planActivity: (id, date) => {
        const { activities, plannedActivities } = get();
        const activity = activities.find((a) => a.id === id);
        if (activity && !plannedActivities.find((a) => a.id === id)) {
          set({ plannedActivities: [...plannedActivities, { ...activity, date }] });
        }
      },

      activatePremium: () => set({ isPremium: true, paywallDismissed: true }),

      dismissPaywall: () => set({ paywallDismissed: true }),

      resetOnboarding: () =>
        set({
          onboardingData: defaultOnboarding,
          isOnboardingComplete: false,
          swipeCount: 0,
        }),
    }),
    {
      name: 'zateia-storage',
    }
  )
);
