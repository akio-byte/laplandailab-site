import React from 'react'
import type { ActionLink, HeroStat } from '../types/content'
import ButtonLink from '../components/ui/ButtonLink'

interface HeroSectionProps {
  id?: string
  tagline?: string
  title: string
  description: string
  highlights?: string[]
  primaryAction: ActionLink
  secondaryAction?: ActionLink
  stats?: HeroStat[]
}

const HeroSection: React.FC<HeroSectionProps> = ({
  id = 'hero',
  tagline,
  title,
  description,
  highlights,
  primaryAction,
  secondaryAction,
  stats,
}) => {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sky-500/40 blur-3xl" />
        <div className="absolute bottom-[-40%] right-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pb-28 sm:pt-32">
        <div className="max-w-3xl text-center md:text-left">
          {tagline && (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
              {tagline}
            </p>
          )}

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 text-lg text-gray-300 sm:text-xl">{description}</p>

          {highlights && highlights.length > 0 && (
            <ul className="mt-8 space-y-3 text-left text-base text-white/90">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-sky-400"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <ButtonLink href={primaryAction.href} variant="primary">
              {primaryAction.label}
            </ButtonLink>

            {secondaryAction && (
              <ButtonLink href={secondaryAction.href} variant="secondary">
                {secondaryAction.label}
              </ButtonLink>
            )}
          </div>
        </div>

        {stats && stats.length > 0 && (
          <dl className="mt-20 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <dt className="text-xs font-semibold uppercase tracking-wide text-sky-200/80">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}

export default HeroSection
