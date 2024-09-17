import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, beforeEach, vi } from 'vitest'
import { Episode } from '../../types'
import { formatDate, formatTime } from '../../utils'
import { List } from '../../components'

vi.mock('../../utils', () => ({
  formatDate: vi.fn(),
  formatTime: vi.fn(),
}))

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Episode 1',
    releaseDate: '2023-01-01',
    time: 3600,
    url: 'http://audio1.mp3',
    description: 'Episode 1 description',
  },
  {
    id: 2,
    name: 'Episode 2',
    releaseDate: '2023-01-02',
    time: 4200,
    url: 'http://audio2.mp3',
    description: 'Episode 2 description',
  },
]

describe('List Component', () => {
  beforeEach(() => {
    vi.mocked(formatDate).mockImplementation((date: string) => date)
    vi.mocked(formatTime).mockImplementation(
      (time: number) => `${time} seconds`,
    )
  })

  test('renders the List component', () => {
    render(
      <MemoryRouter>
        <List episodes={mockEpisodes} podcastId="123" />
      </MemoryRouter>,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Duration')).toBeInTheDocument()
  })

  test('displays episode titles', () => {
    render(
      <MemoryRouter>
        <List episodes={mockEpisodes} podcastId="123" />
      </MemoryRouter>,
    )
    expect(screen.getByText('Episode 1')).toBeInTheDocument()
    expect(screen.getByText('Episode 2')).toBeInTheDocument()
  })

  test('displays episode dates', () => {
    render(
      <MemoryRouter>
        <List episodes={mockEpisodes} podcastId="123" />
      </MemoryRouter>,
    )
    expect(screen.getByText('2023-01-01')).toBeInTheDocument()
    expect(screen.getByText('2023-01-02')).toBeInTheDocument()
  })

  test('displays episode durations', () => {
    render(
      <MemoryRouter>
        <List episodes={mockEpisodes} podcastId="123" />
      </MemoryRouter>,
    )
    expect(screen.getByText('3600 seconds')).toBeInTheDocument()
    expect(screen.getByText('4200 seconds')).toBeInTheDocument()
  })

  test('links have the correct URLs', () => {
    render(
      <MemoryRouter>
        <List episodes={mockEpisodes} podcastId="123" />
      </MemoryRouter>,
    )
    expect(screen.getByText('Episode 1').closest('a')).toHaveAttribute(
      'href',
      '/podcast/123/episode/1',
    )
    expect(screen.getByText('Episode 2').closest('a')).toHaveAttribute(
      'href',
      '/podcast/123/episode/2',
    )
  })
})
