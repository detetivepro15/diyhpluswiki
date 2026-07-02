import Button from '../common/Button'

const NAV_ITEMS = [
  { id: 'player', label: '🎵 Player', icon: '♪' },
  { id: 'lyrics', label: '📖 Letras', icon: '✍️' },
  { id: 'theology', label: '🙏 Teologia', icon: '✝️' },
  { id: 'chamber', label: '💭 Câmara', icon: '🔮' },
]

/**
 * Navigation Component
 * Provides tab-based navigation between main views
 */
export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-spiritual-800 border-b border-spiritual-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap gap-2 py-4">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? 'primary' : 'secondary'}
              className="text-sm md:text-base"
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
