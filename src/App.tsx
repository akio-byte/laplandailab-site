import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToHash from './components/utility/ScrollToHash'
import HomePage from './pages/HomePage'
import UpdateArticlePage from './app/updates/[slug]/page'
import UpdatesPage from './app/updates/page'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/updates/:slug" element={<UpdateArticlePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
