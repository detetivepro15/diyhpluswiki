import { useEffect, useRef } from 'react'
import Card from './common/Card'

/**
 * Visualizer Component
 * Canvas-based real-time audio visualization
 */
export default function Visualizer({ isPlaying, analyser }) {
  const canvasRef = useRef(null)
  const animationIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !analyser) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const render = () => {
      animationIdRef.current = requestAnimationFrame(render)

      if (isPlaying) {
        analyser.getByteFrequencyData(dataArray)
      }

      // Limpar canvas com fade
      ctx.fillStyle = 'rgba(11, 19, 37, 0.1)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Desenhar barras de frequência
      const barWidth = Math.ceil(canvas.offsetWidth / dataArray.length) + 1
      let x = 0

      for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i]
        const height = (value / 255) * canvas.offsetHeight

        // Gradiente dourado
        const gradient = ctx.createLinearGradient(
          0,
          canvas.offsetHeight - height,
          0,
          canvas.offsetHeight
        )
        gradient.addColorStop(0, '#d4af37')
        gradient.addColorStop(1, '#8b5cf6')

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.offsetHeight - height, barWidth, height)

        x += barWidth
      }
    }

    window.addEventListener('resize', resizeCanvas)
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isPlaying, analyser])

  return (
    <Card className="p-4 mb-6 bg-spiritual-800 border border-spiritual-700">
      <div className="relative rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-64 md:h-96 bg-gradient-to-b from-spiritual-900 to-spiritual-950"
          role="img"
          aria-label="Visualizador de áudio em tempo real"
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <p className="text-spiritual-400 text-sm font-medium">Pressione Iniciar para visualizar</p>
          </div>
        )}
      </div>
    </Card>
  )
}
