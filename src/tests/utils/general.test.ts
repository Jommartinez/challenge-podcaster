import { describe, expect } from 'vitest'
import { isExpired, formatDate, formatTime } from '../../utils'

describe('isExpired', () => {
  test('returns true if the date is expired', () => {
    const pastDate = Date.now() - (24 * 60 * 60 * 1000 + 1)
    expect(isExpired(pastDate)).toBe(true)
  })

  test('returns false if the date is not expired', () => {
    const recentDate = Date.now() - (24 * 60 * 60 * 1000 - 1)
    expect(isExpired(recentDate)).toBe(false)
  })
})

describe('formatDate', () => {
  test('returns the formatted date string', () => {
    const dateString = '2023-01-01T00:00:00Z'
    expect(formatDate(dateString)).toBe(
      new Date(dateString).toLocaleDateString(),
    )
  })
})

describe('formatTime', () => {
  test('returns the formatted time string for hours, minutes, and seconds', () => {
    const time = 3661000
    expect(formatTime(time)).toBe('1:1:01')
  })

  test('returns the formatted time string for minutes and seconds', () => {
    const time = 61000
    expect(formatTime(time)).toBe('1:01')
  })
})
