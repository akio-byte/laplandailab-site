import { useCallback, useEffect, useRef, useState } from 'react'
import type { UpdateItem } from '../types/content'
import {
  getSupabaseClient,
  type SupabaseUpdatesClient,
  type SupabaseUpdatesRow,
} from '../lib/supabaseClient'

export type SupabaseUpdatesStatus = 'idle' | 'loading' | 'ready' | 'error'

export interface SupabaseUpdatesOptions {
  limit?: number
  enabled?: boolean
  realtime?: boolean
  client?: SupabaseUpdatesClient | null
}

export interface SupabaseUpdatesResult {
  updates: UpdateItem[]
  status: SupabaseUpdatesStatus
  error: string | null
  refresh: () => Promise<void>
  isRealtimeActive: boolean
}

export function formatPublishedDate(value: string | null): string {
  if (!value) {
    return 'Ajankohtaista'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Ajankohtaista'
  }

  return new Intl.DateTimeFormat('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function mapSupabaseUpdate(row: SupabaseUpdatesRow): UpdateItem {
  return {
    title: row.title,
    description: row.description ?? '',
    href: row.link ?? undefined,
    date: formatPublishedDate(row.published_at),
  }
}

export function useSupabaseUpdates(
  fallback: UpdateItem[],
  options: SupabaseUpdatesOptions = {},
): SupabaseUpdatesResult {
  const { limit = 9, enabled = true, realtime = true, client: clientOverride } = options

  const [updates, setUpdates] = useState<UpdateItem[]>(() => fallback)
  const [status, setStatus] = useState<SupabaseUpdatesStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [isRealtimeActive, setRealtimeActive] = useState(false)

  const fetchRef = useRef<() => Promise<void>>(async () => {})

  useEffect(() => {
    setUpdates(fallback)
  }, [fallback])

  useEffect(() => {
    const client = clientOverride ?? getSupabaseClient()
    if (!client || !enabled) {
      setStatus('idle')
      setError(null)
      setRealtimeActive(false)
      fetchRef.current = async () => {}
      return
    }

    let active = true
    let channel: ReturnType<SupabaseUpdatesClient['channel']> | null = null

    const load = async () => {
      setStatus('loading')
      setError(null)
      try {
        const { data, error: queryError } = await client
          .from('updates')
          .select('id, title, description, link, published_at')
          .order('published_at', { ascending: false, nullsFirst: false })
          .limit(limit)

        if (!active) return

        if (queryError) {
          setStatus('error')
          setError(queryError.message)
          setUpdates(fallback)
          return
        }

        const mapped = (data ?? []).map(mapSupabaseUpdate)
        setUpdates(mapped)
        setStatus('ready')
        setError(null)
      } catch (err) {
        if (!active) return
        setStatus('error')
        setError(err instanceof Error ? err.message : String(err))
        setUpdates(fallback)
      }
    }

    fetchRef.current = load
    void load()

    if (realtime) {
      channel = client
        .channel('public:updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'updates' },
          () => {
            void load()
          },
        )

      channel.subscribe((status) => {
        if (!active) return
        setRealtimeActive(status === 'SUBSCRIBED')
      })
    } else {
      setRealtimeActive(false)
    }

    return () => {
      active = false
      setRealtimeActive(false)
      fetchRef.current = async () => {}
      if (channel) {
        void channel.unsubscribe()
      }
    }
  }, [clientOverride, fallback, enabled, limit, realtime])

  const refresh = useCallback(async () => {
    await fetchRef.current()
  }, [])

  return { updates, status, error, refresh, isRealtimeActive }
}
