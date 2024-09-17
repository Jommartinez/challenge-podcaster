import { describe, expect, vi } from 'vitest'
import { api } from '../../api'

describe('api function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('fetch data successfully', async () => {
    const mockResponse = {
      contents: JSON.stringify({ result: 'success' }),
    }
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    )

    const data = await api('/test-endpoint')
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Ftest-endpoint',
    )
    expect(data).toEqual(mockResponse)
  })

  test('handles fetch error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Not Found'),
      } as Response),
    )

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const data = await api('/test-endpoint')
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Ftest-endpoint',
    )
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error API fetching:',
      new Error('Not Found'),
    )
    expect(data).toBeUndefined()

    consoleErrorSpy.mockRestore()
  })

  test('handles network error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')))

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const data = await api('/test-endpoint')
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Ftest-endpoint',
    )
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error API fetching:',
      new Error('Network Error'),
    )
    expect(data).toBeUndefined()

    consoleErrorSpy.mockRestore()
  })
})
