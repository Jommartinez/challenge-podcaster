const URL_API = 'https://itunes.apple.com'

export const api = async (url: string) => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${URL_API}${url}`,
    )
    return response.json()
  } catch (error) {
    console.error('Error API fetching:', error)
  }
}
