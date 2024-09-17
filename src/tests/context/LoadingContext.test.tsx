import { describe, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { LoadingProvider, useLoading } from '../../context'

const TestComponent = () => {
  const { isLoading, setIsLoading } = useLoading()
  return (
    <div>
      <span data-testid="loading-status">{isLoading.toString()}</span>
      <button onClick={() => setIsLoading(true)}>Set Loading</button>
    </div>
  )
}

describe('LoadingContext', () => {
  test('renders LoadingProvider correctly', () => {
    render(
      <LoadingProvider>
        <div>Test</div>
      </LoadingProvider>,
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('useLoading returns correct context value', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>,
    )
    expect(screen.getByTestId('loading-status').textContent).toBe('false')
    fireEvent.click(screen.getByText('Set Loading'))
    expect(screen.getByTestId('loading-status').textContent).toBe('true')
  })

  test('useLoading throws error when used outside LoadingProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const TestComponentOutsideProvider = () => {
      try {
        useLoading()
      } catch (e) {
        if (e instanceof Error) {
          return <span>{e.message}</span>
        }
        return <span>Error desconocido</span>
      }
      return null
    }

    render(<TestComponentOutsideProvider />)
    expect(
      screen.getByText('useLoading must be used within a LoadingProvider'),
    ).toBeInTheDocument()

    consoleErrorSpy.mockRestore()
  })
})
