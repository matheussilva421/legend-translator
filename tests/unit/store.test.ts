import { describe, it, expect, beforeEach } from 'vitest'
import { useSubtitleStore } from '../../src/hooks/useSubtitleStore'

describe('useSubtitleStore', () => {
  beforeEach(() => {
    useSubtitleStore.getState().reset()
    localStorage.clear()
  })

  it('inicializa estado vazio', () => {
    const { subtitles, apiConfig } = useSubtitleStore.getState()
    expect(subtitles).toEqual([])
    expect(apiConfig).toBeNull()
  })

  it('adiciona legendas', () => {
    const entries = [{
      id: 'test-1',
      index: 1,
      startTime: '00:00:00,000',
      endTime: '00:00:05,000',
      text: 'Hello'
    }]
    useSubtitleStore.getState().setSubtitles(entries)
    expect(useSubtitleStore.getState().subtitles).toEqual(entries)
  })

  it('atualiza tradução individual', () => {
    useSubtitleStore.getState().setSubtitles([{
      id: 'test-1',
      index: 1,
      startTime: '00:00:00,000',
      endTime: '00:00:05,000',
      text: 'Hello'
    }])
    useSubtitleStore.getState().updateTranslation('test-1', 'Olá')
    expect(useSubtitleStore.getState().subtitles[0].translation).toBe('Olá')
  })

  it('toggle selection', () => {
    const { toggleSelection, selectedIds } = useSubtitleStore.getState()
    toggleSelection('id-1')
    expect(useSubtitleStore.getState().selectedIds.has('id-1')).toBe(true)
    toggleSelection('id-1')
    expect(useSubtitleStore.getState().selectedIds.has('id-1')).toBe(false)
  })
})
