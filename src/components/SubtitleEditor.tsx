import { useState, useEffect } from 'react'
import { useSubtitleStore } from '../hooks/useSubtitleStore'
import { SubtitleEntry } from '../core/types'

interface SubtitleEditorProps {
  entry?: SubtitleEntry
}

export function SubtitleEditor({ entry }: SubtitleEditorProps) {
  const { updateTranslation } = useSubtitleStore()
  const [translation, setTranslation] = useState('')

  useEffect(() => {
    setTranslation(entry?.translation || '')
  }, [entry])

  const handleChange = (value: string) => {
    setTranslation(value)
    if (entry) {
      updateTranslation(entry.id, value)
    }
  }

  if (!entry) {
    return (
      <div className="bg-surface rounded-lg border border-border p-8 text-center text-gray-400">
        Selecione uma legenda para editar
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Editor</h3>
        <p className="text-xs text-gray-400 font-mono mt-1">
          {entry.startTime} → {entry.endTime}
        </p>
      </div>

      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="p-4">
          <label className="block text-xs text-gray-400 mb-2">Original (EN)</label>
          <p className="text-sm whitespace-pre-wrap">{entry.text}</p>
        </div>

        <div className="p-4">
          <label className="block text-xs text-gray-400 mb-2">Tradução (PT-BR)</label>
          <textarea
            value={translation}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-32 bg-background border border-border rounded p-2 text-sm focus:outline-none focus:border-primary resize-none"
            placeholder="Digite a tradução..."
          />
        </div>
      </div>
    </div>
  )
}
