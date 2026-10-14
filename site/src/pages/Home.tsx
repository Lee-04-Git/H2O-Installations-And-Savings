import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bath, Flame, Leaf, Waves, Wrench } from 'lucide-react'
import clsx from 'clsx'
import { business, googleReviews, reasons, reviews, tips, whatsappWith, work } from '../data/site'
import { Button } from '../components/ui/Button'
import { Lines } from '../components/ui/Lines'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHead } from '../components/ui/Section'
import { Marked } from '../components/ui/Marks'
import { Polaroid, Stamp } from '../components/ui/Print'
import { TipRail } from '../components/ui/TipRail'
import { StoryList } from '../components/ui/StoryList'
import { IconTile } from '../components/ui/IconTile'
import { Img } from '../components/ui/Img'
import { CtaPanel } from '../components/ui/CtaPanel'
import { useMedia } from '../lib/useMedia'
import { easeOutExpo, inView } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'
import { Kicker } from '../components/ui/Kicker'
import { ScrollText } from '../components/ui/ScrollText'

export default function Home() {
  usePageMeta('')
  return (
    <>
      <Hero />
      <WhoWeAre />
      <HowWeHelp />
      <TipRail
        tips={tips}
        highlight={1}
        header={
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker className="mb-4 text-teal">Water-wise at home · simple checks anyone can do</Kicker>
              <h2 className="poster poster-md">
                Small fixes that <Marked kind="circle">save</Marked> water
              </h2>
            </div>
            <Reveal from="right" delay={0.2}>
              <Button to="/contact?service=water-saving" variant="marigold" magnetic>
                Ask about water saving
              </Button>
            </Reveal>
          </div>
        }
      />
      <Testimonials />
      <Work />
      <Reasons />
      <CtaPanel
        kicker="Need a plumber?"
        title={['Ready to sort', 'that leak?']}
        text="Tell us what’s going on and we’ll get back to you. Call, WhatsApp or send an enquiry — whichever suits you."
      >
        <Button to="/contact" variant="ink" size="lg" magnetic>
          Contact us
        </Button>
        <Button href={whatsappWith(`Hi ${business.name}, I need help with a plumbing job.`)} variant="paper" size="lg">
          WhatsApp us
        </Button>
      </CtaPanel>
    </>
  )
}

/* ------------------------------------------------------------------ */

const heroPhotos = [
  { src: '/images/h2o-job-outdoor-pipe-wide.webp', alt: 'H2O Installations And Savings plumber working on outdoor pipework beside a house', caption: 'On the job', w: 'w-[19rem]', pos: 'top-2 left-[8%]', rot: -5, aspect: 'aspect-[4/3]' },
  { src: '/images/geyser-bathroom.webp', alt: 'Wall-mounted electric geyser in a tiled bathroom', caption: 'Geyser installations', w: 'w-[16rem]', pos: 'top-[42%] right-0', rot: 6, aspect: 'aspect-[4/3]' },
  { src: '/images/water-saving-tap.webp', alt: 'Hand turning off a modern chrome basin tap', caption: 'Water-wise fixtures', w: 'w-[14rem]', pos: 'bottom-0 left-0', rot: -2, aspect: 'aspect-[5/4]' },
]

