import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_APP_VITE_BASE_PATH || '/'
  return {
    base,
    define: {
      'process.platform': null,
      'process.version': null
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false },
      port: 5001,
      open: false,
      cors: true
    },
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      viteSvgIcons({
        iconDirs: [
          path.resolve(process.cwd(), 'src/icons/common'),
          path.resolve(process.cwd(), 'src/icons/nav-bar')
        ],
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    build: {
      minify: 'terser',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@api': resolve(__dirname, 'src/api'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@entities': resolve(__dirname, 'src/entities'),
        '@router': resolve(__dirname, 'src/router'),
        '@store': resolve(__dirname, 'src/store'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@views': resolve(__dirname, 'src/views')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    }
  }
})

