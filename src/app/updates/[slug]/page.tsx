import React from 'react'
import { Link, useParams } from 'react-router-dom'
import SiteLayout from '../../../components/layout/SiteLayout'
import { formatUpdateDate, getUpdateBySlug } from '../posts'

const UpdateArticlePage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const update = React.useMemo(() => (slug ? getUpdateBySlug(slug) : null), [slug])

  if (!update) {
    return (
      <SiteLayout contactHref="/#contact" mainClassName="flex-1">
        <section className="bg-slate-950">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300/90">
              Ajankohtaista
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Artikkelia ei löytynyt
            </h1>
            <p className="mt-4 text-base text-gray-300">
              Etsimääsi artikkelia ei ole olemassa tai se on siirretty.
            </p>
            <Link
              to="/updates"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              ← Takaisin päivityksiin
            </Link>
          </div>
        </section>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout contactHref="/#contact" mainClassName="flex-1">
      <article className="bg-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Link
            to="/updates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
          >
            ← Takaisin päivityksiin
          </Link>

          <header className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-200/80">
              {formatUpdateDate(update.date)}
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {update.title}
            </h1>
          </header>

          <div
            className="mt-10 space-y-6 text-lg leading-relaxed text-gray-200 [&_a]:text-sky-300 [&_a:hover]:text-sky-200 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mt-2 [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: update.html }}
          />
        </div>
      </article>
    </SiteLayout>
  )
}

export default UpdateArticlePage
