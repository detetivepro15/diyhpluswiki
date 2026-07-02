import Header from './components/layout/Header'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import Player from './components/Player'
import InstallBanner from './components/InstallBanner'
import { useState } from 'react'

/**
 * Main App Component
 * Orchestrates layout and manages active view state
 */
export default function App() {
  const [activeTab] = useState('player')

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-900 via-spiritual-800 to-spiritual-900 text-white flex flex-col">
      <Header />
      <Navigation activeTab={activeTab} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl w-full overflow-y-auto">
        <Player />
      </main>
      <Footer />
      <InstallBanner />
    </div>
  )
}
