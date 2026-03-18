import { GoogleGenerativeAI } from '@google/generative-ai'
import { BaseTranslator } from './BaseTranslator'
import { SubtitleEntry } from '../types'

export class GeminiTranslator extends BaseTranslator {
  private client: ReturnType<typeof GoogleGenerativeAI.prototype.getGenerativeModel>

  constructor(apiKey: string) {
    super(apiKey)
    const genAI = new GoogleGenerativeAI(apiKey)
    this.client = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  }

  async translate(entries: SubtitleEntry[]): Promise<SubtitleEntry[]> {
    const textToTranslate = entries.map(e => e.text).join('\n\n---\n\n')
    const prompt = this.buildPrompt(textToTranslate)

    const response = await this.client.generateContent(prompt)
    const translations = response.response.text().split('\n\n---\n\n')

    return entries.map((entry, i) => ({
      ...entry,
      translation: translations[i]?.trim() || entry.text
    }))
  }
}
