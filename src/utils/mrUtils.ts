import { MR } from '../types'

export const isDraftMr = (mr: MR): boolean => {
  const title = mr.title.toLowerCase()
  return mr.draft || mr.work_in_progress || title.startsWith('draft:') || title.startsWith('wip:')
}

export const isHotfixMr = (mr: MR): boolean => {
  const target = mr.target_branch.toLowerCase()
  return target === 'main' || target === 'master' || mr.title.includes('🚑')
}

export const extractJiraTicket = (title: string): string | null => {
  const match = title.toUpperCase().match(/([A-Z][A-Z0-9]+-\d+)/)
  return match ? match[1] : null
}

export const formatUpdatedAt = (iso: string): string => {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

