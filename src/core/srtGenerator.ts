import { SubtitleEntry } from './types'

export function generateSRT(entries: SubtitleEntry[]): string {
  return entries.map((entry, i) => {
    const text = entry.translation || entry.text
    return `${i + 1}\n${entry.startTime} --> ${entry.endTime}\n${text}`
  }).join('\n\n')
}
