import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Every page route, for sitemap.xml. Keep in step with src/App.tsx. */
const ROUTES = ['/', '/about', '/services', '/our-work', '/contact']

/**
 * Writes robots.txt and, once VITE_SITE_URL is set (see .env),
 * sitemap.xml with absolute URLs. index.html picks up %VITE_SITE_URL% itself.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'h2o-seo-files',
    apply: 'build',
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : ''].join('\n').trim() + '\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (!siteUrl) return
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map((r) => `  <url><loc>${siteUrl}${r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// On Vercel, fall back to the project's production address (its custom domain once attached,
// otherwise *.vercel.app) when VITE_SITE_URL isn't set. Vite gives process.env priority over .env.
if (!process.env.VITE_SITE_URL && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  process.env.VITE_SITE_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
}

export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL ?? '').replace(/\/+$/, '')
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
  }
})
