import { Route, Routes } from 'react-router-dom'
import { DetailLayout, MainLayout } from './layout'
import { DetailPodcast, EpisodeDetail, Home } from './pages'
import { LoadingProvider } from './context'

function App() {
  return (
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="podcast/:podcastId" element={<DetailLayout />}>
            <Route index element={<DetailPodcast />} />
            <Route path="episode/:episodeId" element={<EpisodeDetail />} />
          </Route>
        </Route>
      </Routes>
    </LoadingProvider>
  )
}

export default App
