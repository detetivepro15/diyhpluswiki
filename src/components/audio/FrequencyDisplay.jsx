/**
 * FrequencyDisplay Component
 * Shows information about the current frequency
 */
export default function FrequencyDisplay({ frequency }) {
  const FREQUENCY_INFO = {
    396: {
      chakra: 'Raiz',
      element: 'Terra',
      benefit: 'Liberação de culpa e medo',
      color: 'bg-red-500',
    },
    432: {
      chakra: 'Coração',
      element: 'Ar',
      benefit: 'Harmonia e intuição',
      color: 'bg-green-500',
    },
    528: {
      chakra: 'Plexo Solar',
      element: 'Fogo',
      benefit: 'Transformação e milagres',
      color: 'bg-yellow-500',
    },
    741: {
      chakra: 'Garganta',
      element: 'Éter',
      benefit: 'Expressão e comunicação',
      color: 'bg-blue-500',
    },
    852: {
      chakra: 'Terceiro Olho',
      element: 'Luz',
      benefit: 'Intuição e visão',
      color: 'bg-indigo-500',
    },
    963: {
      chakra: 'Coroa',
      element: 'Espírito',
      benefit: 'Iluminação e conexão divina',
      color: 'bg-purple-500',
    },
  }

  const info = FREQUENCY_INFO[frequency] || FREQUENCY_INFO[432]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-spiritual-300">🔊 Frequência: {frequency} Hz</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-spiritual-900 rounded-lg p-4 border border-spiritual-700">
          <p className="text-sm text-spiritual-400 mb-1">Chacra Associado</p>
          <p className="text-lg font-semibold text-spiritual-200">{info.chakra}</p>
        </div>
        <div className="bg-spiritual-900 rounded-lg p-4 border border-spiritual-700">
          <p className="text-sm text-spiritual-400 mb-1">Elemento</p>
          <p className="text-lg font-semibold text-spiritual-200">{info.element}</p>
        </div>
        <div className="md:col-span-2 bg-spiritual-900 rounded-lg p-4 border border-spiritual-700">
          <p className="text-sm text-spiritual-400 mb-1">Benefício</p>
          <p className="text-lg font-semibold text-spiritual-200">{info.benefit}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-spiritual-900 rounded-lg border border-spiritual-700">
        <div className={`w-12 h-12 rounded-full ${info.color}`}></div>
        <p className="text-sm text-spiritual-400">
          Visualização em progresso com frequência{' '}
          <span className="font-semibold text-spiritual-200">{frequency} Hz</span>
        </p>
      </div>
    </div>
  )
}
