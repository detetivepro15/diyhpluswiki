import { useState } from 'react'
import useAudioEngine from '../hooks/useAudioEngine'
import Visualizer from './Visualizer'
import Button from './common/Button'
import Card from './common/Card'

/**
 * Player Component
 * Main meditation player interface
 */
export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(432)
  const [volume, setVolume] = useState(0.3)

  const audio = useAudioEngine(frequency, isPlaying)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audio.setVolume(newVolume)
  }

  const handleFrequencyChange = (newFreq) => {
    setFrequency(newFreq)
  }

  const FREQUENCIES = [
    { name: 'Raiz (396 Hz)', value: 396 },
    { name: 'Sagrado (432 Hz)', value: 432 },
    { name: 'Coração (528 Hz)', value: 528 },
    { name: 'Voz (741 Hz)', value: 741 },
    { name: 'Terceiro Olho (852 Hz)', value: 852 },
    { name: 'Coroa (963 Hz)', value: 963 },
  ]

  return (
    <div className="space-y-6">
      {/* Visualizer */}
      <Visualizer isPlaying={isPlaying} analyser={audio.analyser} />

      {/* Controls */}
      <Card className="p-6 bg-spiritual-800 border border-spiritual-700">
        <h2 className="text-2xl font-bold text-spiritual-300 mb-6">🎵 Player de Meditação</h2>

        {/* Play/Pause Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={handlePlayPause}
            variant={isPlaying ? 'danger' : 'primary'}
            className="text-lg py-3 px-8"
            aria-label={isPlaying ? 'Pausar meditação' : 'Iniciar meditação'}
          >
            {isPlaying ? '⏸️ Pausar' : '▶️ Iniciar'}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2 mb-6">
          <label htmlFor="volume" className="block text-sm font-medium text-spiritual-300">
            🔊 Volume: {Math.round(volume * 100)}%
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-spiritual-700 rounded-lg appearance-none cursor-pointer accent-spiritual-500"
            aria-label="Controlar volume"
          />
        </div>

        {/* Frequency Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-spiritual-300">📊 Selecione a Frequência</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {FREQUENCIES.map((freq) => (
              <button
                key={freq.value}
                onClick={() => handleFrequencyChange(freq.value)}
                className={`p-3 rounded-lg transition-all duration-200 font-medium ${
                  frequency === freq.value
                    ? 'bg-spiritual-500 border-2 border-spiritual-300 text-white shadow-lg'
                    : 'bg-spiritual-700 border border-spiritual-600 text-spiritual-200 hover:border-spiritual-500 hover:bg-spiritual-600'
                }`}
                aria-pressed={frequency === freq.value}
              >
                {freq.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-spiritual-900 border border-spiritual-700 rounded-lg p-4 text-sm text-spiritual-300 mt-6">
          <p>
            <strong>💡 Dica:</strong> Use frequências sagradas para meditação. A frequência 432 Hz é conhecida como o
            "Diapasão do Universo".
          </p>
        </div>
      </Card>

      {/* Current Frequency Info */}
      <Card className="p-6 bg-spiritual-800 border border-spiritual-700">
        <h3 className="text-xl font-bold text-spiritual-300 mb-4">🎼 Frequência Atual: {frequency} Hz</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-spiritual-900 rounded-lg p-4 border border-spiritual-700">
            <p className="text-sm text-spiritual-400 mb-1">Status</p>
            <p className="text-lg font-semibold text-spiritual-200">{isPlaying ? '▶️ Reproduzindo' : '⏸️ Parado'}</p>
          </div>
          <div className="bg-spiritual-900 rounded-lg p-4 border border-spiritual-700">
            <p className="text-sm text-spiritual-400 mb-1">Volume</p>
            <p className="text-lg font-semibold text-spiritual-200">{Math.round(volume * 100)}%</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
