import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { work, workCategories, type WorkCategory } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Tape } from '../components/ui/Print'
import { Img } from '../components/ui/Img'
import { usePageMeta } from '../lib/usePageMeta'
import { inView } from '../lib/motion'
import { RevealMedia } from '../components/ui/RevealMedia'

type Filter = 'All' | WorkCategory

export default function OurWork() {
  usePageMeta('Our Work', 'The plumbing jobs H2O Installations And Savings takes on in Cape Town — bathrooms and kitchens, outdoor pipework, burst pipes, blocked drains, geysers, water meters and water-saving fixtures.')
  const [filter, setFilter] = useState<Filter>('All')
  const list = filter === 'All' ? work : work.filter((w) => w.category === filter)

  return (
    <>
      <PageHero
        section="Our Work · Plumbing jobs"
        crumbs={[{ label: 'Our Work' }]}
        title={['The work', <Marked delay={0.8}>we do</Marked>]}
        lede="The plumbing jobs H2O Installations And Savings takes on — from blocked drains and burst pipes to geysers, water meters and full bathrooms."
      />

      <Section>
        <LayoutGroup id="work-filter">
          <div className="mb-14 border-b-[1.5px] border-ink pb-6">
            <div role="tablist" aria-label="Filter by type of work" className="flex flex-wrap gap-2">
              {(['All', ...workCategories] as Filter[]).map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={clsx('relative h-11 rounded-md border-[1.5px] border-ink px-5 text-[0.92rem] font-semibold transition-colors', filter === c ? 'text-paper' : 'bg-card hover:bg-marigold')}
                >
                  {filter === c && <m.span layoutId="work-pill" className="absolute inset-0 rounded-[4px] bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </div>
        </LayoutGroup>

        <m.ul layout className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((w, i) => {
              const feature = filter === 'All' && i === 0
              const rot = feature ? 0 : [-1.2, 0.9, -0.6][i % 3]
              return (
                <m.li
                  layout
                  key={w.title}
                  initial={{ opacity: 0, y: 56, rotate: rot * 3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rot }}
                  viewport={inView}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                  whileHover={{ rotate: 0, y: -6 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, delay: (i % 3) * 0.08 }}
                  className={clsx(feature && 'md:col-span-2 lg:col-span-3')}
                >
                  {/* A clipping: photo + headline, taped to the page */}
                  <Link
                    to={`/contact?service=${w.service}`}
                    className={clsx('group relative grid h-full border-[1.5px] border-ink bg-card shadow-[var(--shadow-hard)]', feature ? 'md:grid-cols-[1.3fr_1fr]' : '')}
                  >
                    <Tape className="-top-3.5 left-8 -rotate-3" />
                    <div className={clsx('relative overflow-hidden border-b-[1.5px] border-ink bg-paper-2', feature ? 'aspect-[16/10] md:aspect-auto md:min-h-[26rem] md:border-r-[1.5px] md:border-b-0' : 'aspect-[16/10]')}>
                      <RevealMedia className="absolute inset-0" delay={0.15 + (i % 3) * 0.08} parallax={feature ? 6 : 0}>
                        <div className="size-full grayscale-[35%] transition-[transform,filter] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0">
                          <Img src={w.image} alt={w.alt} className="size-full object-cover" />
                        </div>
                      </RevealMedia>
                    </div>
                    <div className={clsx('flex flex-col p-6 md:p-7', feature && 'md:justify-center md:p-12')}>
                      <p className="kicker text-teal">{w.category}</p>
                      <h2 className={clsx('serif mt-4 leading-[1.12] font-semibold', feature ? 'text-[clamp(1.9rem,3.2vw,2.9rem)]' : 'text-[1.45rem]')}>{w.title}</h2>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{w.text}</p>
                      <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                        <span className="link-ink">Ask about this</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </m.li>
              )
            })}
          </AnimatePresence>
        </m.ul>
        {list.length === 0 && <p className="serif py-16 text-center text-[1.2rem] text-ink-soft italic">Nothing in this category yet.</p>}
      </Section>

      <CtaPanel kicker="Have a plumbing job?" title={['Tell us', 'what needs fixing']} text="Describe the problem — photos help — and we’ll get back to you.">
        <Button to="/contact" variant="ink" magnetic>
          Contact us
        </Button>
      </CtaPanel>
    </>
  )
}
