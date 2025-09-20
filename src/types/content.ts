export interface NavItem {
  label: string
  href: string
}

export interface ActionLink {
  label: string
  href: string
}

export interface HeroStat {
  label: string
  value: string
}

export interface MissionItem {
  title: string
  description: string
}

export interface FocusArea {
  title: string
  description: string
  highlights: string[]
}

export interface Program {
  title: string
  description: string
  deliverables: string[]
}

export interface UpdateItem {
  title: string
  description: string
  date: string
  href?: string
}

export interface ContactChannel {
  label: string
  value: string
  href?: string
  description?: string
}
