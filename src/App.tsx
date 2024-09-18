import { Route, Routes } from 'react-router-dom'
import { DetailLayout, MainLayout } from './layout'
import { DetailPodcast, EpisodeDetail, Home } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="podcast/:podcastId" element={<DetailLayout />}>
          <Route index element={<DetailPodcast />} />
          <Route path="episode/:episodeId" element={<EpisodeDetail />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
