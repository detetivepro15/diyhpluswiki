/**
 * Visual Engine Core
 * Handles canvas-based visualization of audio
 */

import { getFrequencyData } from './audioEngine'

let animationId = null

/**
 * Start visualization
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {object} options - Configuration
 */
export function startVisualization(canvas, options = {}) {
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

  // Visualization loop
  const render = () => {
    animationId = requestAnimationFrame(render)

    const data = getFrequencyData()
    if (!data) return

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(11, 19, 37, 0.1)'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw frequency bars
    const barWidth = Math.ceil(canvas.offsetWidth / data.length) + 1
    let x = 0

    for (let i = 0; i < data.length; i++) {
      const value = data[i]
      const height = (value / 255) * canvas.offsetHeight

      // Golden gradient
      const gradient = ctx.createLinearGradient(0, canvas.offsetHeight - height, 0, canvas.offsetHeight)
      gradient.addColorStop(0, '#d4af37')
      gradient.addColorStop(1, '#8b5cf6')

      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.offsetHeight - height, barWidth, height)

      x += barWidth
    }
  }

  // Handle resize
  window.addEventListener('resize', resizeCanvas)

  render()

  return () => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resizeCanvas)
  }
}

/**
 * Stop visualization
 */
export function stopVisualization() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}
