/**
 * Header Component
 * Displays the main title and application branding
 */
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-spiritual-900 to-spiritual-800 border-b border-spiritual-700 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-spiritual-300 to-spiritual-100 bg-clip-text text-transparent">
              Sinfonia do Amor Sobrenatural
            </h1>
            <p className="text-spiritual-300 mt-2 text-sm md:text-base">
              Uma experiência de meditação e reflexão teológica
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-sm text-spiritual-400">v1.0.0</div>
          </div>
        </div>
      </div>
    </header>
  )
}
