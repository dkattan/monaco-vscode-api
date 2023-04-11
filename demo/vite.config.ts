import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    fs: {
      allow: ['../'] // allow to load codicon.ttf from monaco-editor in the parent folder
    }
  },
  resolve: {
    dedupe: ['monaco-editor']
  },
  assetsInclude: ['**/*.wasm']
})