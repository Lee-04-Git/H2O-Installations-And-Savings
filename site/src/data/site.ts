import type { LucideIcon } from 'lucide-react'
import { Bath, Droplets, Flame, Gauge, Leaf, ShowerHead, Waves, Wrench } from 'lucide-react'

/* ------------------------------------------------------------------
   Business + contact
   Every button and link that points at one of these updates when the value changes.
   Sources: the business's Snupit profile (logo, job photo, customer reviews,
   CIPC certificate) and its Nichemarket, Propertify and FixFind listings.
------------------------------------------------------------------- */

export const business = {
  name: 'H2O Installations And Savings',
  fullName: 'H2O Installations And Savings Cape Town',
  owner: 'Seraaj Majal',
}

export const contact = {
  email: 'seraaj3@gmail.com', // as on the business's CIPC certificate and Nichemarket listing
  phone: '+27 79 421 2652',
  phoneHref: 'tel:+27794212652',
  whatsappHref: 'https://wa.me/27794212652',
  location: 'Gatesville, Cape Town',
  address: ['47 Shaanti Crescent', 'Gatesville, Cape Town, 7764'],
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=47+Shaanti+Crescent%2C+Gatesville%2C+Cape+Town%2C+7764',
}

/** WhatsApp link with a message already typed in. */
export const whatsappWith = (text: string) => `${contact.whatsappHref}?text=${encodeURIComponent(text)}`

/* ------------------------------------------------------------------
   Navigation
------------------------------------------------------------------- */

export type NavLeaf = { label: string; to: string; description?: string; icon?: LucideIcon }
export type NavGroup = { label: string; items: NavLeaf[] }
export type NavEntry = NavLeaf | NavGroup

export const isGroup = (e: NavEntry): e is NavGroup => 'items' in e

export const nav: NavEntry[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/our-work' },
]

export const footerLinks = {
  quick: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'Contact', to: '/contact' },
  ],
}

/* ------------------------------------------------------------------
   Services — each one backed by the listings or the customer reviews below.
------------------------------------------------------------------- */

export type Offer = { title: string; text: string; icon: LucideIcon; image?: string; alt?: string; to?: string }

export type ServiceKey = 'repairs' | 'drains' | 'geysers' | 'meters' | 'bathrooms' | 'water-saving'

export const services: (Offer & { key: ServiceKey; image: string; alt: string })[] = [
  {
    key: 'repairs',
    title: 'Plumbing Repairs & Burst Pipes',
    text: 'Leaking taps, burst and damaged pipes, faulty fittings and the everyday plumbing problems at home or work.',
    icon: Wrench,
    image: '/images/burst-pipe.webp',
    alt: 'Water spraying from a burst pipe joint',
  },
  {
    key: 'drains',
    title: 'Blocked Drains',
    text: 'Unblocking drains and fixing the cause, so the problem doesn’t keep coming back.',
    icon: Waves,
    image: '/images/sink-drain.webp',
    alt: 'Close-up of a chrome sink drain',
  },
  {
    key: 'geysers',
    title: 'Geyser Installations & Replacements',
    text: 'Installing new geysers and replacing old ones, along with the plumbing connected to them.',
    icon: Flame,
    image: '/images/geyser-bathroom.webp',
    alt: 'Wall-mounted electric geyser in a bathroom',
  },
  {
    key: 'meters',
    title: 'Water Meter Installations',
    text: 'Installing water meters and the pipework around them.',
    icon: Gauge,
    image: '/images/water-meter.webp',
    alt: 'Water meter with valves and pipework in a wall box',
  },
  {
    key: 'bathrooms',
    title: 'Bathroom & Kitchen Plumbing',
    text: 'Fitting baths, basins, toilets, showers, taps and kitchen sinks — from single fixtures to full bathroom renovations.',
    icon: Bath,
    image: '/images/bathroom-modern.webp',
    alt: 'Modern bathroom with basin, toilet and glass shower',
  },
  {
    key: 'water-saving',
    title: 'Water-Saving Solutions',
    text: 'Practical water-saving plumbing for homes and businesses, helping cut down on wasted water.',
    icon: Leaf,
    image: '/images/dual-flush-toilet.webp',
    alt: 'Dual-flush button on a toilet cistern',
  },
]

