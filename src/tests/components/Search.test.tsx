import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import { Podcast } from '../../types'
import { Search } from '../../components'

const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'Test title 1 Podcast',
    author: 'Test name Author',
    image: 'https://placehold.co/200',
    description: 'Test 1 Description',
  },
  {
    id: '2',
    title: 'Test title 2 Podcast',
    author: 'Test name Author',
    image: 'https://placehold.co/200',
    description: 'Test 2 Description',
  },
]

describe('Search Component', () => {
  test('renders the Search component', () => {
    render(
      <Search
        filterPodcasts=""
        searchList={mockPodcasts}
        podcasts={mockPodcasts}
        setFilterPodcasts={vi.fn()}
      />,
    )
    expect(
      screen.getByPlaceholderText('Filter podcasts...'),
    ).toBeInTheDocument()
  })

  test('displays the correct number of podcasts when filter is empty', () => {
    render(
      <Search
        filterPodcasts=""
        searchList={mockPodcasts}
        podcasts={mockPodcasts}
        setFilterPodcasts={vi.fn()}
      />,
    )
    expect(screen.getByText(mockPodcasts.length.toString())).toBeInTheDocument()
  })

  test('displays the correct number of filtered podcasts', () => {
    const filteredPodcasts = mockPodcasts.slice(0, 1)
    render(
      <Search
        filterPodcasts="Podcast 1"
        searchList={filteredPodcasts}
        podcasts={mockPodcasts}
        setFilterPodcasts={vi.fn()}
      />,
    )
    expect(
      screen.getByText(filteredPodcasts.length.toString()),
    ).toBeInTheDocument()
  })

  test('calls setFilterPodcasts on input change', () => {
    const setFilterPodcasts = vi.fn()
    render(
      <Search
        filterPodcasts=""
        searchList={mockPodcasts}
        podcasts={mockPodcasts}
        setFilterPodcasts={setFilterPodcasts}
      />,
    )
    const input = screen.getByPlaceholderText('Filter podcasts...')
    fireEvent.change(input, { target: { value: 'Test title 1 Podcast' } })
    expect(setFilterPodcasts).toHaveBeenCalledWith('Test title 1 Podcast')
  })
})
