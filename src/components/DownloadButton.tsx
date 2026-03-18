import { generateSRT } from '../core/srtGenerator'
import { useSubtitleStore } from '../hooks/useSubtitleStore'
import { Download } from 'lucide-react'

export function DownloadButton() {
  const { subtitles } = useSubtitleStore()

  const handleDownload = () => {
    const srtContent = generateSRT(subtitles)
    const blob = new Blob([srtContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'legendas-traduzidas.srt'
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={subtitles.length === 0}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-5 h-5" />
      Baixar .srt
    </button>
  )
}
