import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import type { Offer } from '../../data/site'
import { RevealGroup, RevealItem } from './Reveal'
import { Img } from './Img'

/**
 * Services as photo cards: image, serif title and a link. Hover lifts the card, deepens its
 * offset shadow, zooms the photo and slides the arrow.
 */
export function OfferGrid({ offers, cols = 3 }: { offers: Offer[]; cols?: 2 | 3 | 4 }) {
  return (
    <RevealGroup className={clsx('grid gap-x-7 gap-y-10 sm:grid-cols-2', cols === 3 && 'lg:grid-cols-3', cols === 4 && 'lg:grid-cols-4')}>
      {offers.map((o) => {
        const body = (
          <>
            {o.image && (
              <div className="relative aspect-[16/10] overflow-hidden border-b-[1.5px] border-ink bg-paper-2">
                <Img src={o.image} alt={o.alt ?? ''} className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
              </div>
            )}
            <div className="flex flex-1 flex-col p-7">
              <h3 className="serif text-[1.5rem] leading-tight font-semibold">{o.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{o.text}</p>
              {o.to && (
                <span className="mt-auto inline-flex items-center gap-3 pt-7 font-semibold">
                  <span className="link-ink">Ask about this</span>
                  <span className="grid size-9 place-items-center rounded-md border-[1.5px] border-ink transition-[transform,background-color] duration-300 group-hover:translate-x-1 group-hover:bg-marigold">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </span>
              )}
            </div>
          </>
        )
        const card =
          'group flex h-full flex-col overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-card shadow-[var(--shadow-hard)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-ink)]'
        return (
          <RevealItem key={o.title} className="h-full">
            {o.to ? (
              <Link to={o.to} className={card}>
                {body}
              </Link>
            ) : (
              <div className={card}>{body}</div>
            )}
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
