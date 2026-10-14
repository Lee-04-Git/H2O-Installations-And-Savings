import { m } from 'framer-motion'
import { business, contact, whatsappWith } from '../../data/site'
import { easeOutExpo } from '../../lib/motion'

/** Floating WhatsApp chat button, bottom-right on every page. Sits under the mobile menu and page curtain. */
export function WhatsAppButton() {
  return (
    <m.a
      href={whatsappWith(`Hi ${business.name}, I need help with a plumbing job.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp: ${contact.phone}`}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.2 }}
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-2 sm:right-6 sm:bottom-6"
    >
      <span className="kicker pointer-events-none hidden translate-x-2 rounded-md border-[1.5px] border-ink bg-card px-3 py-2 text-ink opacity-0 shadow-[var(--shadow-hard-sm)] transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="grid size-14 place-items-center rounded-full border-[1.5px] border-ink bg-[#25d366] text-white shadow-[var(--shadow-hard)] transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_var(--color-ink)] group-active:translate-y-0.5 group-active:shadow-none">
        {/* WhatsApp glyph */}
        <svg viewBox="0 0 32 32" className="size-7" fill="currentColor" aria-hidden>
          <path d="M16.02 3C8.84 3 3 8.79 3 15.92c0 2.28.6 4.5 1.75 6.46L3 29l6.83-1.77a13.1 13.1 0 0 0 6.19 1.57h.01c7.18 0 13.02-5.79 13.02-12.92C29.05 8.79 23.2 3 16.02 3Zm0 23.62h-.01a10.9 10.9 0 0 1-5.53-1.51l-.4-.23-4.05 1.05 1.08-3.92-.26-.4a10.62 10.62 0 0 1-1.65-5.69c0-5.93 4.86-10.75 10.83-10.75 2.89 0 5.61 1.12 7.65 3.15a10.6 10.6 0 0 1 3.17 7.6c0 5.93-4.86 10.7-10.83 10.7Zm5.94-8.04c-.33-.16-1.93-.95-2.23-1.05-.3-.11-.52-.16-.73.16-.22.33-.84 1.05-1.03 1.27-.19.21-.38.24-.71.08-.33-.16-1.38-.5-2.62-1.6-.97-.86-1.62-1.92-1.81-2.24-.19-.33-.02-.5.14-.67.15-.14.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.75-1-2.4-.27-.63-.54-.54-.73-.55h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.7 0 1.6 1.17 3.13 1.33 3.35.16.22 2.3 3.48 5.57 4.88.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.78 2.2-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38Z" />
        </svg>
      </span>
    </m.a>
  )
}
