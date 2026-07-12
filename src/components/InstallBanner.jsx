import { useState, useEffect } from 'react'
import { usePWA } from '../hooks/usePWA'
import Button from './common/Button'
import Card from './common/Card'

/**
 * Install Banner Component
 * Prompts user to install app
 */
export default function InstallBanner() {
  const { canInstall, isInstalled, installApp } = usePWA()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already installed or dismissed
    if (isInstalled || dismissed) return
  }, [isInstalled, dismissed])

  if (!canInstall || isInstalled || dismissed) return null

  return (
    <Card className="fixed bottom-4 right-4 max-w-sm p-4 z-40 bg-gradient-to-r from-spiritual-600 to-spiritual-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-white mb-1">Instalar App</h3>
          <p className="text-sm text-spiritual-100">
            Instale a Sinfonia do Amor Sobrenatural no seu dispositivo
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setDismissed(true)}
            className="text-xs px-3 py-1"
          >
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              installApp()
              setDismissed(true)
            }}
            className="text-xs px-3 py-1"
          >
            Instalar
          </Button>
        </div>
      </div>
    </Card>
  )
}
