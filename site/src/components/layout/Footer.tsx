import { Link } from 'react-router-dom'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { business, contact, footerLinks, services } from '../../data/site'
import { Logo } from '../ui/Logo'
import { Lines } from '../ui/Lines'
import { Marked } from '../ui/Marks'
import { WhatsappIcon } from '../ui/BrandIcons'
import { smoothScrollTo } from '../../lib/smoothScroll'
import { Kicker } from '../ui/Kicker'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const channels = [
  { label: `Call ${contact.phone}`, href: contact.phoneHref, Icon: Phone },
  { label: `WhatsApp ${contact.phone}`, href: contact.whatsappHref, Icon: WhatsappIcon },
  { label: `Email ${contact.email}`, href: `mailto:${contact.email}`, Icon: Mail },
]

/** Icon buttons for the three ways to get in touch. */
export function ContactLinks({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <ul className="flex gap-2.5">
      {channels.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className={
              tone === 'dark'
                ? 'grid size-11 place-items-center rounded-md border-[1.5px] border-paper/40 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-marigold hover:bg-marigold hover:text-ink'
                : 'grid size-11 place-items-center rounded-md border-[1.5px] border-ink bg-card text-ink shadow-[var(--shadow-hard-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-marigold'
            }
          >
            <Icon width={20} height={20} strokeWidth={1.7} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-ink text-paper">
      <div className="wrap">
        <div className="border-b border-paper/25 py-20 md:py-28">
          <Kicker className="mb-8 text-marigold">What we stand for</Kicker>
          <Lines
            className="poster poster-md max-w-[24ch]"
            lines={[
              'Reliable plumbing.',
              <>
                Smarter{' '}
                <Marked kind="underline" color="text-marigold" delay={0.6}>
                  water savings.
                </Marked>
              </>,
            ]}
          />
        </div>

        <RevealGroup className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]" each={0.09}>
          <RevealItem>
            <Logo tone="light" />
            <p className="serif mt-6 max-w-xs text-[1.05rem] leading-relaxed text-on-teal-muted">
              Plumbing installations, repairs and practical water-saving solutions for homes and businesses in Cape Town.
            </p>
          </RevealItem>
          <RevealItem>
            <FooterCol title="Quick links" links={footerLinks.quick} />
          </RevealItem>
          <RevealItem>
            <FooterCol title="Services" links={services.map((s) => ({ label: s.title, to: '/services' }))} />
          </RevealItem>
          <RevealItem>
            <h3 className="kicker mb-5 text-marigold">Contact us</h3>
            <ul className="space-y-3.5 text-[0.98rem]">
              <li>
                <a href={`mailto:${contact.email}`} className="link-ink inline-flex items-center gap-3 hover:text-marigold">
                  <Mail className="size-4 text-marigold" aria-hidden />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="link-ink inline-flex items-center gap-3 hover:text-marigold">
                  <Phone className="size-4 text-marigold" aria-hidden />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="link-ink inline-flex items-start gap-3 hover:text-marigold">
                  <MapPin className="mt-1 size-4 shrink-0 text-marigold" aria-hidden />
                  <span>
                    {contact.address[0]}
                    <br />
                    {contact.address[1]}
                  </span>
                </a>
              </li>
            </ul>
            <div className="mt-7">
              <ContactLinks />
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal from="fade" className="flex flex-col-reverse items-start justify-between gap-6 border-t border-paper/25 py-7 sm:flex-row sm:items-center">
          <p className="kicker text-on-teal-muted">© {new Date().getFullYear()} {business.fullName} · Western Cape, South Africa</p>
          <button type="button" onClick={() => smoothScrollTo(0)} className="kicker group inline-flex items-center gap-2.5 text-paper hover:text-marigold">
            Back to top
            <span className="grid size-9 place-items-center rounded-md border-[1.5px] border-paper/40 transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden />
            </span>
          </button>
        </Reveal>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="kicker mb-5 text-marigold">{title}</h3>
      <ul className="space-y-3 text-[0.98rem]">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="link-ink text-paper/85 hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
