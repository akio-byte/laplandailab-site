import React from 'react'
import type { MissionItem } from '../types/content'

interface MissionSectionProps {
  id?: string
  title: string
  description: string
  items: MissionItem[]
}

const MissionSection: React.FC<MissionSectionProps> = ({
  id = 'mission',
  title,
  description,
  items,
}) => {
  return (
    <section id={id} className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg text-gray-300">{description}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-lg shadow-black/30"
            >
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionSection
