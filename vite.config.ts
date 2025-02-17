import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'vite-plugin-dts'


const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true
  },
  resolve:{
    alias:{
      '@assets' : path.resolve(__dirname, './src/assets'),
      '@shared' : path.resolve(__dirname, './src/shared'),
      '@components' : path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    target: 'esnext',
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'mui-chips-input',
      fileName: format => `mui-chips-input.${format}.js`
    },
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
        globals: {
          react: 'React',
          '@mui/material/TextField': 'TextField',
          '@mui/icons-material/Close': 'CloseIcon',
          '@mui/material/IconButton': 'IconButton',
          '@mui/material/ClickAwayListener': 'ClickAwayListener',
          '@mui/material/styles': 'styles',
          '@mui/material/Chip': 'Chip',
          'react/jsx-runtime': 'jsxRuntime',
        }
      }
    }
  },
  plugins: [
    peerDepsExternal(),
    react(),
    dts({
      exclude: ['src/components/**/*'],
      insertTypesEntry: true
    })
  ]
})
