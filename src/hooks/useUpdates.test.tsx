import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useUpdates } from './useUpdates'

const mockResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  async json() {
    return data
  },
  async text() {
    return JSON.stringify(data)
  },
})

describe('useUpdates', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    vi.restoreAllMocks()
    globalThis.fetch = originalFetch
  })

  it('returns updates from the API', async () => {
    const data = {
      updates: [
        { id: 'news-1', title: 'Test', description: 'Desc', date: '2024-01-01' },
      ],
    }
    const fetchSpy = vi.fn().mockResolvedValue(mockResponse(data))
    globalThis.fetch = fetchSpy as unknown as typeof fetch

    const { result } = renderHook(() => useUpdates())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.updates).toEqual(data.updates)
    expect(result.current.error).toBeUndefined()
  })

  it('exposes an error when the API request fails', async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(mockResponse({ message: 'nope' }, false, 500))
    globalThis.fetch = fetchSpy as unknown as typeof fetch

    const { result } = renderHook(() => useUpdates())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.updates).toHaveLength(0)
    expect(result.current.error).toContain('News request failed')
  })
})
