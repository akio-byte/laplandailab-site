import { render } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import App from '../App'

vi.mock('../hooks/useUpdates', () => ({
  useUpdates: () => ({ updates: [], isLoading: false, error: undefined, lastUpdated: undefined }),
}))

describe('App accessibility', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      async json() {
        return { updates: [] }
      },
      async text() {
        return ''
      },
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
    vi.restoreAllMocks()
    globalThis.fetch = originalFetch
  })

  it('has no detectable axe violations in dark theme', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no detectable axe violations in light theme mode', async () => {
    document.documentElement.setAttribute('data-theme', 'light')
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
