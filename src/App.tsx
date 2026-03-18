import { useState, useCallback, useEffect } from 'react'
import { UploadZone } from './components/UploadZone'
import { ApiConfig } from './components/ApiConfig'
import { SubtitleList } from './components/SubtitleList'
import { SubtitleEditor } from './components/SubtitleEditor'
import { BatchControls } from './components/BatchControls'
import { DownloadButton } from './components/DownloadButton'
import { useSubtitleStore } from './hooks/useSubtitleStore'
import { parseSRT } from './core/srtParser'
import { SubtitleEntry, ApiConfig as ApiConfigType } from './core/types'

function App() {
  const { setSubtitles, setApiConfig, apiConfig } = useSubtitleStore()
  const [selectedEntry, setSelectedEntry] = useState<SubtitleEntry | undefined>()
  const [hasFile, setHasFile] = useState(false)

  const handleFileSelect = useCallback(async (file: File) => {
    const text = await file.text()
    const entries = parseSRT(text)
    setSubtitles(entries)
    setHasFile(true)
  }, [setSubtitles])

  const handleApiSave = useCallback((config: ApiConfigType) => {
    setApiConfig(config)
    localStorage.setItem('legend-translator-api', JSON.stringify(config))
  }, [setApiConfig])

  useEffect(() => {
    const saved = localStorage.getItem('legend-translator-api')
    if (saved) {
      try {
        setApiConfig(JSON.parse(saved))
      } catch (e) {
        console.error('Erro ao carregar config da API')
      }
    }
  }, [setApiConfig])

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Legend Translator
        </h1>
        <p className="text-gray-400">
          Tradução de legendas .srt com Inteligência Artificial
        </p>
      </header>

      {!hasFile ? (
        <UploadZone onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <ApiConfig onSave={handleApiSave} />
            <BatchControls />
            <SubtitleList onSelectEntry={setSelectedEntry} />
          </div>

          <div className="space-y-6">
            <SubtitleEditor entry={selectedEntry} />
            <DownloadButton />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
