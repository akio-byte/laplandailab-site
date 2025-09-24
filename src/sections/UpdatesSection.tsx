import React from 'react'
import type { UpdateItem } from '../types/content'

interface UpdatesSectionStatus {
  isLoading: boolean
  isFallback: boolean
  error?: string
}

interface UpdatesSectionProps {
  id?: string
  title: string
  description?: string
  updates: UpdateItem[]
  status?: UpdatesSectionStatus
}

const UpdatesSection: React.FC<UpdatesSectionProps> = ({
  id = 'updates',
  title,
  description,
  updates,
  status,
}) => {
  const statusMessage = (() => {
    if (!status) return undefined
    if (status.isLoading) {
      return 'Haetaan ajankohtaista dataa Neon-tietokannasta…'
    }
    if (status.error) {
      return `Neonin tietokantakysely epäonnistui. Näytetään varmuuskopioitu sisältö. (${status.error})`
    }
    if (status.isFallback) {
      return 'Neon ei palauttanut nostoja. Näytetään varmuuskopioitu sisältö, kunnes data on saatavilla.'
    }
    return 'Ajankohtainen data on ladattu suoraan Neon-tietokannasta.'
  })()

  return (
    <section id={id} className="updates-section">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
            {description && <p className="mt-6 text-lg text-gray-300">{description}</p>}
          </div>
        </div>

        {statusMessage && (
          <p
            role="status"
            aria-live="polite"
            className="updates-status mt-8 rounded-lg p-4 text-sm"
          >
            {statusMessage}
          </p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {updates.map((update) => (
            <article
              key={update.id ?? update.title}
              className="updates-card flex h-full flex-col rounded-2xl border p-6 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-200/80">
                {update.date}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">{update.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">
                {update.description}
              </p>

              {update.href && (
                <a
                  href={update.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                >
                  Lue lisää
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpdatesSection
