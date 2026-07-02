/**
 * Tabs Component
 * Tab navigation interface
 */
export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 border-b border-spiritual-700 overflow-x-auto pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-spiritual-600 text-white border-b-2 border-spiritual-400'
              : 'bg-spiritual-800 text-spiritual-300 hover:bg-spiritual-700'
          }`}
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
