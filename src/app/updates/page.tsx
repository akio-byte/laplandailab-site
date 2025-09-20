import React from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '../../components/layout/SiteLayout'
import { formatUpdateDate, getAllUpdates } from './posts'

const UpdatesPage: React.FC = () => {
  const updates = React.useMemo(() => getAllUpdates(), [])

  return (
    <SiteLayout contactHref="/#contact" mainClassName="flex-1">
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300/90">
                Ajankohtaista
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Lapland AI Lab -päivitykset
              </h1>
              <p className="mt-3 max-w-2xl text-base text-gray-300">
                Tutustu Lapland AI Labin uutisiin, projekteihin ja tapahtumiin. Kaikki julkaisut ovat
                koottu yhdelle sivulle.
              </p>
            </div>
          </header>

          {updates.length === 0 ? (
            <p className="mt-16 text-center text-gray-400">
              Blogiartikkelit eivät ole vielä saatavilla.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {updates.map((update) => (
                <Link
                  key={update.slug}
                  to={`/updates/${update.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-sky-400/40 hover:bg-white/[0.06]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-200/80">
                    {formatUpdateDate(update.date)}
                  </p>
                  <h2 className="mt-4 text-xl font-semibold text-white group-hover:text-sky-100">
                    {update.title}
                  </h2>
                  {update.description && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">
                      {update.description}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition group-hover:text-sky-200">
                    Lue artikkeli
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

export default UpdatesPage
