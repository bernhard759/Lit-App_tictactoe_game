import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Lit-App_tictactoe_game/",
  build: {
    lib: {
      entry: 'src/my-element.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})
