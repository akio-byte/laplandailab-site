import { describe, expect, it } from 'vitest'

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const bigint = parseInt(normalized, 16)
  if (normalized.length !== 6 || Number.isNaN(bigint)) {
    throw new Error(`Virheellinen väriarvo: ${hex}`)
  }
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255,
  ]
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (value: number) => {
    const s = value / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const [R, G, B] = [channel(r), channel(g), channel(b)]
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hexToRgb(hex1))
  const lum2 = relativeLuminance(hexToRgb(hex2))
  const [light, dark] = lum1 > lum2 ? [lum1, lum2] : [lum2, lum1]
  return (light + 0.05) / (dark + 0.05)
}

describe('Theme contrast ratios', () => {
  it('dark theme meets WCAG AA for body text', () => {
    const ratio = contrastRatio('#020617', '#e2e8f0')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('light theme meets WCAG AA for body text', () => {
    const ratio = contrastRatio('#f8fafc', '#0f172a')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})
