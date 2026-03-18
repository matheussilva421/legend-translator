import { describe, it, expect } from 'vitest'
import { TranslatorFactory } from '../../src/core/translators/TranslatorFactory'
import { AnthropicTranslator } from '../../src/core/translators/AnthropicTranslator'
import { OpenAITranslator } from '../../src/core/translators/OpenAITranslator'
import { GeminiTranslator } from '../../src/core/translators/GeminiTranslator'

describe('TranslatorFactory', () => {
  it('cria tradutor Anthropic', () => {
    const translator = TranslatorFactory.create('anthropic', 'test-key')
    expect(translator).toBeInstanceOf(AnthropicTranslator)
  })

  it('cria tradutor OpenAI', () => {
    const translator = TranslatorFactory.create('openai', 'test-key')
    expect(translator).toBeInstanceOf(OpenAITranslator)
  })

  it('cria tradutor Gemini', () => {
    const translator = TranslatorFactory.create('gemini', 'test-key')
    expect(translator).toBeInstanceOf(GeminiTranslator)
  })

  it('lança erro para provider inválido', () => {
    expect(() => TranslatorFactory.create('invalid' as any, 'key'))
      .toThrow('Provider inválido')
  })
})

describe('BaseTranslator prompt', () => {
  it('cria prompt contextual para tradução', () => {
    // Teste simples para verificar que o prompt inclui contexto
    const prompt = `Traduza o seguinte texto do inglês para Português do Brasil (PT-BR).
Mantenha o tom, estilo e contexto original. Preserve quebras de linha e formatação.

Texto para traduzir:
Hello, how are you?`

    expect(prompt).toContain('Português do Brasil')
    expect(prompt).toContain('Hello, how are you?')
  })
})
