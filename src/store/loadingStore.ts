import { create } from 'zustand'

interface LoadingStore {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<LoadingStore>(set => ({
  isLoading: false,
  setIsLoading: isLoading => set({ isLoading }),
}))

export const useLoading = () => {
  const { isLoading, setIsLoading } = useLoadingStore()
  return { isLoading, setIsLoading }
}
