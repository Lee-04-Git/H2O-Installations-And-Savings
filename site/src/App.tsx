import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, MotionConfig, PresenceContext, m, useReducedMotion } from 'framer-motion'
import { Header } from './components/layout/Header'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { initSmoothScroll, scrollToTop } from './lib/smoothScroll'
import { Curtain } from './components/layout/Curtain'
import Home from './pages/Home'

/* Inner pages are split out and prefetched once the browser is idle,
   so the first visit stays light and navigation stays instant. */
const loaders = {
  Services: () => import('./pages/Services'),
  About: () => import('./pages/About'),
  OurWork: () => import('./pages/OurWork'),
  Contact: () => import('./pages/Contact'),
  NotFound: () => import('./pages/NotFound'),
}
const Services = lazy(loaders.Services)
const About = lazy(loaders.About)
const OurWork = lazy(loaders.OurWork)
const Contact = lazy(loaders.Contact)
const NotFound = lazy(loaders.NotFound)

// Animation features load in their own chunk; `m` components stay tiny.
const loadFeatures = () => import('./lib/motionFeatures').then((r) => r.default)

const LABELS: Record<string, string> = {
  '/': 'Home',
  '/services': 'Services',
  '/about': 'About Us',
  '/our-work': 'Our Work',
  '/contact': 'Contact',
}

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    initSmoothScroll()
    // Warm the other pages one chunk per idle period, so prefetching never
    // shows up as a single long main-thread task.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
    const queue = Object.values(loaders)
    const next = () => {
      const load = queue.shift()
      if (load) load().finally(() => idle(next))
    }
    const start = window.setTimeout(() => idle(next), 1500)
    return () => window.clearTimeout(start)
  }, [])

  return (
    <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-md border-[1.5px] border-ink bg-marigold px-5 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollProgress />
        <Header />
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
        {/* No transform on this wrapper: the curtain inside is position:fixed. */}
        <m.div
          key={location.pathname}
          initial={reduce ? { opacity: 0 } : false}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={reduce ? { opacity: 0, transition: { duration: 0.2 } } : undefined}
        >
          {!reduce && <Curtain label={LABELS[location.pathname] ?? 'H2O'} />}
          {/* AnimatePresence initial={false} skips the first page's entrance (no curtain on
              arrival) by putting initial:false on PresenceContext — which every motion
              component inside would inherit, silently disabling all scroll reveals on a
              direct visit. Reset it so the page content animates on every load. */}
          <PresenceContext.Provider value={null}>
          <main id="main" className="min-h-svh">
            <Suspense fallback={null}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-work" element={<OurWork />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          </PresenceContext.Provider>
        </m.div>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
    </LazyMotion>
  )
}
