export const isExpired = (date: number) => {
  const day = 24 * 60 * 60 * 1000
  return Date.now() - date > day
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

export const formatTime = (time: number): string => {
  // hour:minutes:seconds
  const hours = Math.floor(time / 3600000)
  const minutes = Math.floor((time % 3600000) / 60000)
  const seconds = Math.floor(((time % 3600000) % 60000) / 1000)
    .toString()
    .padStart(2, '0')
  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`
  } else {
    return `${minutes}:${seconds}`
  }
}
