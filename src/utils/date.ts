export const isExpired = (date: number) => {
  const day = 24 * 60 * 60 * 1000
  return Date.now() - date > day
}
