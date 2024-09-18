import { describe, it, expect, beforeEach } from 'vitest'
import { useLoadingStore } from '../../store/loadingStore'

describe('loadingStore', () => {
  beforeEach(() => {
    useLoadingStore.setState({ isLoading: false })
  })

  it('should have initial state isLoading as false', () => {
    const { isLoading } = useLoadingStore.getState()
    expect(isLoading).toBe(false)
  })

  it('should update isLoading state correctly', () => {
    const { setIsLoading } = useLoadingStore.getState()
    setIsLoading(true)
    expect(useLoadingStore.getState().isLoading).toBe(true)

    setIsLoading(false)
    expect(useLoadingStore.getState().isLoading).toBe(false)
  })
})
