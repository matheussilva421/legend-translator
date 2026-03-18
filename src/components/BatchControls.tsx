import { useState } from 'react'
import { useSubtitleStore } from '../hooks/useSubtitleStore'
import { TranslatorFactory } from '../core/translators/TranslatorFactory'
import { Sparkles } from 'lucide-react'

export function BatchControls() {
  const { subtitles, selectedIds, apiConfig, updateTranslation } = useSubtitleStore()
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBatchTranslate = async () => {
    if (!apiConfig) {
      setError('Configure a API primeiro')
      return
    }

    setIsTranslating(true)
    setError(null)

    try {
      const entriesToTranslate = subtitles.filter((entry) =>
        selectedIds.has(entry.id)
      )

      if (entriesToTranslate.length === 0) {
        setError('Selecione pelo menos uma legenda')
        return
      }

      const translator = TranslatorFactory.create(apiConfig.provider, apiConfig.apiKey)
      const translated = await translator.translate(entriesToTranslate)

      translated.forEach((entry) => {
        updateTranslation(entry.id, entry.translation || '')
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na tradução')
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <button
        onClick={handleBatchTranslate}
        disabled={isTranslating || selectedIds.size === 0}
        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5" />
        {isTranslating ? 'Traduzindo...' : `Traduzir Selecionadas (${selectedIds.size})`}
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