export const whyChoose = [
  `Plumber ${business.owner} and a small team`,
  'Work for homes, flats and commercial buildings',
  'Customers describe the work as reliable and professional',
  'Some customers have used the service since 2013',
]

/* ------------------------------------------------------------------
   About
------------------------------------------------------------------- */

/** About page cards. Images can be swapped for others at the same paths. */
export const whatWeDo: { text: string; icon: LucideIcon; image: string; alt: string }[] = [
  { text: 'Plumbing repairs, leaks and burst pipes', icon: Wrench, image: '/images/plumber-pipes.webp', alt: 'Plumber tightening a fitting on water pipes' },
  { text: 'Unblocking drains', icon: Waves, image: '/images/sink-drain.webp', alt: 'Chrome sink drain' },
  { text: 'Geyser installations and replacements', icon: Flame, image: '/images/geyser-bathroom.webp', alt: 'Wall-mounted geyser in a bathroom' },
  { text: 'Water meter installations', icon: Gauge, image: '/images/water-meter.webp', alt: 'Water meter with valves and pipework' },
  { text: 'Bathroom and kitchen fittings', icon: ShowerHead, image: '/images/kitchen-tap.webp', alt: 'Chrome kitchen mixer tap over a sink' },
  { text: 'Water-saving plumbing solutions', icon: Droplets, image: '/images/shower-head.webp', alt: 'Showerhead with water running' },
]

/* ------------------------------------------------------------------
   Customer reviews — quoted from reviews published on the business's
   Snupit profile (April 2020). Lightly trimmed, never reworded.
------------------------------------------------------------------- */

export type Review = { quote: string; name: string; who: string }

export const reviews: Review[] = [
  {
    quote:
      'At first, he came to unblock a drain at my house, and he discovered that there was some the previous plumber did not do. So he fixed it in no time, and the drain has not blocked ever since. He is very reliable and professional.',
    name: 'Loreen',
    who: 'Homeowner, Cape Town',
  },
  {
    quote:
      'I worked with him for over 6 years… He installed geysers, water meters, basins and toilet systems for us. He is very good at his job and he works with no supervision.',
    name: 'Arion',
    who: 'Contractor, commercial building, Cape Town',
  },
  {
    quote: 'Seraaj was very professional and reliable.',
    name: 'Ahdam Salie',
    who: 'Geyser replacement, Constantia',
  },
  {
    quote:
      'He fitted 4 toilets, 16 taps, outside taps at the Mosque. At my 2 flats, he fitted a bathroom tub, basin, toilet, shower and kitchen sink, geysers for me… I have used his service since 2013.',
    name: 'Zain',
    who: 'Contractor, commercial building, Cape Town',
  },
]

/* Google reviews, supplied by the client. Quoted as written (line breaks turned into
   full stops); reviews cut short on Google end in an ellipsis. Reviews without text are left out.
   `highlight` is an exact phrase from the review, shown large in the home page carousel. */
