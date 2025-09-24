import type { Handler } from '@netlify/functions'
import { neon } from '@neondatabase/serverless'

interface NewsRow {
  id: string
  title: string
  summary: string | null
  link: string | null
  published_at: string | null
}

const handler: Handler = async () => {
  const connectionString = process.env.NEON_DATABASE_URL
  if (!connectionString) {
    console.error('NEON_DATABASE_URL puuttuu ympäristömuuttujista')
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'NEON_DATABASE_URL puuttuu. Aseta se Netlifyssä tai .env-tiedostossa.' }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  }

  try {
    const sql = neon(connectionString)
    const rows =
      (await sql`
        SELECT
          id,
          title,
          summary,
          link,
          published_at
        FROM public.news
        WHERE published_at <= NOW()
        ORDER BY published_at DESC
        LIMIT 12;
      `) as NewsRow[]

    const updates = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.summary ?? 'Lisätietoja saat Lapland AI Labin tiimiltä.',
      date: row.published_at ? new Date(row.published_at).toLocaleDateString('fi-FI') : 'Ajantasainen',
      href: row.link ?? undefined,
    }))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify({ updates }),
    }
  } catch (error) {
    console.error('Neon-kysely epäonnistui', error)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ error: 'Neon-kysely epäonnistui.' }),
    }
  }
}

export { handler }
