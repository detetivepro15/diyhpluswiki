import { useEffect, useRef } from 'react'
import useVisualizer from '../../hooks/useVisualizer'

/**
 * Visualizer Component
 * Canvas-based audio visualizer with particle system
 */
export default function Visualizer({ isPlaying, frequency }) {
  const canvasRef = useRef(null)
  const { particleSystems, update } = useVisualizer(isPlaying, frequency)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation loop
    let animationId

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update and render particles
      update()
      particleSystems.forEach((system) => {
        system.forEach((particle) => {
          ctx.fillStyle = particle.color
          ctx.globalAlpha = particle.alpha
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })
      })
      ctx.globalAlpha = 1

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isPlaying, frequency, update, particleSystems])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-64 md:h-96 bg-gradient-to-b from-spiritual-900 to-spiritual-950 rounded-lg border border-spiritual-700"
        role="img"
        aria-label="Visualizador de áudio"
      />
      <div className="absolute inset-0 pointer-events-none rounded-lg border border-spiritual-700"></div>
    </div>
  )
}
