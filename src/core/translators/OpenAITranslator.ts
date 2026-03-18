import OpenAI from 'openai'
import { BaseTranslator } from './BaseTranslator'
import type { SubtitleEntry } from '../types'

export class OpenAITranslator extends BaseTranslator {
  private client: OpenAI

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
  }

  async translate(entries: SubtitleEntry[]): Promise<SubtitleEntry[]> {
    const textToTranslate = entries.map(e => e.text).join('\n\n---\n\n')
    const prompt = this.buildPrompt(textToTranslate)

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })

    const translations = (response.choices[0]?.message.content || '').split('\n\n---\n\n')

    return entries.map((entry, i) => ({
      ...entry,
      translation: translations[i]?.trim() || entry.text
    }))
  }
}
