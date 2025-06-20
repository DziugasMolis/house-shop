import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface RememberedProject {
  id: string
  name: string
  price: number
  image: string
  description: string
}

interface RememberedProjectsStore {
  rememberedProjects: RememberedProject[]
  addToRemembered: (project: RememberedProject) => void
  removeFromRemembered: (projectId: string) => void
  isRemembered: (projectId: string) => boolean
  clearRemembered: () => void
  rememberedCount: number
  getStoredData: () => { rememberedProjects: RememberedProject[]; rememberedCount: number } | null
}

export const useRememberedProjectsStore = create<RememberedProjectsStore>()(
  persist(
    (set, get) => ({
      rememberedProjects: [],
      rememberedCount: 0,
      
      addToRemembered: (project) => {
        const { rememberedProjects } = get()
        const isAlreadyRemembered = rememberedProjects.some(p => p.id === project.id)
        
        if (!isAlreadyRemembered) {
          set((state) => ({
            rememberedProjects: [...state.rememberedProjects, project],
            rememberedCount: state.rememberedCount + 1
          }))
        }
      },
      
      removeFromRemembered: (projectId) => {
        set((state) => ({
          rememberedProjects: state.rememberedProjects.filter(p => p.id !== projectId),
          rememberedCount: state.rememberedCount - 1
        }))
      },
      
      isRemembered: (projectId) => {
        const { rememberedProjects } = get()
        return rememberedProjects.some(p => p.id === projectId)
      },
      
      clearRemembered: () => {
        set({ rememberedProjects: [], rememberedCount: 0 })
      },

      getStoredData: () => {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('remembered-projects-storage')
          return stored ? JSON.parse(stored) : null
        }
        return null
      }
    }),
    {
      name: 'remembered-projects-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // explicitly use localStorage
      partialize: (state) => ({ 
        rememberedProjects: state.rememberedProjects,
        rememberedCount: state.rememberedCount 
      }), // only persist these fields
    }
  )
) 