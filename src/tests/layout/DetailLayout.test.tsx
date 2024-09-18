import { describe, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { DetailLayout } from '../../layout'
import usePodcastStore from '../../store/podcastStore'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  }
})

vi.mock('../../store/podcastStore', () => ({
  default: vi.fn(),
}))

describe('DetailLayout', () => {
  const mockNavigate = vi.fn()
  const mockGetPodcast = vi.fn()
  const mockFetchPodcasts = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useParams).mockReturnValue({ podcastId: '1' })
    vi.mocked(usePodcastStore).mockReturnValue({
      getPodcast: mockGetPodcast,
      fetchPodcasts: mockFetchPodcasts,
    } as any)
  })

  test('renders DetailLayout correctly', () => {
    mockGetPodcast.mockReturnValue({
      id: '1',
      title: 'Test Podcast',
      author: 'Test Author',
      description: 'Test Description',
      image: 'https://placehold.co/200',
    })

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailLayout />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Test Podcast')).toBeInTheDocument()
    expect(screen.getByText('by Test Author')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByAltText('Test Podcast cover')).toBeInTheDocument()
  })

  test('redirects to home if podcast not found', async () => {
    mockGetPodcast.mockReturnValue(undefined)
    mockFetchPodcasts.mockResolvedValue(undefined)

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailLayout />} />
        </Routes>
      </MemoryRouter>,
    )

    await vi.runAllTimersAsync()

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
