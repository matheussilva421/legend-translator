import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { SubtitleEntry, ApiConfig as ApiConfigType } from '../core/types'

interface SubtitleStore {
  subtitles: SubtitleEntry[]
  apiConfig: ApiConfigType | null
  selectedIds: Set<string>

  setSubtitles: (entries: SubtitleEntry[]) => void
  updateTranslation: (id: string, translation: string) => void
  setApiConfig: (config: ApiConfigType) => void
  toggleSelection: (id: string) => void
  clearSelection: () => void
  reset: () => void
}

export const useSubtitleStore = create<SubtitleStore>()(
  persist(
    (set) => ({
      subtitles: [],
      apiConfig: null,
      selectedIds: new Set(),

      setSubtitles: (entries) => set({ subtitles: entries }),

      updateTranslation: (id, translation) => set((state) => ({
        subtitles: state.subtitles.map((entry) =>
          entry.id === id ? { ...entry, translation } : entry
        )
      })),

      setApiConfig: (config) => set({ apiConfig: config }),

      toggleSelection: (id) => set((state) => {
        const newSet = new Set(state.selectedIds)
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
        return { selectedIds: newSet }
      }),

      clearSelection: () => set({ selectedIds: new Set() }),

      reset: () => set({ subtitles: [], apiConfig: null, selectedIds: new Set() })
    }),
    {
      name: 'legend-translator-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        subtitles: state.subtitles,
        apiConfig: state.apiConfig
      })
    }
  )
)
