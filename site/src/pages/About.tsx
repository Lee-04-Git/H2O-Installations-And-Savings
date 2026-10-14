import { m } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { business, contact, reviews, whatWeDo, whatsappWith } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { Marked } from '../components/ui/Marks'
import { Polaroid, Tape } from '../components/ui/Print'
import { Img } from '../components/ui/Img'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { WhatsappIcon } from '../components/ui/BrandIcons'
import { usePageMeta } from '../lib/usePageMeta'
import { ScrollText } from '../components/ui/ScrollText'
import { Kicker } from '../components/ui/Kicker'

const channels = [
  { label: 'WhatsApp', href: whatsappWith(`Hi ${business.name}, I need help with a plumbing job.`), Icon: WhatsappIcon },
  { label: `Call ${contact.phone}`, href: contact.phoneHref, Icon: Phone },
  { label: 'Email', href: `mailto:${contact.email}`, Icon: Mail },
]

export default function About() {
  usePageMeta('About Us', 'H2O Installations And Savings is a Cape Town plumbing business based in Gatesville, run by plumber Seraaj Majal — installations, repairs and water-saving plumbing for homes and businesses.')

  return (
    <>
      <PageHero
        section="About H2O"
        crumbs={[{ label: 'About Us' }]}
        title={['Plumbing you', <Marked kind="underline" delay={0.9}>can rely on.</Marked>]}
        lede="Plumbing installations, repairs and practical water-saving solutions for homes and businesses in Cape Town."
        aside={
          <m.div initial={{ opacity: 0, rotate: 12, y: 40 }} animate={{ opacity: 1, rotate: 4, y: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.4 }} className="w-[17rem]">
            <Polaroid src="/images/h2o-job-outdoor-pipe-wide.webp" alt="H2O Installations And Savings plumber working on outdoor pipework beside a house" caption="On the job" imgClassName="aspect-[4/3]" />
          </m.div>
        }
      />

      {/* Story — editorial columns */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <Kicker className="text-teal">Who we are</Kicker>
              <p className="serif mt-4 text-[1.1rem] leading-snug text-ink-soft italic">Installations, repairs and practical water-saving solutions.</p>
            </div>
          </div>
          <div className="lg:col-span-9">
            <ScrollText className="serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.3] font-medium">
              <strong className="font-semibold">H2O Installations And Savings</strong> provides plumbing services in Cape Town, helping customers with plumbing
              installations, repairs and practical water-saving solutions.
            </ScrollText>
            <RevealGroup each={0.12} className="mt-12 gap-10 text-[1.05rem] leading-[1.8] text-ink-soft md:columns-2">
              <RevealItem className="break-inside-avoid"><p className="dropcap mb-6">
                The focus is on addressing plumbing problems with care and providing solutions suited to each customer&rsquo;s needs — whether that&rsquo;s a{' '}
                <strong className="font-semibold text-ink">blocked drain, a burst pipe or a geyser</strong> that needs replacing.
              </p></RevealItem>
              <RevealItem className="break-inside-avoid"><p className="mb-6">
                The work covers plumbing repairs and burst pipes, unblocking drains, geyser installations and replacements, water meter installations, and fitting
                baths, basins, toilets, showers, taps and kitchen sinks.
              </p></RevealItem>
              <RevealItem className="break-inside-avoid"><p className="mb-6">
                Customers include homeowners, landlords and contractors — from stand-alone houses and flats to{' '}
                <strong className="font-semibold text-ink">commercial buildings and a mosque</strong>. As the name says, the business also offers
                water-saving plumbing solutions.
              </p></RevealItem>
              <RevealItem className="break-inside-avoid"><p>
                H2O Installations And Savings is based at 47 Shaanti Crescent in Gatesville, Cape Town. Some customers have used the service since 2013.
              </p></RevealItem>
            </RevealGroup>
            <Reveal className="mt-14 border-y-[1.5px] border-ink py-8">
              <blockquote className="serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.2] italic">
                &ldquo;He gets the <Marked delay={0.5}>job done</Marked>, and I have no reason to <Marked delay={0.8}>complain</Marked>.&rdquo;
              </blockquote>
              <p className="kicker mt-4 text-ink-soft">— Zain, contractor, Cape Town</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Who does the work */}
      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5">
            <m.div initial={{ rotate: -6, opacity: 0, y: 30 }} whileInView={{ rotate: -3, opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 110, damping: 16 }}>
              <Polaroid src="/images/plumbing-fittings.webp" alt="Chrome mixer tap, braided hoses and spanners laid out on a bathroom plumbing plan" caption="Fittings, tools and a plan" imgClassName="aspect-square" />
            </m.div>
          </div>
          <div className="lg:col-span-7">
            <Kicker className="text-teal">Who does the work</Kicker>
            <Lines className="poster poster-md mt-5" lines={['Plumber', 'Seraaj Majal', '& team']} />
            <Reveal delay={0.1}>
              <p className="serif mt-8 text-[1.2rem] leading-relaxed">
                H2O Installations And Savings is run by plumber Seraaj Majal, working with a small team. Customers describe him as reliable, professional and
                hardworking — someone who gets the job done.
              </p>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
                One homeowner called him out for a blocked drain; he found work the previous plumber hadn&rsquo;t done, fixed it, and called back a few days
                later to check everything was still fine.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What we do — ruled index */}
      <Section>
        <SectionHead kicker="What we do" title={['Six ways we', 'can help']} />
        <RevealGroup as="ol" className="grid border-t-[1.5px] border-l-[1.5px] border-ink sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((w, i) => (
            <RevealItem as="li" key={w.text} className="group relative overflow-hidden border-r-[1.5px] border-b-[1.5px] border-ink bg-card">
              <div className="relative aspect-[16/10] overflow-hidden border-b-[1.5px] border-ink bg-paper-2">
                <Img src={w.image} alt={w.alt} className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
                <span className="poster absolute top-3 left-3 rounded-md border-[1.5px] border-ink bg-card px-2 pt-1 text-[1.6rem] text-ink shadow-[var(--shadow-hard-sm)]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-7 md:p-8">
                <p className="serif text-[1.4rem] leading-snug font-semibold">{w.text}</p>
                <w.icon className="mt-1 size-7 shrink-0 text-teal transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.6} aria-hidden />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Customer reviews — pinned notices */}
      <Section id="reviews" tone="paper-2" className="scroll-mt-24 border-y-[1.5px] border-ink">
        <SectionHead kicker="Customer reviews" title={['What customers', 'say']} />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {reviews
            .filter((r) => r.name === 'Arion' || r.name === 'Zain')
            .map((r, i) => ({ label: `${r.name} · ${r.who}`, text: `“${r.quote}”`, cls: i === 0 ? 'bg-marigold' : 'bg-card', rot: i === 0 ? -1.5 : 1.2 }))
            .map((n, i) => (
            <m.article
              key={n.label}
              initial={{ opacity: 0, y: 40, rotate: n.rot * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: n.rot }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.1 }}
              className={`relative rounded-[6px] border-[1.5px] border-ink p-8 shadow-[var(--shadow-hard-lg)] md:p-12 ${n.cls}`}
            >
              <Tape className="-top-3.5 left-10 -rotate-6" />
              <Tape className="-top-3.5 right-10 rotate-3" />
              <p className="kicker">{n.label}</p>
              <p className="serif mt-6 text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.35] font-medium">{n.text}</p>
            </m.article>
          ))}
        </div>
      </Section>

      <CtaPanel
        kicker="Need a hand?"
        title={['Plumbing problem?', 'Let’s sort it.']}
        text="Tell us what’s going on — call, WhatsApp or send an enquiry and we’ll get back to you."
        footer={
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="kicker">Get in touch directly</p>
            <ul className="flex flex-wrap gap-2.5">
              {channels.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex h-11 items-center gap-2 rounded-md border-[1.5px] border-ink bg-card px-4 text-[0.9rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
                  >
                    <Icon width={17} height={17} aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Button to="/contact" variant="ink" magnetic>
          Contact us
        </Button>
        <Button to="/services" variant="paper">
          Our services
        </Button>
      </CtaPanel>
    </>
  )
}
