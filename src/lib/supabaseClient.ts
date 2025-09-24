import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface SupabaseUpdatesRow {
  id: string
  title: string
  description: string | null
  link: string | null
  published_at: string | null
}

export type SupabaseDatabase = {
  public: {
    Tables: {
      updates: {
        Row: SupabaseUpdatesRow
      }
    }
  }
}

export type SupabaseUpdatesClient = SupabaseClient<SupabaseDatabase>

let client: SupabaseUpdatesClient | null = null

function resolveEnv(key: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY'): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const value = import.meta.env[key]
    if (value) return value
  }
  if (typeof process !== 'undefined' && process.env) {
    const value = process.env[key]
    if (value) return value
  }
  return undefined
}

export function getSupabaseClient(): SupabaseUpdatesClient | null {
  const supabaseUrl = resolveEnv('VITE_SUPABASE_URL')
  const supabaseAnonKey = resolveEnv('VITE_SUPABASE_ANON_KEY')

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  if (!client) {
    client = createClient<SupabaseDatabase>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          'X-Client-Info': 'lapland-ai-lab-site/1.0',
        },
      },
    })
  }

  return client
}
