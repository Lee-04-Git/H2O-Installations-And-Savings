import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { CircleCheck, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import clsx from 'clsx'
import { business, contact, contactMethods, contactServices, whatsappWith } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { IconTile } from '../components/ui/IconTile'
import { WhatsappIcon } from '../components/ui/BrandIcons'
import { ContactLinks } from '../components/layout/Footer'
import { easeOutExpo } from '../lib/motion'
import { Marked } from '../components/ui/Marks'
import { Tape } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

type Fields = { name: string; phone: string; email: string; service: string; method: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const validate = (f: Fields): Errors => {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please tell us your name.'
  if (!f.phone.trim() && !f.email.trim()) e.phone = 'Add a phone number or an email address so we can reply.'
  if (f.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = 'Please use digits only, e.g. 082 123 4567.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'That email address doesn’t look quite right.'
  if (!f.service) e.service = 'Choose the type of plumbing help you need.'
  if (!f.method) e.method = 'How would you like us to get back to you?'
  else if (f.method === 'Email' && !f.email.trim()) e.email = 'Add an email address, or choose another way for us to reply.'
  else if (f.method !== 'Email' && !f.phone.trim()) e.phone = 'Add a phone number, or choose email as the way to reply.'
  if (f.message.trim().length < 10) e.message = 'Describe the problem in a little more detail (10+ characters).'
  return e
}

const compose = (f: Fields) => {
  const service = contactServices.find((s) => s.value === f.service)?.label ?? 'Plumbing enquiry'
  const details = [`Name: ${f.name}`, f.phone && `Phone: ${f.phone}`, f.email && `Email: ${f.email}`, `Service: ${service}`, `Preferred contact: ${f.method}`]
  return {
    subject: `Plumbing enquiry: ${service} — ${f.name}`,
    body: [`Hi ${business.name},`, '', f.message.trim(), '', '—', ...details.filter(Boolean)].join('\n'),
  }
}

export default function Contact() {
  usePageMeta('Contact', `Contact H2O Installations And Savings, plumber in Gatesville, Cape Town. Call or WhatsApp ${contact.phone}, email ${contact.email}, or send an enquiry.`)
  const [params] = useSearchParams()

  const initial = useMemo<Fields>(() => {
    const service = contactServices.some((s) => s.value === params.get('service')) ? params.get('service')! : ''
    return { name: '', phone: '', email: '', service, method: '', message: '' }
  }, [params])

  const [fields, setFields] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [sent, setSent] = useState<'email' | 'whatsapp' | null>(null)

  // Arriving from another "Contact" link while already on this page.
  useEffect(() => {
    setFields(initial)
    setSent(null)
  }, [initial])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...fields, [k]: e.target.value }
    setFields(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(fields))
  }

  const viaWhatsapp = fields.method === 'WhatsApp'

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, phone: true, email: true, service: true, method: true, message: true })
    const first = (['name', 'phone', 'email', 'service', 'method', 'message'] as const).find((k) => errs[k])
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    const { subject, body } = compose(fields)
    // No server here: the enquiry is handed to the visitor's own WhatsApp or email app, ready to send.
    if (viaWhatsapp) {
      window.open(whatsappWith(`${subject}\n\n${body}`), '_blank', 'noopener')
      setSent('whatsapp')
    } else {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setSent('email')
    }
  }

  const info = [
    { icon: Phone, title: 'Call us', value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, title: 'WhatsApp', value: contact.phone, href: contact.whatsappHref },
    { icon: Mail, title: 'Email us', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, title: 'Address', value: contact.address.join(', '), href: contact.mapsHref },
  ]

  return (
    <>
      <PageHero
        section="Contact · Gatesville, Cape Town"
        crumbs={[{ label: 'Contact' }]}
        title={['Tell us what', <Marked delay={0.8}>needs fixing</Marked>]}
        lede="Request plumbing assistance — call, WhatsApp, email or send the enquiry form below."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker text-teal">Get in touch</p>
              <p className="serif mt-4 text-[1.3rem] leading-snug">
                Whether it&rsquo;s a burst pipe, a blocked drain, a geyser or a bathroom, tell us what&rsquo;s going on and we&rsquo;ll get
                back to you.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 border-t-[1.5px] border-ink" each={0.08}>
              {info.map(({ icon, title, value, href }) => {
                const inner = (
                  <>
                    <IconTile icon={icon} tone="marigold" className="transition-transform duration-300 group-hover:-rotate-6" />
                    <span className="min-w-0">
                      <span className="kicker block text-ink-soft">{title}</span>
                      <span className={clsx('serif mt-0.5 block text-[1.3rem] font-semibold break-words', href && 'group-hover:text-teal')}>{value}</span>
                    </span>
                  </>
                )
                return (
                  <RevealItem as="li" key={title}>
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-5 border-b-[1.5px] border-ink py-5 transition-colors"
                    >
                      {inner}
                    </a>
                  </RevealItem>
                )
              })}
            </RevealGroup>
            <Reveal className="mt-10">
              <p className="kicker mb-4 text-ink-soft">Quick contact</p>
              <ContactLinks tone="light" />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div id="quote-form" className="relative scroll-mt-28 rounded-[10px] border-[1.5px] border-ink bg-card p-6 shadow-[var(--shadow-hard-lg)] sm:p-10">
              <Tape className="-top-3.5 left-10 -rotate-3" />
              <Tape className="-top-3.5 right-10 rotate-2" />
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <m.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                    className="py-10 text-center"
                    role="status"
                  >
                    <m.span
                      initial={{ scale: 0.4, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="mx-auto grid size-20 place-items-center rounded-full border-[1.5px] border-ink bg-marigold text-ink shadow-[var(--shadow-hard)]"
                    >
                      <CircleCheck className="size-9" aria-hidden />
                    </m.span>
                    <h3 className="poster poster-sm mt-8">Almost there, {fields.name.split(' ')[0]}.</h3>
                    <p className="serif mx-auto mt-4 max-w-md text-[1.1rem] text-ink-soft">
                      {sent === 'whatsapp' ? 'WhatsApp should have opened' : 'Your email app should have opened'} with your enquiry ready to send — press send
                      there to get it to us. If it didn&rsquo;t open, call or WhatsApp{' '}
                      <a className="font-semibold text-teal underline underline-offset-4" href={contact.phoneHref}>
                        {contact.phone}
                      </a>{' '}
                      or email{' '}
                      <a className="font-semibold text-teal underline underline-offset-4" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                      .
                    </p>
                    <div className="mt-8">
                      <Button variant="paper" icon="none" onClick={() => setSent(null)}>
                        Edit enquiry
                      </Button>
                    </div>
                  </m.div>
                ) : (
                  <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between border-b-[1.5px] border-ink pb-4">
                      <h2 className="poster poster-sm">Send an enquiry</h2>
                      <span className="kicker text-ink-soft">Form H2O-01</span>
                    </div>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Name" error={touched.name ? errors.name : undefined} className="sm:col-span-2">
                        <input id="f-name" className="field" autoComplete="name" placeholder="Your name" value={fields.name} onChange={set('name')} onBlur={blur('name')} aria-invalid={!!(touched.name && errors.name)} aria-describedby="e-name" />
                      </Field>
                      <Field id="phone" label="Phone" hint="Phone or email" error={touched.phone ? errors.phone : undefined}>
                        <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="e.g. 082 123 4567" value={fields.phone} onChange={set('phone')} onBlur={blur('phone')} aria-invalid={!!(touched.phone && errors.phone)} aria-describedby="e-phone" />
                      </Field>
                      <Field id="email" label="Email" hint="Phone or email" error={touched.email ? errors.email : undefined}>
                        <input id="f-email" type="email" inputMode="email" autoComplete="email" className="field" placeholder="email@example.com" value={fields.email} onChange={set('email')} onBlur={blur('email')} aria-invalid={!!(touched.email && errors.email)} aria-describedby="e-email" />
                      </Field>
                      <Field id="service" label="Service needed" error={touched.service ? errors.service : undefined}>
                        <select id="f-service" className={selectCls} value={fields.service} onChange={set('service')} onBlur={blur('service')} aria-invalid={!!(touched.service && errors.service)} aria-describedby="e-service">
                          <option value="" disabled>
                            Select a service
                          </option>
                          {contactServices.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field id="method" label="Preferred contact" error={touched.method ? errors.method : undefined}>
                        <select id="f-method" className={selectCls} value={fields.method} onChange={set('method')} onBlur={blur('method')} aria-invalid={!!(touched.method && errors.method)} aria-describedby="e-method">
                          <option value="" disabled>
                            How should we reply?
                          </option>
                          {contactMethods.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field id="message" label="Describe the problem" className="sm:col-span-2" error={touched.message ? errors.message : undefined}>
                        <textarea id="f-message" rows={6} className="field resize-y" placeholder="What’s happening, where is it, and how long has it been going on?" value={fields.message} onChange={set('message')} onBlur={blur('message')} aria-invalid={!!(touched.message && errors.message)} aria-describedby="e-message" />
                      </Field>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="mono text-[0.8rem] text-ink-soft">
                        {viaWhatsapp ? 'Opens WhatsApp with your enquiry ready to send.' : 'Opens your email app with your enquiry ready to send.'}
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        variant="marigold"
                        magnetic
                        icon={viaWhatsapp ? <WhatsappIcon width={16} height={16} /> : <Send className="size-4" aria-hidden />}
                      >
                        {viaWhatsapp ? 'Send on WhatsApp' : 'Send enquiry'}
                      </Button>
                    </div>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

const selectCls =
  "field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%230b2a36%22 stroke-width=%222%22><path d=%22m4 6 4 4 4-4%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-10"

function Field({ id, label, hint, error, className, children }: { id: string; label: string; hint?: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="kicker mb-2 flex items-baseline justify-between text-ink">
        {label}
        {hint && <span className="text-ink-soft normal-case">{hint}</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`e-${id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 text-[0.85rem] font-semibold text-error"
            role="alert"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}
