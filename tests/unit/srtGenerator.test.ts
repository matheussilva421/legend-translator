import { describe, it, expect } from 'vitest'
import { generateSRT } from '../../src/core/srtGenerator'
import { SubtitleEntry } from '../../src/core/types'

describe('generateSRT', () => {
  it('gera arquivo SRT válido a partir de entradas', () => {
    const entries: SubtitleEntry[] = [
      {
        id: 'abc123',
        index: 1,
        startTime: '00:00:00,000',
        endTime: '00:00:05,000',
        text: 'Olá, mundo!',
        translation: 'Hello, world!'
      }
    ]

    const result = generateSRT(entries)
    expect(result).toContain('1')
    expect(result).toContain('00:00:00,000 --> 00:00:05,000')
    expect(result).toContain('Hello, world!')
  })

  it('usa tradução quando disponível, senão usa texto original', () => {
    const entries: SubtitleEntry[] = [
      {
        id: 'abc123',
        index: 1,
        startTime: '00:00:00,000',
        endTime: '00:00:05,000',
        text: 'Original text'
      }
    ]

    const result = generateSRT(entries)
    expect(result).toContain('Original text')
  })
})
