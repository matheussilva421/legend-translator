import { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (file.name.endsWith('.srt')) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div
      data-testid="dropzone"
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors
        ${isDragging ? 'border-primary bg-surface' : 'border-border'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2">
        Arraste seu arquivo .srt aqui
      </h3>
      <p className="text-gray-400 mb-4">ou clique para selecionar</p>
      <input
        type="file"
        accept=".srt"
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="inline-block px-6 py-3 bg-primary text-background rounded-lg cursor-pointer hover:opacity-90"
      >
        Selecionar Arquivo
      </label>
    </div>
  )
}
