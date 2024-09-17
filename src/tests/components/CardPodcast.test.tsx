import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Podcast } from '../../types'
import { CardPodcast } from '../../components'

const mockPodcast: Podcast = {
  id: '1',
  title: 'Test title Podcast',
  author: 'Test name Author',
  image: 'https://placehold.co/200',
  description: 'Test Description',
}

describe('CardPodcast Component', () => {
  test('renders the CardPodcast component', () => {
    render(
      <MemoryRouter>
        <CardPodcast podcast={mockPodcast} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Test title Podcast')).toBeInTheDocument()
    expect(screen.getByText('Author: Test name Author')).toBeInTheDocument()
    expect(screen.getByAltText('Test title Podcast')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/podcast/1')
  })

  test('displays the podcast title', () => {
    render(
      <MemoryRouter>
        <CardPodcast podcast={mockPodcast} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Test title Podcast')).toBeInTheDocument()
  })

  test('displays the podcast author', () => {
    render(
      <MemoryRouter>
        <CardPodcast podcast={mockPodcast} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Author: Test name Author')).toBeInTheDocument()
  })

  test('displays the podcast image with correct alt text', () => {
    render(
      <MemoryRouter>
        <CardPodcast podcast={mockPodcast} />
      </MemoryRouter>,
    )
    expect(screen.getByAltText('Test title Podcast')).toBeInTheDocument()
  })

  test('link has the correct URL', () => {
    render(
      <MemoryRouter>
        <CardPodcast podcast={mockPodcast} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/podcast/1')
  })
})
