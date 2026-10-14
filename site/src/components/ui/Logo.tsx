import clsx from 'clsx'

/**
 * The H2O water-ripple logo (assets/H2O Plumbing Water Ripple Logo.png), arranged
 * horizontally for the navbar: drop-and-ripple mark beside the H2O word block.
 * Same logo on every screen size. Its navy lettering needs a light ground, so on
 * dark backgrounds it sits on a white card.
 */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; compact?: boolean; className?: string }) {
  const light = tone === 'light'
  return (
    <span className={clsx('inline-flex items-center', light && 'rounded-md bg-white px-3 py-1.5', className)}>
      <img
        src="/images/h2o-ripple-logo.webp"
        alt="H2O Installations & Savings Plumbing"
        width={567}
        height={120}
        decoding="async"
        draggable={false}
        className={clsx('w-auto select-none', light ? 'h-9' : 'h-10')}
      />
    </span>
  )
}
