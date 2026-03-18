# Legend Translator

Aplicativo web para tradução de legendas (.srt) usando Inteligência Artificial com suporte a múltiplas APIs.

![Status](https://img.shields.io/badge/status-completo-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Funcionalidades

- 📤 **Upload de arquivos .srt** via drag & drop ou seleção de arquivo
- 🤖 **Multi-API**: Suporte para Anthropic Claude, OpenAI GPT e Google Gemini
- 📝 **Editor lado a lado**: Visualize original (EN) e tradução (PT-BR) simultaneamente
- ⚡ **Tradução em lote**: Traduza múltiplas legendas de uma vez
- ✏️ **Edição manual**: Ajuste as traduções conforme necessário
- 💾 **Persistência local**: Seus dados ficam salvos no navegador
- 🌙 **Dark mode nativo**: Interface escura para conforto visual
- 📥 **Download fácil**: Baixe o arquivo .srt traduzido com um clique

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- npm ou yarn
- Uma chave de API de um dos provedores:
  - [Anthropic API](https://console.anthropic.com/)
  - [OpenAI API](https://platform.openai.com/api-keys)
  - [Google AI Studio](https://makersuite.google.com/app/apikey)

## Instalação

### Opção 1: Script automático (Windows)

1. Clone o repositório:
```bash
git clone https://github.com/matheussilva421/legend-translator.git
cd legend-translator
```

2. Execute o script `iniciar.bat` (duplo clique)

### Opção 2: Manual

1. Clone o repositório:
```bash
git clone https://github.com/matheussilva421/legend-translator.git
cd legend-translator
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

## Como Usar

1. **Carregue uma legenda**: Arraste um arquivo `.srt` ou clique para selecionar
2. **Configure a API**: Selecione o provedor (Anthropic, OpenAI ou Gemini) e insira sua chave
3. **Selecione as falas**: Marque os checkboxes das legendas que deseja traduzir
4. **Traduza**: Clique em "Traduzir Selecionadas"
5. **Edite (opcional)**: Ajuste manualmente qualquer tradução
6. **Baixe**: Clique em "Baixar .srt" para salvar o arquivo final

## Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar testes unitários
npm run test:unit

# Rodar testes E2E
npm run test:e2e

# Preview da build de produção
npm run preview
```

## Estrutura do Projeto

```
legend-translator/
├── src/
│   ├── components/
│   │   ├── UploadZone.tsx        # Área de upload drag & drop
│   │   ├── ApiConfig.tsx         # Configuração da API
│   │   ├── SubtitleList.tsx      # Lista de legendas
│   │   ├── SubtitleEditor.tsx    # Editor lado a lado
│   │   ├── BatchControls.tsx     # Controles de tradução em lote
│   │   └── DownloadButton.tsx    # Botão de download
│   ├── core/
│   │   ├── translators/
│   │   │   ├── BaseTranslator.ts
│   │   │   ├── AnthropicTranslator.ts
│   │   │   ├── OpenAITranslator.ts
│   │   │   ├── GeminiTranslator.ts
│   │   │   └── TranslatorFactory.ts
│   │   ├── types.ts
│   │   ├── srtParser.ts
│   │   └── srtGenerator.ts
│   ├── hooks/
│   │   └── useSubtitleStore.ts   # Estado global (Zustand)
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/                     # Testes unitários
│   ├── components/               # Testes de componentes
│   └── e2e/                      # Testes end-to-end
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Tecnologias

- [React 18](https://react.dev/) - Framework UI
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Estilização
- [Zustand](https://zustand-demo.pmnd.rs/) - Gerenciamento de estado
- [Lucide React](https://lucide.dev/) - Ícones
- [Vitest](https://vitest.dev/) - Testes unitários
- [Playwright](https://playwright.dev/) - Testes E2E

## APIs Suportadas

### Anthropic Claude
- Modelo: `claude-sonnet-4-20250514`
- Excelente para traduções contextuais e preservando nuances

### OpenAI GPT
- Modelo: `gpt-4o-mini`
- Amplamente adotado e boa qualidade

### Google Gemini
- Modelo: `gemini-2.0-flash`
- Integração natural com tarefas de tradução

## Considerações de Segurança

- ⚠️ **As chaves de API são armazenadas localmente** no seu navegador (localStorage)
- ⚠️ **Não compartilhe sua chave de API** com ninguém
- ⚠️ **Este é um aplicativo frontend-only**: todas as chamadas de API são feitas diretamente do seu navegador

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## Autor

**matheussilva421**

Repositório: [github.com/matheussilva421/legend-translator](https://github.com/matheussilva421/legend-translator)
