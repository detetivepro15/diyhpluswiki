import { useState } from 'react'
import AudioControls from './AudioControls'
import FrequencyDisplay from './FrequencyDisplay'
import Visualizer from '../visualizer/Visualizer'
import Card from '../common/Card'

/**
 * MeditationPlayer Component
 * Main audio player interface with controls and visualizer
 */
export default function MeditationPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(432)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  return (
    <div className="space-y-6">
      <Card className="bg-spiritual-800 border border-spiritual-700">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-spiritual-300">🎵 Player de Meditação</h2>
          <Visualizer isPlaying={isPlaying} frequency={frequency} />
        </div>
      </Card>

      <Card className="bg-spiritual-800 border border-spiritual-700">
        <div className="p-6">
          <AudioControls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            frequency={frequency}
            setFrequency={setFrequency}
            duration={duration}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
          />
        </div>
      </Card>

      <Card className="bg-spiritual-800 border border-spiritual-700">
        <div className="p-6">
          <FrequencyDisplay frequency={frequency} />
        </div>
      </Card>
    </div>
  )
}