function Hero() {
  const desktop = useMedia('(min-width: 1024px)')

  return (
    <section className="paper-noise relative overflow-hidden border-b-[1.5px] border-ink pt-28">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink pb-3"
        >
          <p className="kicker">Plumbing · Repairs · Geysers · Water saving</p>
          <p className="kicker text-ink-soft">Gatesville · Cape Town, Western Cape</p>
        </m.div>

        <div className="relative grid gap-10 pt-10 pb-14 lg:grid-cols-12 lg:pt-14 lg:pb-20">
          <div className="relative z-10 lg:col-span-7">
            <Lines
              as="h1"
              on="mount"
              delay={0.15}
              className="poster poster-xl"
              lines={[
                'Reliable',
                'Plumbing.',
                'Smarter water',
                <span className="inline-flex items-center gap-4">
                  <span className="inline-block -rotate-2 rounded-md border-[1.5px] border-ink bg-marigold px-3 pt-1 shadow-[var(--shadow-hard)]">Savings.</span>
                  <span className="serif hidden text-[1.15rem] leading-snug font-normal tracking-normal normal-case italic sm:block md:text-[1.35rem]">
                    for Cape Town
                    <br />
                    homes &amp; businesses
                  </span>
                </span>,
              ]}
            />

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: easeOutExpo }}
              className="lede mt-10 max-w-[34rem] text-ink-soft"
            >
              From plumbing repairs and geyser installations to leak detection and water-saving solutions, H2O Installations And Savings helps keep your home or
              business running smoothly.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: easeOutExpo }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button to="/contact" variant="ink" size="lg" magnetic>
                Contact
              </Button>
              <Button to="/services" variant="paper" size="lg">
                Explore Our Services
              </Button>
            </m.div>

          </div>

          {/* Photo collage */}
          <div className="relative lg:col-span-5">
            {desktop ? (
              <div className="relative h-full min-h-[36rem]">
                {heroPhotos.map((p, i) => (
                  <m.div
                    key={p.src}
                    initial={{ opacity: 0, y: 80, rotate: p.rot * 3 }}
                    animate={{ opacity: 1, y: 0, rotate: p.rot }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.35 + i * 0.12 }}
                    className={clsx('absolute', p.pos, p.w)}
                    style={{ zIndex: 10 + i }}
                  >
                    {/* Same hover as the founder photo: straighten (cancel the tilt) and grow a touch.
                        On its own layer so it isn't slowed by the entrance spring's delay. */}
                    <m.div whileHover={{ rotate: -p.rot, scale: 1.02 }}>
                      <Polaroid src={p.src} alt={p.alt} caption={p.caption} imgClassName={p.aspect} eager={i === 0} />
                    </m.div>
                  </m.div>
                ))}
                <div className="absolute top-[40%] left-[2%] z-30">
                  <Stamp rotate={-9}>Water-wise plumbing</Stamp>
                </div>
              </div>
            ) : (
              <div className="relative flex justify-center pt-4 pb-6">
                {heroPhotos.slice(0, 2).map((p, i) => (
                  <m.div
                    key={p.src}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, rotate: i ? 5 : -5 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.4 + i * 0.12 }}
                    className={clsx('w-[62%] max-w-[17rem]', i && '-ml-10 mt-10')}
                  >
                    <m.div whileHover={{ rotate: i ? -5 : 5, scale: 1.02 }}>
                      <Polaroid src={p.src} alt={p.alt} caption={p.caption} imgClassName="aspect-[4/3]" />
                    </m.div>
                  </m.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function WhoWeAre() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Kicker className="mb-6 text-teal">Plumbing you can rely on</Kicker>
          <ScrollText as="h2" className="serif max-w-[22ch] text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.12] font-medium tracking-[-0.01em]">
            Plumbing services in Cape Town — <Marked delay={0.5}>installations</Marked>, <Marked delay={0.7}>repairs</Marked> and practical{' '}
            <Marked delay={0.9}>water savings</Marked>.
          </ScrollText>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="dropcap text-[1.05rem] leading-[1.75] text-ink-soft">
                From a dripping tap to a new geyser, H2O Installations And Savings helps customers with plumbing installations, repairs and practical
                water-saving solutions.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[1.05rem] leading-[1.75] text-ink-soft">
                The focus is on addressing plumbing problems with care and providing solutions suited to each customer’s needs — while keeping an eye out for
                water that’s going to waste.
              </p>
              <Link to="/about" className="link-ink mt-6 inline-flex items-center gap-2 font-semibold">
                More about us <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <m.div whileHover={{ rotate: 0, scale: 1.02 }} initial={{ rotate: 3 }} className="mx-auto max-w-[19rem] lg:mt-24">
            <Polaroid src="/images/plumber-tools-hands.webp" alt="Plumber in work overalls fitting a pipe connection by hand" caption="Repairs done with care" imgClassName="aspect-square" />
          </m.div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */

type StackItem = {
  kicker: string
  title: string
  text: string
  to: string
  cta: string
  tone: string
  icon: typeof Wrench
  aside: ReactNode
}

const bathroomFixtures = ['Baths & showers', 'Basins & toilets', 'Taps', 'Kitchen sinks']
const drainReview = reviews.find((r) => r.name === 'Loreen')!

const stack: StackItem[] = [
  {
    kicker: 'Plumbing repairs & burst pipes',
    title: 'Fix it properly',
    text: 'Leaking taps, burst and damaged pipes, faulty fittings and the everyday plumbing problems at home or work.',
    to: '/contact?service=repairs',
    cta: 'Request a repair',
    tone: 'bg-teal-deep text-paper',
    icon: Wrench,
    aside: <Img src="/images/dripping-tap.webp" alt="" className="size-full object-cover" />,
  },
  {
    kicker: 'Blocked drains',
    title: 'Clear the blockage',
    text: 'Unblocking drains and fixing the cause, so the problem doesn’t keep coming back.',
    to: '/contact?service=drains',
    cta: 'Sort a blocked drain',
    tone: 'bg-card',
    icon: Waves,
    aside: (
      <figure className="grid h-full content-center gap-4 p-6">
        <p className="kicker text-teal">What a customer said</p>
        <blockquote className="serif text-[1.15rem] leading-snug italic">“{drainReview.quote}”</blockquote>
        <figcaption className="mono text-[0.75rem]">
          — {drainReview.name}, {drainReview.who}
        </figcaption>
      </figure>
    ),
  },
  {
    kicker: 'Geyser installations & replacements',
    title: 'Hot water, sorted',
    text: 'Installing new geysers and replacing old ones, along with the plumbing connected to them.',
    to: '/contact?service=geysers',
    cta: 'Ask about geysers',
    tone: 'bg-teal-deep text-paper',
    icon: Flame,
    aside: <Img src="/images/geyser-bathroom.webp" alt="" className="size-full object-cover object-[22%_50%]" />,
  },
  {
    kicker: 'Bathroom & kitchen plumbing',
    title: 'Bathrooms & kitchens',
    text: 'Fitting baths, basins, toilets, showers, taps and kitchen sinks — up to full bathroom renovations.',
    to: '/contact?service=bathrooms',
    cta: 'Talk about your bathroom',
    tone: 'bg-teal-soft',
    icon: Bath,
    aside: (
      <ul className="grid h-full content-center gap-2 p-6">
        {bathroomFixtures.map((t) => (
          <li key={t} className="serif rounded-md border-[1.5px] border-ink bg-card px-3 py-2 text-[1rem] font-semibold">
            {t}
          </li>
        ))}
      </ul>
    ),
  },
  {
    kicker: 'Water-saving solutions',
    title: 'Use less water',
    text: 'Practical water-saving plumbing for homes and businesses, helping cut down on wasted water.',
    to: '/contact?service=water-saving',
    cta: 'Start saving water',
    tone: 'bg-marigold-soft',
    icon: Leaf,
    aside: <Img src="/images/shower-head.webp" alt="" className="size-full object-cover" />,
  },
]

function HowWeHelp() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section id="services" className="scroll-mt-24 border-t-[1.5px] border-ink bg-teal-mist pt-20 md:pt-28">
      <div className="wrap">
        <SectionHead
          kicker="Our services"
          title={['Plumbing help,', 'start to finish']}
          lede="From everyday repairs to geysers, bathrooms and water-saving upgrades — here’s how we can help."
        />
      </div>
      <div ref={ref} className="wrap pb-20 md:pb-28">
        {stack.map((item, i) => (
          <StackCard key={item.title} item={item} i={i} n={stack.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

function StackCard({ item, i, n, progress }: { item: StackItem; i: number; n: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035])
  const Icon = item.icon
  return (
    // The sticky wrapper is taller than its card and its empty top padding overlaps the card
    // before it, so it must let clicks through — otherwise it silently blocks that card's link.
    <div className="pointer-events-none mb-6 md:sticky md:top-0 md:mb-0 md:h-[88svh] md:pt-[calc(7rem+var(--i)*1.6rem)]" style={{ ['--i' as string]: i }}>
      <m.article
        style={{ scale }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 1, ease: easeOutExpo }}
        className={clsx('pointer-events-auto grid origin-top overflow-hidden rounded-[14px] will-change-transform border-[1.5px] border-ink shadow-[var(--shadow-hard-lg)] md:h-[min(68svh,32rem)] md:grid-cols-[1.25fr_1fr]', item.tone)}
      >
        <div className="flex flex-col p-7 md:p-10">
          <div className="flex items-center justify-between">
            <IconTile icon={Icon} tone={item.tone.includes('bg-teal') ? 'marigold' : item.tone.includes('marigold') ? 'paper' : 'marigold'} />
            <span className="poster text-[3rem] opacity-30">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <p className="kicker mt-8">{item.kicker}</p>
          <h3 className="poster poster-md mt-3">{item.title}</h3>
          <p className="serif mt-4 max-w-md text-[1.15rem] leading-snug opacity-85">{item.text}</p>
          <div className="mt-auto pt-8">
            <Link to={item.to} className="group inline-flex items-center gap-3 font-semibold">
              <span className="link-ink">{item.cta}</span>
              <span className="grid size-10 place-items-center rounded-md border-[1.5px] border-current transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-0 border-l-[1.5px] border-ink md:block">{item.aside}</div>
      </m.article>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const workPicks = ['Bathrooms & kitchens', 'Outdoor pipework', 'Blocked drains', 'Geyser installations & replacements']

function Work() {
  return (
    <Section>
      <SectionHead
        kicker="Our work"
        title={['The jobs', 'we take on']}
      />
      <StoryList
        rows={work
          .filter((w) => workPicks.includes(w.title))
          .map((w) => ({ title: w.title, tag: w.category, meta: '', image: w.image, href: '/our-work' }))}
      />
    </Section>
  )
}

function Reasons() {
  return (
    <section className="border-y-[1.5px] border-ink bg-teal-soft py-14">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Kicker className="shrink-0 text-teal">What customers say</Kicker>
        <RevealGroup as="ul" each={0.1} className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
          {reasons.map((r) => (
            <RevealItem as="li" key={r.short}>
              <a href="#reviews" className="group block">
                <span className="poster block text-[2.4rem] transition-colors group-hover:text-teal md:text-[3rem]">{r.short}</span>
                <span className="mono text-[0.72rem]">{r.text}</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Initial in a round badge — the reviewers' own photos aren't available. */
function Avatar({ name, size = 'md', active }: { name: string; size?: 'sm' | 'md'; active?: boolean }) {
  return (
    <span
      aria-hidden
      className={clsx(
        'poster grid shrink-0 place-items-center rounded-full border-[1.5px] border-ink pt-0.5',
        size === 'md' ? 'size-14 text-[1.7rem]' : 'size-8 text-[1.05rem]',
        active ? 'bg-card text-teal-deep' : size === 'md' ? 'bg-marigold text-ink' : 'bg-teal-soft text-teal-deep',
      )}
    >
      {name.replace(/[^A-Za-z]/g, '').charAt(0)}
    </span>
  )
}

/**
 * Google reviews as a card deck: one review at a time, its key phrase set
 * large with the full review beneath. Arrows and swipe/drag move through
 * the deck. Every review is laid out in the same grid cell, so
 * the card is always as tall as the longest review and nothing below jumps.
 */
function Testimonials() {
  const [index, setIndex] = useState(0)
  const n = googleReviews.length
  const go = (d: number) => setIndex((i) => (i + d + n) % n)

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden border-y-[1.5px] border-ink bg-teal-deep py-20 text-paper md:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Kicker className="mb-5 text-marigold">Google reviews</Kicker>
            <Lines className="poster poster-lg" lines={['Straight from', <span className="text-marigold">our customers</span>]} />
          </div>
          <Reveal from="right" delay={0.2} className="flex items-center gap-4">
            <p className="mono text-[0.95rem] text-on-teal-muted" aria-live="polite">
              <span className="text-paper">{pad2(index + 1)}</span> / {pad2(n)}
            </p>
            {[
              { d: -1, label: 'Previous review', Icon: ArrowLeft },
              { d: 1, label: 'Next review', Icon: ArrowRight },
            ].map(({ d, label, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(d)}
                aria-label={label}
                className="grid size-12 place-items-center rounded-md border-[1.5px] border-paper/60 text-paper shadow-[3px_3px_0_rgb(243_249_251/0.2)] transition-[transform,background-color,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-marigold hover:text-ink active:translate-y-0.5"
              >
                <Icon className="size-5" aria-hidden />
              </button>
            ))}
          </Reveal>
        </div>

        <Reveal className="relative mt-12" distance={50}>
          {/* The deck: two cards peeking out behind the current one */}
          <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-[1.4deg] rounded-[16px] border-[1.5px] border-ink bg-teal-soft" />
          <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 -rotate-[0.7deg] rounded-[16px] border-[1.5px] border-ink bg-marigold" />

          <div className="relative overflow-hidden rounded-[16px] border-[1.5px] border-ink bg-card text-ink">
            <m.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              className="grid cursor-grab touch-pan-y active:cursor-grabbing"
            >
              {googleReviews.map((r, i) => {
                const active = i === index
                return (
                  <m.figure
                    key={r.name}
                    aria-hidden={!active}
                    inert={!active}
                    initial={false}
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: i < index ? -48 : 48 }}
                    transition={{ duration: active ? 0.55 : 0.25, ease: easeOutExpo, delay: active ? 0.12 : 0 }}
                    className={clsx('[grid-area:1/1] grid gap-6 p-7 select-none md:grid-cols-[9rem_1fr] md:gap-10 md:p-12', !active && 'pointer-events-none')}
                  >
                    <span aria-hidden className="poster block text-[7rem] leading-[0.75] text-marigold md:text-[11rem]">
                      “
                    </span>
                    <div className="flex flex-col">
                      <blockquote>
                        <p className="serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.01em]">{r.highlight}</p>
                        <p className="serif mt-6 max-w-3xl text-[1.08rem] leading-relaxed text-ink-soft">{r.quote}</p>
                      </blockquote>
                      <figcaption className="mt-8 flex items-center gap-4 border-t-[1.5px] border-dashed border-ink/30 pt-6">
                        <Avatar name={r.name} />
                        <span>
                          <span className="block text-[1.1rem] leading-tight font-semibold">{r.name}</span>
                          <span className="kicker text-ink-soft">Google review</span>
                        </span>
                      </figcaption>
                    </div>
                  </m.figure>
                )
              })}
            </m.div>
            <div className="h-1 bg-ink/10">
              <m.div className="h-full origin-left bg-marigold" initial={false} animate={{ scaleX: (index + 1) / n }} transition={{ duration: 0.6, ease: easeOutExpo }} />
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
