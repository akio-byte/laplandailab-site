import React from 'react'
import type { UpdateItem } from '../types/content'

interface UpdatesSectionProps {
  id?: string
  title: string
  description?: string
  updates: UpdateItem[]
}

const UpdatesSection: React.FC<UpdatesSectionProps> = ({
  id = 'updates',
  title,
  description,
  updates,
}) => {
  return (
    <section id={id} className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
            {description && <p className="mt-6 text-lg text-gray-300">{description}</p>}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {updates.map((update) => (
            <article
              key={update.title}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20"
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
