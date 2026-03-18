import type { SubtitleEntry } from './types'

const TIMESTAMP_REGEX = /(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function parseSRT(content: string): SubtitleEntry[] {
  if (!content.trim()) return []

  const entries: SubtitleEntry[] = []
  const blocks = content.split(/\n\s*\n/)

  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length < 3) continue

    const index = parseInt(lines[0], 10)
    if (isNaN(index)) continue

    const timestampMatch = lines[1].match(TIMESTAMP_REGEX)
    if (!timestampMatch) continue

    const text = lines.slice(2).join('\n')

    entries.push({
      id: generateId(),
      index,
      startTime: timestampMatch[1],
      endTime: timestampMatch[2],
      text
    })
  }

  return entries
}
