import { useEffect, type RefObject } from 'react'

/**
 * Stops a sideways swipe on a horizontal scroller from turning into the browser's
 * back/forward gesture when the scroller is already at its first or last item.
 * Decides on the first touchmove: if the swipe is sideways and heads past an edge,
 * every move of that gesture is cancelled (cancelling only the first lets the
 * browser pick the gesture up again). Vertical scrolling and swipes within the
 * scroller are left to the browser.
 */
export function useEdgeSwipeGuard(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start: { x: number; y: number } | null = null
    let decided = false
    let block = false

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      start = { x: t.clientX, y: t.clientY }
      decided = false
      block = false
    }
    const onMove = (e: TouchEvent) => {
      if (block) {
        if (e.cancelable) e.preventDefault()
        return
      }
      if (!start || decided) return
      const t = e.touches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (dx === 0 && dy === 0) return
      decided = true
      if (Math.abs(dx) <= Math.abs(dy)) return // vertical: page scroll
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
      if ((dx > 0 && atStart) || (dx < 0 && atEnd)) {
        block = true
        if (e.cancelable) e.preventDefault()
      }
    }
    const onEnd = () => {
      start = null
      block = false
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: true })
    el.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [ref])
}
