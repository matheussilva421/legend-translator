import { BaseTranslator } from './BaseTranslator'
import { AnthropicTranslator } from './AnthropicTranslator'
import { OpenAITranslator } from './OpenAITranslator'
import { GeminiTranslator } from './GeminiTranslator'
import { ApiProvider } from '../types'

export class TranslatorFactory {
  static create(provider: ApiProvider, apiKey: string): BaseTranslator {
    switch (provider) {
      case 'anthropic':
        return new AnthropicTranslator(apiKey)
      case 'openai':
        return new OpenAITranslator(apiKey)
      case 'gemini':
        return new GeminiTranslator(apiKey)
      default:
        throw new Error(`Provider inválido: ${provider}`)
    }
  }
}
