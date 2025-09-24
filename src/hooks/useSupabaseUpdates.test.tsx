import { render, renderHook, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SupabaseUpdates from '../components/updates/SupabaseUpdates'
import type { SupabaseUpdatesRow } from '../lib/supabaseClient'
import {
  formatPublishedDate,
  mapSupabaseUpdate,
  useSupabaseUpdates,
} from './useSupabaseUpdates'

describe('formatPublishedDate', () => {
  it('formats ISO dates using Finnish locale', () => {
    const formatted = formatPublishedDate('2024-01-15T12:34:56Z')
    expect(formatted).toBe('15. tammikuuta 2024')
  })

  it('returns fallback text for invalid values', () => {
    expect(formatPublishedDate(null)).toBe('Ajankohtaista')
    expect(formatPublishedDate('not-a-date')).toBe('Ajankohtaista')
  })
})

describe('mapSupabaseUpdate', () => {
  it('maps Supabase rows to UpdateItem structures', () => {
    const row: SupabaseUpdatesRow = {
      id: '1',
      title: 'Demo',
      description: null,
      link: null,
      published_at: '2024-03-05T08:00:00Z',
    }

    const mapped = mapSupabaseUpdate(row)
    expect(mapped).toMatchObject({
      title: 'Demo',
      description: '',
      href: undefined,
      date: '5. maaliskuuta 2024',
    })
  })
})

describe('useSupabaseUpdates', () => {
  it('returns fallback updates when Supabase is disabled', () => {
    const fallback = [
      {
        title: 'Static fallback',
        description: 'Fallback description',
        date: 'Toukokuu 2024',
      },
    ]

    const { result } = renderHook(() => useSupabaseUpdates(fallback, { enabled: false }))
    expect(result.current.status).toBe('idle')
    expect(result.current.updates).toEqual(fallback)
    expect(result.current.error).toBeNull()
  })
})

describe('SupabaseUpdates component', () => {
  it('renders fallback content when Supabase ei ole käytössä', () => {
    const fallback = [
      {
        title: 'Staattinen uutinen',
        description: 'Sisältö ilman Supabasea',
        date: 'Kesäkuu 2024',
      },
    ]

    render(
      <SupabaseUpdates
        id="updates"
        title="Ajankohtaista"
        description="Testikuvaus"
        fallback={fallback}
      />,
    )

    expect(screen.getByText('Ajankohtaista')).toBeInTheDocument()
    expect(screen.getByText('Staattinen uutinen')).toBeInTheDocument()
    expect(screen.getByText('Sisältö ilman Supabasea')).toBeInTheDocument()
  })
})
