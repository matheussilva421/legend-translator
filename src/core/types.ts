export interface SubtitleEntry {
  id: string
  index: number
  startTime: string
  endTime: string
  text: string
  translation?: string
}

export type ApiProvider = 'anthropic' | 'openai' | 'gemini'

export interface ApiConfig {
  provider: ApiProvider
  apiKey: string
}
