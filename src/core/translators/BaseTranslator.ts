import { SubtitleEntry } from '../types'

export abstract class BaseTranslator {
  protected apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  protected buildPrompt(text: string): string {
    return `Traduza o seguinte texto do inglês para Português do Brasil (PT-BR).
Mantenha o tom, estilo e contexto original. Preserve quebras de linha e formatação.

Texto para traduzir:
${text}`
  }

  abstract translate(entries: SubtitleEntry[]): Promise<SubtitleEntry[]>
}
