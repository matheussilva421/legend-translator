import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ApiConfig } from '../../src/components/ApiConfig'

describe('ApiConfig', () => {
  it('renderiza seletor de providers', () => {
    render(<ApiConfig onSave={vi.fn()} />)
    expect(screen.getByLabelText('Provider')).toBeInTheDocument()
  })

  it('exibe opções Anthropic, OpenAI, Gemini', () => {
    render(<ApiConfig onSave={vi.fn()} />)
    expect(screen.getByText('Anthropic')).toBeInTheDocument()
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
    expect(screen.getByText('Gemini')).toBeInTheDocument()
  })

  it('chama onSave com config válida', () => {
    const onSave = vi.fn()
    render(<ApiConfig onSave={onSave} />)

    fireEvent.change(screen.getByLabelText('API Key'), {
      target: { value: 'test-key-123' }
    })

    fireEvent.click(screen.getByText('Salvar'))

    expect(onSave).toHaveBeenCalledWith({
      provider: 'anthropic',
      apiKey: 'test-key-123'
    })
  })
})
