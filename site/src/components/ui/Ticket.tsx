import clsx from 'clsx'
import type { Tip } from '../../data/site'
import { Stamp } from './Print'

/**
 * A water-saving tip printed as a ticket: main body + perforated stub with
 * the tip number. The featured tip is printed on marigold and stamped.
 */
export function Ticket({ tip, index, total, featured, className }: { tip: Tip; index: number; total: number; featured?: boolean; className?: string }) {
  const n = String(index + 1).padStart(2, '0')
  return (
    <article className={clsx('relative flex h-full overflow-hidden rounded-[10px] border-[1.5px] border-ink', featured ? 'bg-marigold' : 'bg-card', className)}>
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="kicker text-ink-soft">Tip No. {n}</span>
          <span className="kicker">{tip.area}</span>
        </div>
        <h3 className="serif mt-5 text-[1.45rem] leading-[1.12] font-semibold">{tip.title}</h3>
        <p className="mt-2 text-[0.92rem] text-ink-soft">{tip.text}</p>
        {featured && (
          <div className="mt-auto pt-5">
            <Stamp rotate={-6}>Quick check</Stamp>
          </div>
        )}
      </div>

      {/* Perforated stub */}
      <div className={clsx('relative flex w-[5.5rem] shrink-0 flex-col items-center justify-center border-l-[1.5px] border-dashed border-ink/60 text-center sm:w-24', featured ? 'bg-marigold' : 'bg-paper-2')}>
        <span aria-hidden className="absolute -top-2.5 -left-2.5 size-5 rounded-full border-[1.5px] border-ink bg-paper" />
        <span aria-hidden className="absolute -bottom-2.5 -left-2.5 size-5 rounded-full border-[1.5px] border-ink bg-paper" />
        <span className="poster text-[3.4rem] leading-none">{n}</span>
        <span className="kicker mt-1">Tip</span>
        <span className="mono mt-0.5 text-[0.65rem] text-ink-soft">of {String(total).padStart(2, '0')}</span>
      </div>
    </article>
  )
}
