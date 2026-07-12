/**
 * Audio Engine Core
 * Handles Web Audio API for meditation frequencies
 */

let audioContext = null
let oscillator = null
let gainNode = null
let analyser = null
let dataArray = null

/**
 * Initialize Audio Context
 */
export function initAudio() {
  if (audioContext) return

  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  audioContext = new AudioContextClass()

  // Create analyser for visualization
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256
  dataArray = new Uint8Array(analyser.frequencyBinCount)

  return audioContext
}

/**
 * Play frequency
 * @param {number} frequency - Frequency in Hz (default 432)
 * @param {number} volume - Volume 0-1 (default 0.2)
 */
export function playFrequency(frequency = 432, volume = 0.2) {
  try {
    if (!audioContext) initAudio()

    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    // Stop existing oscillator
    stopFrequency()

    // Create new oscillator
    oscillator = audioContext.createOscillator()
    gainNode = audioContext.createGain()

    // Configure oscillator
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

    // Set volume
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime)

    // Connect to analyser and speakers
    oscillator.connect(gainNode)
    gainNode.connect(analyser)
    analyser.connect(audioContext.destination)

    // Start oscillation
    oscillator.start()

    return true
  } catch (error) {
    console.error('Audio Engine Error:', error)
    return false
  }
}

/**
 * Stop frequency
 */
export function stopFrequency() {
  try {
    if (oscillator) {
      oscillator.stop()
      oscillator.disconnect()
      oscillator = null
    }
    if (gainNode) {
      gainNode.disconnect()
      gainNode = null
    }
  } catch (error) {
    console.error('Error stopping audio:', error)
  }
}

/**
 * Set volume (0-1)
 */
export function setVolume(volume) {
  if (gainNode) {
    gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), audioContext.currentTime)
  }
}

/**
 * Get analyser data for visualization
 */
export function getFrequencyData() {
  if (!analyser || !dataArray) return null

  analyser.getByteFrequencyData(dataArray)
  return dataArray
}

/**
 * Get audio context (for advanced usage)
 */
export function getAudioContext() {
  return audioContext
}

/**
 * Get analyser node
 */
export function getAnalyser() {
  return analyser
}

/**
 * Check if audio is playing
 */
export function isPlaying() {
  return oscillator !== null
}
