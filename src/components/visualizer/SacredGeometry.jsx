/**
 * SacredGeometry Component
 * Renders sacred geometric patterns
 */
export function drawMandala(ctx, centerX, centerY, radius, rotation = 0) {
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(rotation)

  const petals = 8
  for (let i = 0; i < petals; i++) {
    ctx.save()
    ctx.rotate((i / petals) * Math.PI * 2)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'
    ctx.beginPath()
    ctx.ellipse(0, radius * 0.7, radius * 0.4, radius * 0.8, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  ctx.fillStyle = 'rgba(168, 132, 255, 0.5)'
  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/**
 * Draws a harmonic wave pattern
 */
export function drawHarmonicWave(ctx, centerX, centerY, frequency, amplitude, phase) {
  ctx.strokeStyle = 'rgba(168, 132, 255, 0.6)'
  ctx.lineWidth = 2
  ctx.beginPath()

  const points = 200
  for (let i = 0; i < points; i++) {
    const x = centerX + (i / points) * 400 - 200
    const y = centerY + Math.sin((i / points) * frequency + phase) * amplitude
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  ctx.stroke()
}

/**
 * Draws a flower of life pattern
 */
export function drawFlowerOfLife(ctx, centerX, centerY, radius, petals = 6) {
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  ctx.strokeStyle = 'rgba(168, 132, 255, 0.6)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.stroke()
}
