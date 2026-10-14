import { m } from 'framer-motion'
import { contact, services, whyChoose } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { OfferGrid } from '../components/ui/Offers'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Sticker } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'
import { Kicker } from '../components/ui/Kicker'

/** A checkbox whose tick is drawn by hand as it scrolls in. */
function Tick({ delay }: { delay: number }) {
  return (
    <span className="relative grid size-8 shrink-0 place-items-center rounded-[4px] border-[1.5px] border-ink bg-card">
      <svg viewBox="0 0 24 24" className="size-6 text-clay" aria-hidden>
        <m.path
          d="M4 13 C 6 15, 8 17, 9.5 19 C 12 13, 15.5 8, 21 3"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  )
}

export default function Services() {
  usePageMeta('Plumbing Services in Cape Town', 'Plumbing repairs and burst pipes, blocked drains, geyser installations and replacements, water meter installations, bathroom and kitchen plumbing and water-saving solutions in Cape Town.')
  return (
    <>
      <PageHero
        section="Services · Plumbing"
        crumbs={[{ label: 'Services' }]}
        title={['Plumbing', <Marked kind="underline" delay={0.8}>services</Marked>]}
        lede="Plumbing repairs, blocked drains, geysers, water meters, bathroom and kitchen plumbing and water-saving solutions for homes and businesses in Cape Town."
        aside={<Sticker top="Cape Town" big="H2O" bottom="Plumbing" tone="ink" />}
      >
        <Button to="/contact" variant="ink" magnetic>
          Contact
        </Button>
        <Button href={contact.phoneHref} variant="paper" icon="none">
          Call {contact.phone}
        </Button>
      </PageHero>

      <Section>
        <SectionHead kicker="What we offer" title={['Repairs, installs', '& water savings']} lede="From a dripping tap or a blocked drain to a new geyser or a full bathroom." />
        <OfferGrid offers={services.map((s) => ({ ...s, to: `/contact?service=${s.key}` }))} />
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Kicker className="text-teal">Why choose H2O?</Kicker>
            <Lines className="poster poster-md mt-5" lines={['Reliable.', 'Professional.']} />
            <RevealGroup as="ul" className="mt-10 space-y-4" each={0.08}>
              {whyChoose.map((w, i) => (
                <RevealItem as="li" key={w} className="flex items-center gap-4 text-[1.1rem] font-medium">
                  <Tick delay={0.3 + i * 0.15} />
                  {w}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="rounded-[14px] border-[1.5px] border-ink bg-teal-deep p-8 text-paper shadow-[8px_8px_0_var(--color-marigold)] md:p-12">
              <p className="kicker text-marigold">Ready to get started?</p>
              <p className="serif mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.2]">
                Tell us about your plumbing problem and we&rsquo;ll get back to you.
              </p>
              <p className="mt-4 text-on-teal-muted">Call, WhatsApp or send an enquiry — whichever suits you.</p>
              <div className="mt-9">
                <Button to="/contact" variant="marigold" size="lg" magnetic>
                  Contact us
                </Button>
              </div>
              <p className="mono mt-10 border-t border-paper/25 pt-6 text-[0.8rem] leading-relaxed text-on-teal-muted">
                <span className="text-paper">TIP —</span> When you get in touch, describe the problem and where it is. Photos help.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
