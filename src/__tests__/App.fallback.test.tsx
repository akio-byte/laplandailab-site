import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import App from '../App'

const originalFetch = globalThis.fetch

describe('App updates fallback behaviour', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    globalThis.fetch = originalFetch
  })

  it('shows a fallback notice when Neon data fails to load', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue({
        ok: false,
        status: 500,
        async json() {
          return {}
        },
        async text() {
          return 'server error'
        },
      } as unknown as Response)

    render(<App />)

    expect(
      await screen.findByText(/Näytetään varmuuskopioitu sisältö/i),
    ).toBeInTheDocument()

    const status = await screen.findByRole('status')
    expect(status).toBeInTheDocument()
    expect(status).toHaveTextContent(/Neonin tietokantakysely epäonnistui/i)

    expect(
      screen.getByText('Lapland AI Lab käynnistää arktisen datan pilottiohjelman'),
    ).toBeInTheDocument()
  })
})