export const googleReviews: { name: string; highlight: string; quote: string }[] = [
  { name: 'Osman J', highlight: 'Great quality work, honest, extremely helpful and professional.', quote: 'If you’re looking for a reliable plumber with good quality work, then don’t look further. Siraj and his team arrived on time and completed the job even better than expected! They changed my corner bath to a shower. Great quality work, honest, extremely helpful and professional. Couldn’t ask for more. Thanks! …' },
  { name: 'Abdullah Jaffer', highlight: 'It was done professionally and neatly.', quote: 'Seraaj installed two prepaid meters on my premises. It was done professionally and neatly. He also was punctual on the time he said he will be here. Besides the quoted work he also went the extra mile to correct other problems with my …' },
  { name: 'Mohamed Khalid Sulaiman', highlight: 'Was able to locate the leak and repair.', quote: 'Quick response. Was able to locate the leak and repair. Provided advice and communicated throughout the process.' },
  { name: 'Raz Zor', highlight: 'Seraaj was professional throughout', quote: 'I had “H2o installations and savings plumbing” replace my geyser. Seraaj was professional throughout and communicated whatever was needed and to be actioned. I will definitely be using his services in the future and highly recommend his company for any plumbing needs. Keep up the great work!' },
  { name: 'Bertha Osman', highlight: 'Sieraaj came the very same day after contacting him.', quote: 'Thank you to Sieraaj and team. My bathroom and toilet needed a long overdue makeover. Sieraaj came the very same day after contacting him. Gave me advice and recommendations regarding my sanitary purchases. Kept me informed regarding the …' },
  { name: 'Subeiga Nagdee', highlight: 'He came quickly and took his time to see what the problem is', quote: 'We urgently needed a plumber with our blocked drain, after many referrals due to availability, we got Siraaj’s number. He gave us cost upfront so there was no surpises. He came quickly and took his time to see what the problem is and …' },
  { name: 'Candice “Bekkies” Wolfaardt', highlight: 'did an amazing job', quote: 'Seraaj and his team came out to unblock our draining system and manage to unclog the mess effortlessly. They also installed a shower to our bathroom and did an amazing job as to our exact expectation of the layout that we provided. We are …' },
  { name: 'Marc Everson', highlight: 'He worked very efficiently and neatly.', quote: 'Seraaj was very friendly and helpful. I appreciated that he was very accommodating and responded so quickly. He worked very efficiently and neatly.' },
  { name: 'Qaneet Laher', highlight: 'Excellent response time and high quality work done.', quote: 'Excellent response time and high quality work done. Will definitely recommend as use again for any future work.' },
  { name: 'Katlego Modise', highlight: 'Professional and honest service.', quote: 'Professional and honest service. I would highly recommend Sieraaj and his team.' },
  { name: 'Shahieda Sallie', highlight: 'Good work ethic and great service.', quote: 'Siraaj and team very professional and efficient. Willing to give good advice and will only leave your premises once they are fully satisfied with the work rendered. Good work ethic and great service. Will most definitely recommend. …' },
  { name: 'Riaana Langley', highlight: 'My overall experience was superb', quote: 'My overall experience was superb, from start to finish, team is professional, friendly, Siraaj explains every little detail, he takes pictures... rating is a definite 10/10.. …' },
  { name: 'Imraan Hatia', highlight: 'A few weeks now and no leaks.', quote: 'I had a problematic waste disposal insarator, which I was hoping could be repaired. Siraaj came over and after assessing it couldn’t be repaired removed it and made good the plumbing. A few weeks now and no leaks.' },
  { name: 'Aeesha Secona', highlight: 'His intentions to help and solve a problem are pure.', quote: 'H2o was extremely helpful and their service was very good. His intentions to help and solve a problem are pure.' },
  { name: 'Jane Wyngaard', highlight: 'His team was skilled and comprehensive', quote: 'Seraaj was very professional and efficient. His team was skilled and comprehensive …' },
  { name: 'Rugshaan Khalpey', highlight: 'Very reliable', quote: 'Punctual. Very reliable. Professional …' },
  { name: 'Shakeel Majal', highlight: 'Highly recommended', quote: 'Highly recommended #Save Water' },
]

/** Home page strip: short words from the reviews, each with its source. */
export const reasons: { short: string; text: string }[] = [
  { short: 'Reliable', text: '“Very reliable” — Loreen' },
  { short: 'Professional', text: '“Very professional” — Ahdam Salie' },
  { short: 'Trusted', text: 'A customer since 2013 — Zain' },
]

/* ------------------------------------------------------------------
   Water-saving tips (home page rail). General guidance, not service claims.
------------------------------------------------------------------- */

export type Tip = { title: string; text: string; area: string }

