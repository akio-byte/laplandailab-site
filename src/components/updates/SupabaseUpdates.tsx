import React from 'react'
import { useSupabaseUpdates } from '../../hooks/useSupabaseUpdates'
import UpdatesSection from '../../sections/UpdatesSection'
import type { UpdateItem } from '../../types/content'

interface SupabaseUpdatesProps {
  id?: string
  title: string
  description?: string
  fallback: UpdateItem[]
  limit?: number
  realtime?: boolean
  emptyStateMessage?: string
}

const SupabaseUpdates: React.FC<SupabaseUpdatesProps> = ({
  fallback,
  limit,
  realtime,
  emptyStateMessage = 'Ei julkaistuja päivityksiä juuri nyt. Tarkistathan myöhemmin uudelleen.',
  ...sectionProps
}) => {
  const { updates, status, error, refresh, isRealtimeActive } = useSupabaseUpdates(fallback, {
    limit,
    realtime,
  })

  const connectionBadgeClass = isRealtimeActive
    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
    : 'border-amber-500/40 bg-amber-500/10 text-amber-200'

  const connectionLabel = isRealtimeActive
    ? 'Supabase-yhteys aktiivinen'
    : 'Supabase-yhteys ei ole reaaliaikainen'

  const statusLabel = status === 'loading' ? 'Päivitetään…' : 'Päivitä sisältö'

  const meta = (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${connectionBadgeClass}`}
      >
        <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden="true" />
        {connectionLabel}
      </span>
      <button
        type="button"
        onClick={() => {
          void refresh()
        }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-gray-200 transition hover:border-sky-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === 'loading'}
      >
        {statusLabel}
      </button>
    </div>
  )

  const errorMessage =
    error != null
      ? `Päivitysten noutaminen Supabasesta epäonnistui. Näytetään varasisältö. (Virhe: ${error})`
      : null

  return (
    <UpdatesSection
      {...sectionProps}
      updates={updates}
      status={status}
      errorMessage={errorMessage}
      emptyStateMessage={emptyStateMessage}
      meta={meta}
    />
  )
}

export default SupabaseUpdates
