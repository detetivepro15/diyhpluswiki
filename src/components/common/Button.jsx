/**
 * Button Component
 * Reusable button with multiple variants
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-spiritual-600 hover:bg-spiritual-500 text-white border border-spiritual-500',
    secondary:
      'bg-spiritual-800 hover:bg-spiritual-700 text-spiritual-100 border border-spiritual-600',
    danger: 'bg-red-600 hover:bg-red-500 text-white border border-red-500',
    success: 'bg-green-600 hover:bg-green-500 text-white border border-green-500',
    outline: 'bg-transparent hover:bg-spiritual-700 text-spiritual-300 border border-spiritual-600',
  }

  const variantClasses = variants[variant] || variants.primary

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
