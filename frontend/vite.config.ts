import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { SECTION_ROUTES } from './scripts/seo-routes.mjs'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  const siteVerification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
  const configuredApiBase = env.VITE_API_BASE_URL?.trim() ?? ''
  let publicApiBase = configuredApiBase
  if (mode === 'production' && configuredApiBase) {
    try {
      const hostname = new URL(configuredApiBase).hostname
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        publicApiBase = ''
      }
    } catch {
      publicApiBase = configuredApiBase
    }
  }

  return {
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(publicApiBase),
    },
    plugins: [
      figmaAssetResolver(),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
      {
        name: 'google-site-verification',
        transformIndexHtml() {
          if (!siteVerification) return []
          return [
            {
              tag: 'meta',
              attrs: {
                name: 'google-site-verification',
                content: siteVerification,
              },
              injectTo: 'head',
            },
          ]
        },
      },
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          tatuadoraFortaleza: path.resolve(
            __dirname,
            'tatuadora-fortaleza/index.html',
          ),
          politicaDePrivacidade: path.resolve(
            __dirname,
            'politica-de-privacidade/index.html',
          ),
          ...Object.fromEntries(
            SECTION_ROUTES.map((route) => [
              route.slug,
              path.resolve(__dirname, route.slug, 'index.html'),
            ]),
          ),
        },
      },
    },
  }
})
