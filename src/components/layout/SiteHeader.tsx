import React from 'react'
import { Link, type To, useNavigate } from 'react-router-dom'
import { NavItem } from '../../types/content'
import ButtonLink from '../ui/ButtonLink'

interface SiteHeaderProps {
  navigation: NavItem[]
  contactHref?: string
}

const resolveTo = (href: string): To | null => {
  if (href.startsWith('#')) {
    return { pathname: '/', hash: href }
  }

  if (href.startsWith('/#')) {
    const [pathname, hash] = href.split('#')
    return { pathname: pathname || '/', hash: hash ? `#${hash}` : undefined }
  }

  if (href.startsWith('/')) {
    return href
  }

  return null
}

const SiteHeader: React.FC<SiteHeaderProps> = ({
  navigation,
  contactHref = '#contact',
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const to = resolveTo(href)

    if (to) {
      event.preventDefault()
      setMenuOpen(false)
      navigate(to)
    }
  }

  const brandTo = resolveTo('#hero') ?? '/'

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to={brandTo}
          className="text-base font-semibold tracking-tight text-white transition hover:text-sky-300"
          onClick={() => setMenuOpen(false)}
        >
          Lapland<span className="text-sky-400">AI</span>Lab
        </Link>

        <nav
          aria-label="Päävalikko"
          className="hidden items-center gap-8 text-sm font-medium text-gray-200 md:flex"
        >
          {navigation.map((item) => {
            const to = resolveTo(item.href)

            if (to) {
              return (
                <Link
                  key={item.href}
                  to={to}
                  className="transition hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={contactHref}
            className="hidden text-sm md:inline-flex"
            variant="primary"
            onClick={(event) => handleInternalNavigation(event, contactHref)}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
            {navigation.map((item) => {
              const to = resolveTo(item.href)

              if (to) {
                return (
                  <Link
                    key={item.href}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-2 py-2 text-gray-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-gray-200 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              )
            })}

            <ButtonLink
              href={contactHref}
              variant="primary"
              className="mt-4 justify-center"
              onClick={(event) => handleInternalNavigation(event, contactHref)}
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
