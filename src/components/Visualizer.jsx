import { useEffect, useRef } from 'react'
import { startVisualization, stopVisualization } from '../core/visualEngine'
import Card from './common/Card'

/**
 * Visualizer Component
 * Real-time audio frequency visualization
 */
export default function Visualizer({ isActive = false }) {
  const canvasRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    if (isActive) {
      cleanupRef.current = startVisualization(canvasRef.current)
    } else {
      stopVisualization()
      // Clear canvas
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'rgba(11, 19, 37, 0.5)'
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
      stopVisualization()
    }
  }, [isActive])

  return (
    <Card className="p-4 mb-6">
      <div className="relative rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-gradient-to-b from-spiritual-900 to-spiritual-950"
          role="img"
          aria-label="Visualizador de áudio em tempo real"
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <p className="text-spiritual-400 text-sm font-medium">Pressione Iniciar para visualizar</p>
          </div>
        )}
      </div>
    </Card>
  )
}
