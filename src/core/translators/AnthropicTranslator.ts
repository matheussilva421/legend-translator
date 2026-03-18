import { Anthropic } from '@anthropic-ai/sdk'
import { BaseTranslator } from './BaseTranslator'
import { SubtitleEntry } from '../types'

export class AnthropicTranslator extends BaseTranslator {
  private client: Anthropic

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  }

  async translate(entries: SubtitleEntry[]): Promise<SubtitleEntry[]> {
    const textToTranslate = entries.map(e => e.text).join('\n\n---\n\n')
    const prompt = this.buildPrompt(textToTranslate)

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })

    const translations = (response.content[0]?.text || '').split('\n\n---\n\n')

    return entries.map((entry, i) => ({
      ...entry,
      translation: translations[i]?.trim() || entry.text
    }))
  }
}
