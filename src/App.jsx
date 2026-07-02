import { useState } from 'react'
import Header from './components/layout/Header'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import MeditationPlayer from './components/audio/MeditationPlayer'
import Visualizer from './components/visualizer/Visualizer'
import LyricsPanel from './components/lyrics/LyricsPanel'
import TheologyPanel from './components/theology/TheologyPanel'
import Chamber from './components/chamber/Chamber'

/**
 * Main App Component
 * Orchestrates layout and manages active view state
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('player')

  const renderContent = () => {
    switch (activeTab) {
      case 'player':
        return <MeditationPlayer />
      case 'lyrics':
        return <LyricsPanel />
      case 'theology':
        return <TheologyPanel />
      case 'chamber':
        return <Chamber />
      default:
        return <MeditationPlayer />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-900 via-spiritual-800 to-spiritual-900 text-white flex flex-col">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}
