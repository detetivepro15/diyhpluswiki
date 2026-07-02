/**
 * Loader Component
 * Loading spinner animation
 */
export default function Loader({ text = 'Carregando...', size = 'md' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} border-4 border-spiritual-700 border-t-spiritual-400 rounded-full animate-spin`}></div>
      <p className="text-spiritual-300 text-sm">{text}</p>
    </div>
  )
}
