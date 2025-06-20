import { create } from 'zustand'

export interface LikedProject {
  id: string
  name: string
  price: number
  image: string
  description: string
}

interface LikedProjectsStore {
  likedProjects: LikedProject[]
  addToLiked: (project: LikedProject) => void
  removeFromLiked: (projectId: string) => void
  isLiked: (projectId: string) => boolean
  clearLiked: () => void
  likedCount: number
}

export const useLikedProjectsStore = create<LikedProjectsStore>((set, get) => ({
  likedProjects: [],
  likedCount: 0,
  
  addToLiked: (project) => {
    const { likedProjects } = get()
    const isAlreadyLiked = likedProjects.some(p => p.id === project.id)
    
    if (!isAlreadyLiked) {
      set((state) => ({
        likedProjects: [...state.likedProjects, project],
        likedCount: state.likedCount + 1
      }))
    }
  },
  
  removeFromLiked: (projectId) => {
    set((state) => ({
      likedProjects: state.likedProjects.filter(p => p.id !== projectId),
      likedCount: state.likedCount - 1
    }))
  },
  
  isLiked: (projectId) => {
    const { likedProjects } = get()
    return likedProjects.some(p => p.id === projectId)
  },
  
  clearLiked: () => {
    set({ likedProjects: [], likedCount: 0 })
  }
})) 