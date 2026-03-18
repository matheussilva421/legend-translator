import { describe, it, expect } from 'vitest'
import { parseSRT } from '../../src/core/srtParser'

describe('parseSRT', () => {
  it('parseia arquivo SRT válido com múltiplas entradas', () => {
    const srt = `1
00:00:00,000 --> 00:00:05,000
Hello, world!

2
00:00:05,000 --> 00:00:10,000
This is a subtitle.`

    const result = parseSRT(srt)
    expect(result).toHaveLength(2)
    expect(result[0].text).toBe('Hello, world!')
    expect(result[0].startTime).toBe('00:00:00,000')
  })

  it('preserva quebras de linha no texto', () => {
    const srt = `1
00:00:00,000 --> 00:00:05,000
First line
Second line`

    const result = parseSRT(srt)
    expect(result[0].text).toBe('First line\nSecond line')
  })

  it('retorna array vazio para entrada vazia', () => {
    expect(parseSRT('')).toEqual([])
  })
})
