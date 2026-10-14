import { chromium } from 'playwright-core'
const BASE = process.env.BASE ?? 'http://localhost:5391'
const S = process.argv[2]
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const errors = []
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('pageerror', (e) => errors.push(e.message))

// 1. Hero buttons and primary nav
await page.goto(BASE + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(900)
await page.click('main a:has-text("Explore Our Services")'); await page.waitForTimeout(1400)
console.log('hero services ->', page.url(), '| title:', await page.title())
await page.goto(BASE + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(900)
await page.click('main a:has-text("Contact") >> nth=0'); await page.waitForTimeout(1400)
console.log('hero quote ->', page.url())
for (const label of ['Services', 'About Us', 'Our Work']) {
  await page.click(`nav[aria-label="Primary"] a:has-text("${label}")`); await page.waitForTimeout(1400)
  console.log('nav', label, '->', page.url())
}
console.log('tel/mailto/wa links:', await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]')].map((a) => a.getAttribute('href').split('?')[0]))]))

// 2. Service CTA prefill + validation
await page.goto(BASE + '/our-work', { waitUntil: 'networkidle' }); await page.waitForTimeout(800)
await page.click('main a:has-text("Blocked drains")'); await page.waitForTimeout(1400)
console.log('prefill ->', page.url(), '| service:', await page.inputValue('#f-service'))
await page.click('button[type=submit]'); await page.waitForTimeout(600)
console.log('errors shown:', await page.locator('[role=alert]').allTextContents())
console.log('focused:', await page.evaluate(() => document.activeElement?.id))

// 3. Valid submit via WhatsApp: opens wa.me with the enquiry, shows the "almost there" panel
await page.fill('#f-name', 'Test Person')
await page.fill('#f-phone', '082 123 4567')
await page.selectOption('#f-method', 'WhatsApp')
await page.fill('#f-message', 'Water meter keeps turning with all taps closed.')
const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('button[type=submit]')])
console.log('whatsapp opened:', decodeURIComponent(popup.url()).slice(0, 120).replace(/\n/g, ' | '))
await popup.close(); await page.waitForTimeout(800)
console.log('status:', (await page.locator('[role=status]').textContent())?.slice(0, 90))

// 4. Valid submit via email: navigates to a mailto: link
await page.click('button:has-text("Edit enquiry")'); await page.waitForTimeout(600)
await page.selectOption('#f-method', 'Email')
await page.click('button[type=submit]'); await page.waitForTimeout(600)
console.log('email needs address:', await page.locator('[role=alert]').allTextContents())
await page.fill('#f-email', 'test@example.com')
// The browser hands mailto: links to the OS; catch the attempt as a request instead.
const seen = []
const onReq = (req) => req.url().startsWith('mailto:') && seen.push(req.url())
page.on('request', onReq)
page.on('requestfailed', onReq)
await page.click('button[type=submit]'); await page.waitForTimeout(1200)
const mailto = seen[0] ?? '(none)'
console.log('sent panel after email:', await page.locator('[role=status]').count() === 1)
console.log('mailto:', decodeURIComponent(String(mailto)).slice(0, 140).replace(/\n/g, ' | '))

// 5. Our Work filter
await page.goto(BASE + '/our-work', { waitUntil: 'networkidle' }); await page.waitForTimeout(800)
await page.click('button[role=tab]:has-text("Repairs")'); await page.waitForTimeout(900)
console.log('work items after filter:', await page.locator('main ul > li').count())

// 6. Mobile menu open/close
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
m.on('pageerror', (e) => errors.push(e.message))
await m.goto(BASE + '/', { waitUntil: 'networkidle' }); await m.waitForTimeout(800)
await m.tap('button[aria-controls="mobile-menu"]'); await m.waitForTimeout(1200)
await m.screenshot({ path: `${S}/i-menu-open.png` })
console.log('menu items:', await m.locator('#mobile-menu nav li').allTextContents())
await m.tap('button[aria-label="Close menu"]'); await m.waitForTimeout(1200)
console.log('menu closed:', await m.locator('#mobile-menu').count() === 0)

// 7. Reduced motion
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const r = await ctx.newPage()
await r.goto(BASE + '/', { waitUntil: 'networkidle' }); await r.waitForTimeout(1200)
console.log('reduced: lenis class?', await r.evaluate(() => document.documentElement.className || '(none)'))
await r.evaluate(() => window.scrollTo(0, 2400)); await r.waitForTimeout(900)
await r.screenshot({ path: `${S}/i-reduced.png` })

// 8. Footer bottom bar after scrolling to the end
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' }); await page.waitForTimeout(800)
const H = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y <= H; y += 400) { await page.mouse.wheel(0, 400); await page.waitForTimeout(100) }
await page.waitForTimeout(1500)
await page.screenshot({ path: `${S}/i-footer.png` })
console.log('page errors:', errors)
await browser.close()
