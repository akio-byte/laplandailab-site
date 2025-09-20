import React from 'react'
import type { ActionLink, ContactChannel } from '../types/content'
import ButtonLink from '../components/ui/ButtonLink'

interface ContactSectionProps {
  id?: string
  title: string
  description: string
  channels: ContactChannel[]
  primaryAction?: ActionLink
  note?: string
}

const ContactSection: React.FC<ContactSectionProps> = ({
  id = 'contact',
  title,
  description,
  channels,
  primaryAction,
  note,
}) => {
  return (
    <section id={id} className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 pb-24 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-gray-300">{description}</p>
            </div>

            {primaryAction && (
              <ButtonLink href={primaryAction.href} variant="primary">
                {primaryAction.label}
              </ButtonLink>
            )}

            {note && <p className="text-sm text-gray-400">{note}</p>}
          </div>

          <div className="space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-200/80">
                  {channel.label}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="mt-2 block text-lg font-semibold text-white transition hover:text-sky-300"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-semibold text-white">{channel.value}</p>
                )}
                {channel.description && (
                  <p className="mt-2 text-sm text-gray-400">{channel.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
