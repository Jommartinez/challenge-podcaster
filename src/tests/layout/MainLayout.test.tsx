import { describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useLoading } from '../../context'
import { Header } from '../../components'
import { MemoryRouter } from 'react-router-dom'
import { MainLayout } from '../../layout'

vi.mock('../../context', () => ({
  useLoading: vi.fn(),
}))

vi.mock('../../components', () => ({
  Header: vi.fn(() => <div>Header</div>),
}))

describe('MainLayout', () => {
  test('renders MainLayout correctly', () => {
    useLoading.mockReturnValue({ isLoading: false })

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  test('passes loading prop to Header correctly', () => {
    useLoading.mockReturnValue({ isLoading: true })

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    )

    expect(Header).toHaveBeenCalledWith({ loading: true }, {})
  })
})
