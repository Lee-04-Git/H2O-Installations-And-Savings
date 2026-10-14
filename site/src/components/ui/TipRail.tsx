import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Tip } from '../../data/site'
import { useMedia } from '../../lib/useMedia'
import { Ticket } from './Ticket'
import { easeOutExpo } from '../../lib/motion'
import { useEdgeSwipeGuard } from '../../lib/useEdgeSwipeGuard'

/**
 * Water-saving tips as a rail of tickets. On desktop, vertical scroll
 * drives the rail sideways inside a pinned frame; on touch screens and
 * with reduced motion it's a native swipe rail with buttons.
 * `highlight` prints one ticket on marigold with a stamp.
 */
export function TipRail({ tips, header, highlight = 0 }: { tips: Tip[]; header: ReactNode; highlight?: number }) {
  const reduce = useReducedMotion()
  const desktop = useMedia('(min-width: 1024px)')
  return desktop && !reduce ? <PinnedRail tips={tips} header={header} highlight={highlight} /> : <SwipeRail tips={tips} header={header} highlight={highlight} />
}

const label = (i: number) => `Tip ${String(i + 1).padStart(2, '0')}`

function PinnedRail({ tips, header, highlight }: { tips: Tip[]; header: ReactNode; highlight: number }) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  // Direct mapping: Lenis already smooths the scroll, a second spring would make the rail feel late.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="wrap">{header}</div>
        <m.div ref={track} style={{ x }} className="mt-10 flex w-max gap-5 will-change-transform pr-12 pl-[max(1.25rem,calc((100vw-84rem)/2+2.75rem))]">
          {tips.map((tip, i) => (
            <m.div
              key={tip.title}
              initial={{ opacity: 0, y: 50, rotate: ((i % 3) - 1) * 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: ((i % 3) - 1) * 0.8 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: i < 4 ? i * 0.08 : 0 }}
              className="h-[17.5rem] w-[25rem] shrink-0"
            >
              <Ticket tip={tip} index={i} total={tips.length} featured={i === highlight} />
            </m.div>
          ))}
        </m.div>
        <div className="wrap mt-10">
          <div className="flex items-center gap-4">
            <span className="kicker">{label(0)}</span>
            <div className="relative h-[3px] flex-1 bg-ink/15">
              <m.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-ink" />
            </div>
            <span className="kicker">{label(tips.length - 1)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function SwipeRail({ tips, header, highlight }: { tips: Tip[]; header: ReactNode; highlight: number }) {
  const rail = useRef<HTMLUListElement>(null)
  useEdgeSwipeGuard(rail)

  const nudge = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * (rail.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <section className="py-20">
      <div className="wrap">
        {header}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous tips" className="grid size-11 place-items-center rounded-md border-[1.5px] border-ink bg-card">
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next tips" className="grid size-11 place-items-center rounded-md border-[1.5px] border-ink bg-card">
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      {/* Native swipe rail. Only the row animates in (once, as the section scrolls into view);
          the tickets themselves stay put so nothing shifts under a swiping finger. */}
      <m.ul
        ref={rail}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-none px-5 pb-6 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
      >
        {tips.map((tip, i) => (
          <li key={tip.title} className="h-[17rem] w-[85vw] max-w-[24rem] shrink-0 snap-start">
            <Ticket tip={tip} index={i} total={tips.length} featured={i === highlight} />
          </li>
        ))}
      </m.ul>
    </section>
  )
}
