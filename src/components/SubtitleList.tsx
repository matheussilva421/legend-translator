import { useSubtitleStore } from '../hooks/useSubtitleStore'
import { SubtitleEntry } from '../core/types'

interface SubtitleListProps {
  onSelectEntry: (entry: SubtitleEntry) => void
  selectedId?: string
}

export function SubtitleList({ onSelectEntry, selectedId }: SubtitleListProps) {
  const { subtitles, selectedIds, toggleSelection } = useSubtitleStore()

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Legendas ({subtitles.length})</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {subtitles.map((entry) => (
          <div
            key={entry.id}
            onClick={() => onSelectEntry(entry)}
            className={`p-4 border-b border-border cursor-pointer hover:bg-background transition-colors
              ${selectedId === entry.id ? 'bg-background border-primary' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-mono">
                {entry.startTime} → {entry.endTime}
              </span>
              <input
                type="checkbox"
                checked={selectedIds.has(entry.id)}
                onChange={(e) => {
                  e.stopPropagation()
                  toggleSelection(entry.id)
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4"
              />
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">
              {entry.text}
            </p>
            {entry.translation && (
              <p className="text-sm text-primary mt-1 line-clamp-2">
                {entry.translation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
