import React from 'react'
import type { FocusArea } from '../types/content'

interface FocusAreasSectionProps {
  id?: string
  title: string
  description?: string
  areas: FocusArea[]
}

const FocusAreasSection: React.FC<FocusAreasSectionProps> = ({
  id = 'focus',
  title,
  description,
  areas,
}) => {
  return (
    <section id={id} className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          {description && <p className="mt-6 text-lg text-gray-300">{description}</p>}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {areas.map((area) => (
            <article
              key={area.title}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 shadow-lg shadow-black/20"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">{area.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">{area.description}</p>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                {area.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FocusAreasSection
