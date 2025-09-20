import React from 'react'
import type { Program } from '../types/content'

interface ProgramsSectionProps {
  id?: string
  title: string
  description?: string
  programs: Program[]
}

const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  id = 'programs',
  title,
  description,
  programs,
}) => {
  return (
    <section id={id} className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          {description && <p className="mt-6 text-lg text-gray-300">{description}</p>}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.title}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-lg shadow-black/25"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">{program.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">
                  {program.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                {program.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
                    <span>{deliverable}</span>
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

export default ProgramsSection
