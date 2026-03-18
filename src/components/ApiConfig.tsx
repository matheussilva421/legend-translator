import { useState } from 'react'
import { Settings } from 'lucide-react'
import { ApiProvider, ApiConfig as ApiConfigType } from '../core/types'

interface ApiConfigProps {
  onSave: (config: ApiConfigType) => void
}

const providers: { value: ApiProvider; label: string }[] = [
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Gemini' }
]

export function ApiConfig({ onSave }: ApiConfigProps) {
  const [provider, setProvider] = useState<ApiProvider>('anthropic')
  const [apiKey, setApiKey] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ provider, apiKey })
  }

  return (
    <div className="bg-surface rounded-lg p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Configuração da API</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="provider" className="block text-sm mb-2">
            Provider
          </label>
          <select
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value as ApiProvider)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
          >
            {providers.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="apiKey" className="block text-sm mb-2">
            API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primary text-background rounded-lg font-semibold hover:opacity-90"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
