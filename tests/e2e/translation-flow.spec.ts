import { test, expect } from '@playwright/test'

test('fluxo completo de tradução', async ({ page }) => {
  await page.goto('/')

  // Upload de arquivo
  const testSrt = `1
00:00:00,000 --> 00:00:05,000
Hello, world!

2
00:00:05,000 --> 00:00:10,000
This is a test subtitle.`

  await page.setInputFiles('input[type="file"]', {
    name: 'test.srt',
    mimeType: 'text/plain',
    buffer: Buffer.from(testSrt)
  })

  // Verificar se legendas foram carregadas
  await expect(page.getByText('Hello, world!')).toBeVisible()

  // Configurar API
  await page.fill('input[type="password"]', 'test-key')
  await page.click('button:has-text("Salvar")')

  // Selecionar legendas
  await page.click('input[type="checkbox"]').first()

  // Baixar arquivo
  const downloadPromise = page.waitForEvent('download')
  await page.click('button:has-text("Baixar")')
  const download = await downloadPromise

  expect(download.suggestedFilename()).toBe('legendas-traduzidas.srt')
})
