import { useState, useEffect, useCallback } from 'react'
import {
  playFrequency,
  stopFrequency,
  setVolume as setAudioVolume,
  isPlaying as getIsPlaying,
} from '../core/audioEngine'

/**
 * useAudio Hook
 * Manages audio playback and state
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(432)
  const [volume, setVolume] = useState(0.3)

  // Play audio
  const play = useCallback((freq = frequency, vol = volume) => {
    const success = playFrequency(freq, vol)
    if (success) {
      setIsPlaying(true)
      setFrequency(freq)
      setVolume(vol)
    }
    return success
  }, [frequency, volume])

  // Stop audio
  const stop = useCallback(() => {
    stopFrequency()
    setIsPlaying(false)
  }, [])

  // Toggle playback
  const toggle = useCallback(() => {
    if (getIsPlaying()) {
      stop()
    } else {
      play()
    }
  }, [play, stop])

  // Update volume
  const updateVolume = useCallback((newVolume) => {
    setAudioVolume(newVolume)
    setVolume(newVolume)
  }, [])

  // Update frequency
  const updateFrequency = useCallback((newFrequency) => {
    setFrequency(newFrequency)
    if (isPlaying) {
      stop()
      playFrequency(newFrequency, volume)
      setIsPlaying(true)
    }
  }, [isPlaying, volume, stop])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopFrequency()
    }
  }, [])

  return {
    isPlaying,
    frequency,
    volume,
    play,
    stop,
    toggle,
    updateVolume,
    updateFrequency,
  }
}
