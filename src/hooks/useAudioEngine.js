import { useEffect, useRef } from 'react'

/**
 * useAudioEngine Hook
 * Gerencia reprodução de áudio com Web Audio API
 */
export default function useAudioEngine(frequency = 432, isPlaying = false) {
  const audioContextRef = useRef(null)
  const oscillatorRef = useRef(null)
  const gainNodeRef = useRef(null)
  const analyserRef = useRef(null)

  // Inicializar contexto de áudio
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()

      // Criar analyser para visualização
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
    }

    return () => {
      // Cleanup ao desmontar
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
          oscillatorRef.current.disconnect()
        } catch (e) {
          // Ignorar erro se já foi parado
        }
      }
    }
  }, [])

  // Controlar reprodução
  useEffect(() => {
    const ctx = audioContextRef.current
    if (!ctx) return

    // Resumir contexto se suspenso (política de autoplay)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    if (isPlaying) {
      // Parar oscilador anterior
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
          oscillatorRef.current.disconnect()
        } catch (e) {
          // Ignorar
        }
      }

      // Criar novo oscilador
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
      gain.gain.setValueAtTime(0.2, ctx.currentTime)

      osc.connect(gain)
      gain.connect(analyserRef.current)
      analyserRef.current.connect(ctx.destination)

      osc.start()

      oscillatorRef.current = osc
      gainNodeRef.current = gain
    } else {
      // Parar oscilador
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
          oscillatorRef.current.disconnect()
          oscillatorRef.current = null
          gainNodeRef.current = null
        } catch (e) {
          // Ignorar
        }
      }
    }
  }, [isPlaying, frequency])

  // Métodos públicos
  const play = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }

  const stop = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
        oscillatorRef.current = null
      } catch (e) {
        // Ignorar
      }
    }
  }

  const setVolume = (volume) => {
    if (gainNodeRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, volume))
      gainNodeRef.current.gain.setValueAtTime(clampedVolume, audioContextRef.current.currentTime)
    }
  }

  return { play, stop, setVolume, analyser: analyserRef.current }
}
