import type { UpdateItem } from '../types/content'

const DEFAULT_ENDPOINT = '/.netlify/functions/news'

export interface NewsApiResponse {
  updates: UpdateItem[]
}

export async function fetchUpdates(signal?: AbortSignal): Promise<UpdateItem[]> {
  const endpoint = import.meta.env.VITE_NEWS_API_URL || DEFAULT_ENDPOINT

  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText)
    throw new Error(
      `News request failed with status ${response.status}: ${errorText || response.statusText}`,
    )
  }

  const payload = (await response.json()) as Partial<NewsApiResponse> | null
  if (!payload || !Array.isArray(payload.updates)) {
    throw new Error('News payload missing "updates" array')
  }

  return payload.updates
}
