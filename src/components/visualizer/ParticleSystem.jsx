/**
 * ParticleSystem Module
 * Manages particle effects for visualization
 */

export class Particle {
  constructor(x, y, vx, vy, color, size, life) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.color = color
    this.size = size
    this.life = life
    this.maxLife = life
    this.alpha = 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.1 // Gravity
    this.life -= 1
    this.alpha = Math.max(0, this.life / this.maxLife)
  }

  isDead() {
    return this.life <= 0
  }
}

export class ParticleSystem {
  constructor() {
    this.particles = []
  }

  emit(x, y, count = 5, color = 'rgba(168, 132, 255, 0.8)') {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2)
      const speed = Math.random() * 3 + 1
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      const size = Math.random() * 3 + 1
      const life = Math.random() * 30 + 20

      this.particles.push(new Particle(x, y, vx, vy, color, size, life))
    }
  }

  update() {
    this.particles.forEach((p) => p.update())
    this.particles = this.particles.filter((p) => !p.isDead())
  }

  clear() {
    this.particles = []
  }
}
