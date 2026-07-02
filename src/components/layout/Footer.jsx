/**
 * Footer Component
 * Application footer with information and credits
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-spiritual-900 border-t border-spiritual-700 py-6 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-spiritual-300 font-semibold mb-2">Sobre</h3>
            <p className="text-sm text-spiritual-400">
              Sinfonia do Amor Sobrenatural é uma experiência interativa de meditação
              com integração de tecnologia de áudio e reflexão espiritual.
            </p>
          </div>
          <div>
            <h3 className="text-spiritual-300 font-semibold mb-2">Recursos</h3>
            <ul className="text-sm text-spiritual-400 space-y-1">
              <li>🎵 Player de Meditação</li>
              <li>🎨 Visualizador em Canvas</li>
              <li>📖 Painel de Letras Sincronizadas</li>
              <li>🙏 Reflexão Teológica</li>
            </ul>
          </div>
          <div>
            <h3 className="text-spiritual-300 font-semibold mb-2">Tecnologia</h3>
            <p className="text-sm text-spiritual-400">
              React • Vite • Tailwind CSS • Web Audio API
            </p>
          </div>
        </div>
        <div className="border-t border-spiritual-700 pt-6 text-center text-sm text-spiritual-500">
          <p>&copy; {currentYear} Sinfonia do Amor Sobrenatural. Todos os direitos reservados.</p>
          <p className="mt-2">Licença MIT | <a href="#" className="text-spiritual-400 hover:text-spiritual-300">Código Fonte</a></p>
        </div>
      </div>
    </footer>
  )
}
