"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Language {
    site_lang_hangul: string;
    site_lang: string;
}

interface SiteStore {
  siteLanguages: Language[];
  setSiteLanguages: (data: Language[]) => void;
  clearSiteLanguages: () => void;
}

export const useSiteStore = create<SiteStore>()(
    persist(
        (set) => ({
            siteLanguages: [],
            setSiteLanguages: (data: Language[]) => set({ siteLanguages: data }),
            clearSiteLanguages: () => set({ siteLanguages: [] }),
        }),
        {
            name: "site-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
); 