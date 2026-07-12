/**
 * Card Component
 * Reusable card wrapper with consistent styling
 */
export default function Card({
  children,
  className = '',
  hover = false,
  ...props
}) {
  const baseClasses =
    'rounded-lg border border-spiritual-700 bg-spiritual-900 bg-opacity-50 backdrop-blur-sm'
  const hoverClass = hover ? 'hover:border-spiritual-500 transition-all duration-200' : ''

  return (
    <div className={`${baseClasses} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
