import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import { Header } from '../../components'

describe('Header Component', () => {
  test('renders the Header component', () => {
    render(
      <MemoryRouter>
        <Header loading={false} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Podcaster')).toBeInTheDocument()
  })

  test('displays the loader when loading is true', () => {
    render(
      <MemoryRouter>
        <Header loading={true} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Podcaster')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('does not display the loader when loading is false', () => {
    render(
      <MemoryRouter>
        <Header loading={false} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Podcaster')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
