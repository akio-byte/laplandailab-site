import React from 'react'
import { NavItem } from '../../types/content'
import ButtonLink from '../ui/ButtonLink'

interface SiteHeaderProps {
  navigation: NavItem[]
  contactHref?: string
}

const SiteHeader: React.FC<SiteHeaderProps> = ({
  navigation,
  contactHref = '#contact',
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-white transition hover:text-sky-300"
        >
          Lapland<span className="text-sky-400">AI</span>Lab
        </a>

        <nav
          aria-label="Päävalikko"
          className="hidden items-center gap-8 text-sm font-medium text-gray-200 md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={contactHref}
            className="hidden text-sm md:inline-flex"
            variant="primary"
          >
            Ota yhteyttä
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-gray-200 transition hover:border-sky-500 hover:text-white md:hidden"
            aria-label="Avaa valikko"
            aria-expanded={menuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav
            aria-label="Mobiilivalikko"
            className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-base"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2 text-gray-200 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <ButtonLink
              href={contactHref}
              variant="primary"
              className="mt-4 justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Ota yhteyttä
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default SiteHeader