export const tips: Tip[] = [
  { title: 'Fix dripping taps early', text: 'A steady drip wastes more water than you’d think — usually a worn washer or cartridge.', area: 'Taps' },
  { title: 'Check your meter for hidden leaks', text: 'Close every tap and note the meter. If it moves within an hour, something is leaking.', area: 'Leaks' },
  { title: 'Test the toilet cistern', text: 'Add food colouring to the cistern. Colour in the bowl without flushing means a leak.', area: 'Toilets' },
  { title: 'Use the half flush', text: 'On a dual-flush toilet, the smaller button uses less water. Use it when it does the job.', area: 'Toilets' },
  { title: 'Fit an efficient showerhead', text: 'Water-efficient showerheads reduce the flow while still giving a comfortable shower.', area: 'Showers' },
  { title: 'Add tap aerators', text: 'Aerators mix air into the stream, cutting the flow at basins and sinks.', area: 'Taps' },
  { title: 'Insulate hot-water pipes', text: 'Lagging geyser pipes keeps water hot on the way, so less runs to waste while you wait.', area: 'Geysers' },
  { title: 'Know where your stopcock is', text: 'If a pipe bursts, shutting off the main supply quickly limits damage and water loss.', area: 'Pipes' },
]

/* ------------------------------------------------------------------
   Our Work — the kinds of jobs H2O takes on. The outdoor pipework photo
   is the business's own (Snupit profile); the rest are Pexels-licensed.
------------------------------------------------------------------- */

export type WorkCategory = 'Repairs' | 'Drains' | 'Geysers' | 'Water meters' | 'Bathrooms' | 'Water saving'

export const workCategories: WorkCategory[] = ['Repairs', 'Drains', 'Geysers', 'Water meters', 'Bathrooms', 'Water saving']

export const work: { title: string; text: string; category: WorkCategory; service: ServiceKey; image: string; alt: string }[] = [
  {
    title: 'Bathrooms & kitchens',
    text: 'Fitting bath tubs, basins, toilets, showers and kitchen sinks — including full bathroom and en-suite plumbing.',
    category: 'Bathrooms',
    service: 'bathrooms',
    image: '/images/bathroom-modern.webp',
    alt: 'Modern bathroom with wall-hung toilet, basin and glass shower',
  },
  {
    title: 'Outdoor pipework',
    text: 'Digging out and replacing supply pipes, and fitting outside taps.',
    category: 'Repairs',
    service: 'repairs',
    image: '/images/h2o-job-outdoor-pipe-wide.webp',
    alt: 'H2O Installations And Savings plumber working on pipework beside a house wall, with a trench dug along the wall',
  },
  {
    title: 'Burst pipe repairs',
    text: 'Repairing or replacing burst and damaged pipes and getting the water supply back on.',
    category: 'Repairs',
    service: 'repairs',
    image: '/images/burst-pipe.webp',
    alt: 'Water spraying from a burst pipe joint',
  },
  {
    title: 'Blocked drains',
    text: 'Clearing blocked drains and fixing what caused the blockage.',
    category: 'Drains',
    service: 'drains',
    image: '/images/sink-drain.webp',
    alt: 'Close-up of a chrome sink drain',
  },
  {
    title: 'Geyser installations & replacements',
    text: 'Installing new geysers, replacing old units and repairing the plumbing connected to them.',
    category: 'Geysers',
    service: 'geysers',
    image: '/images/geyser-bathroom.webp',
    alt: 'Bathroom with a wall-mounted electric geyser',
  },
  {
    title: 'Water meter installations',
    text: 'Installing water meters and the valves and pipework that go with them.',
    category: 'Water meters',
    service: 'meters',
    image: '/images/water-meter.webp',
    alt: 'Water meter with valves and pipework set into a wall box',
  },
  {
    title: 'Water-saving fixtures',
    text: 'Dual-flush toilets, efficient showerheads and taps that help households and businesses use less water.',
    category: 'Water saving',
    service: 'water-saving',
    image: '/images/dual-flush-toilet.webp',
    alt: 'Close-up of a dual-flush button on a white toilet cistern',
  },
]

/* ------------------------------------------------------------------
   Contact form
------------------------------------------------------------------- */

export const contactServices: { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.key, label: s.title })),
  { value: 'other', label: 'Something else' },
]

export const contactMethods = ['Phone call', 'WhatsApp', 'Email'] as const
