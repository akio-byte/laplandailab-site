import matter from 'gray-matter'
import { marked } from 'marked'

export interface UpdateFrontmatter {
  title: string
  date: string
  description?: string
}

export interface UpdateSummary extends UpdateFrontmatter {
  slug: string
}

export interface UpdateContent extends UpdateSummary {
  html: string
  content: string
}

interface ParsedUpdate {
  slug: string
  frontmatter: UpdateFrontmatter
  content: string
  html: string
}

const markdownFiles = import.meta.glob('../../../updates/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const parseDate = (value: string) => {
  const timestamp = Date.parse(value)
  return Number.isNaN(timestamp) ? -Infinity : timestamp
}

const parsedUpdates: ParsedUpdate[] = Object.entries(markdownFiles)
  .map(([filePath, rawContent]) => {
    const { data, content } = matter(rawContent)
    const slug = filePath.replace(/^.*[\\/]/, '').replace(/\.md$/, '')

    const frontmatter: UpdateFrontmatter = {
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.date === 'string' ? data.date : '',
      description:
        typeof data.description === 'string'
          ? data.description
          : typeof data.excerpt === 'string'
          ? data.excerpt
          : undefined,
    }

    const html = marked.parse(content) as string

    return {
      slug,
      frontmatter,
      content,
      html,
    }
  })
  .sort((a, b) => parseDate(b.frontmatter.date) - parseDate(a.frontmatter.date))

export const getAllUpdates = (): UpdateSummary[] =>
  parsedUpdates.map(({ slug, frontmatter }) => ({ slug, ...frontmatter }))

export const getUpdateBySlug = (slug: string): UpdateContent | null => {
  const match = parsedUpdates.find((update) => update.slug === slug)

  if (!match) {
    return null
  }

  return {
    slug: match.slug,
    ...match.frontmatter,
    content: match.content,
    html: match.html,
  }
}

export const formatUpdateDate = (value: string): string => {
  const timestamp = Date.parse(value)

  if (!Number.isNaN(timestamp)) {
    return new Intl.DateTimeFormat('fi-FI', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(timestamp)
  }

  return value
}
