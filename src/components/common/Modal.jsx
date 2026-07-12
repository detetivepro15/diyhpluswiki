import { useState } from 'react'
import Button from './Button'

/**
 * Modal Component
 * Dialog window overlay
 */
export default function Modal({ title, children, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-spiritual-900 border-2 border-spiritual-700 rounded-xl p-6 max-w-md w-full mx-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-spiritual-300 mb-4">{title}</h2>
        <div className="text-spiritual-200 mb-6">{children}</div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              Confirmar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
