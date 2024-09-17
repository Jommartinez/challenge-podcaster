import { describe, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { isExpired } from '../../utils'
import { DetailLayout } from '../../layout'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  }
})

vi.mock('../../utils', () => ({
  isExpired: vi.fn(),
}))

describe('DetailLayout', () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useParams).mockReturnValue({ podcastId: '1' })
  })

  test('renders DetailLayout correctly', () => {
    localStorage.setItem(
      'podcastsCache',
      JSON.stringify({
        timestamp: Date.now(),
        podcasts: [
          {
            id: '1',
            title: 'Test Podcast',
            author: 'Test Author',
            description: 'Test Description',
            image: 'test-image.jpg',
          },
        ],
      }),
    )
    vi.mocked(isExpired).mockReturnValue(false)

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

  test('redirects to home if podcast not found', () => {
    localStorage.setItem(
      'podcastsCache',
      JSON.stringify({
        timestamp: Date.now(),
        podcasts: [],
      }),
    )
    vi.mocked(isExpired).mockReturnValue(false)

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailLayout />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  test('redirects to home if cached data is expired', () => {
    localStorage.setItem(
      'podcastsCache',
      JSON.stringify({
        timestamp: Date.now() - 100000,
        podcasts: [
          {
            id: '1',
            title: 'Test Podcast',
            author: 'Test Author',
            description: 'Test Description',
            image: 'test-image.jpg',
          },
        ],
      }),
    )
    vi.mocked(isExpired).mockReturnValue(true)

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailLayout />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  test('redirects to home if no cached data found', () => {
    localStorage.removeItem('podcastsCache')

    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<DetailLayout />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
