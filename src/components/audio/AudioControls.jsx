import { useState, useEffect } from 'react'
import useAudioEngine from '../../hooks/useAudioEngine'
import Button from '../common/Button'

/**
 * AudioControls Component
 * Provides playback controls and frequency selection
 */
export default function AudioControls({
  isPlaying,
  setIsPlaying,
  frequency,
  setFrequency,
}) {
  const audioEngine = useAudioEngine(frequency, isPlaying)
  const [volume, setVolume] = useState(0.3)

  useEffect(() => {
    if (audioEngine) {
      audioEngine.setVolume(volume)
    }
  }, [volume, audioEngine])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioEngine?.stop()
    } else {
      audioEngine?.play()
    }
    setIsPlaying(!isPlaying)
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
      {/* Playback Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
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
      <div className="space-y-2">
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
          onChange={(e) => setVolume(parseFloat(e.target.value))}
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
              onClick={() => setFrequency(freq.value)}
              className={`p-3 rounded-lg transition-all duration-200 ${
                frequency === freq.value
                  ? 'bg-spiritual-500 border-2 border-spiritual-300 text-white'
                  : 'bg-spiritual-700 border border-spiritual-600 text-spiritual-200 hover:border-spiritual-500'
              }`}
              aria-pressed={frequency === freq.value}
            >
              {freq.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-spiritual-900 border border-spiritual-700 rounded-lg p-4 text-sm text-spiritual-300">
        <p>
          <strong>💡 Dica:</strong> Use frequências sagradas para meditação. A frequência 432 Hz
          é conhecida como o "Diapasão do Universo".
        </p>
      </div>
    </div>
  )
}
