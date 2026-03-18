import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UploadZone } from '../../src/components/UploadZone'

describe('UploadZone', () => {
  it('renderiza área de drop', () => {
    render(<UploadZone onFileSelect={vi.fn()} />)
    expect(screen.getByText(/arraste.*arquivo/i)).toBeInTheDocument()
  })

  it('chama onFileSelect ao soltar arquivo .srt', () => {
    const onFileSelect = vi.fn()
    render(<UploadZone onFileSelect={onFileSelect} />)

    const file = new File(['test content'], 'test.srt', { type: 'text/plain' })
    const dropzone = screen.getByTestId('dropzone')

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] }
    })

    expect(onFileSelect).toHaveBeenCalledWith(file)
  })

  it('rejeita arquivos que não são .srt', () => {
    const onFileSelect = vi.fn()
    render(<UploadZone onFileSelect={onFileSelect} />)

    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const dropzone = screen.getByTestId('dropzone')

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] }
    })

    expect(onFileSelect).not.toHaveBeenCalled()
  })
})
