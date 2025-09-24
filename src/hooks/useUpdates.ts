import { useEffect, useState } from 'react'
import type { UpdateItem } from '../types/content'
import { fetchUpdates } from '../services/newsApi'

export interface UseUpdatesState {
  updates: UpdateItem[]
  isLoading: boolean
  error?: string
  lastUpdated?: Date
}

export function useUpdates(): UseUpdatesState {
  const [updates, setUpdates] = useState<UpdateItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>()

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setError(undefined)
      try {
        const remoteUpdates = await fetchUpdates(controller.signal)
        setUpdates(remoteUpdates)
        setLastUpdated(new Date())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Tuntematon virhe')
      } finally {
        setIsLoading(false)
      }
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [])

  return { updates, isLoading, error, lastUpdated }
}
