import { useEffect } from 'react'
import { getPodcasts } from './api'

function App() {
  const getDataPodcast = async () => {
    try {
      const data = await getPodcasts()
      console.log(data)
    } catch (error) {
      console.log('Error fetching podcasts:', error)
    }
  }

  useEffect(() => {
    getDataPodcast()
  }, [])

  return <p>App</p>
}

export default App
