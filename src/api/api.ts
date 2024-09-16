const API_URL = 'https://itunes.apple.com'

export const api = async (url: string) => {
  try {
    const resp = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`${API_URL}${url}`)}`,
    )
    if (!resp.ok) {
      const error = await resp.text()
      throw new Error(error)
    }
    return await resp.json()
  } catch (error) {
    console.error('Error API fetching:', error)
  }
}
