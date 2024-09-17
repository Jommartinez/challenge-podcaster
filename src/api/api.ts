const API_URL = 'https://itunes.apple.com'
const ALLORIGINS_URL = 'https://api.allorigins.win/get'

export const api = async (url: string) => {
  try {
    const fullUrl = `${ALLORIGINS_URL}?url=${encodeURIComponent(`${API_URL}${url}`)}`
    const resp = await fetch(fullUrl)

    if (!resp.ok) {
      const error = await resp.text()
      throw new Error(error)
    }
    return await resp.json()
  } catch (error) {
    console.error('Error API fetching:', error)
  }
}
