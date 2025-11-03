import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

interface UpdatedDateProps { iso: string }

const computeRelative = (iso: string): string => {
  const target = new Date(iso)
  if (isNaN(target.getTime())) return 'Invalid date'
  const now = new Date()
  let diffMs = target.getTime() - now.getTime()
  const past = diffMs < 0
  diffMs = Math.abs(diffMs)
  const sec = Math.floor(diffMs / 1000)
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)
  const month = Math.floor(day / 30)
  const year = Math.floor(day / 365)
  const fmt = (val: number, unit: string) => `${val} ${unit}${val > 1 ? 's' : ''}`
  let phrase: string
  if (sec < 45) phrase = 'just now'
  else if (min < 2) phrase = '1 minute ago'
  else if (min < 60) phrase = `${fmt(min, 'minute')} ago`
  else if (hr < 2) phrase = '1 hour ago'
  else if (hr < 24) phrase = `${fmt(hr, 'hour')} ago`
  else if (day < 2) phrase = '1 day ago'
  else if (day < 30) phrase = `${fmt(day, 'day')} ago`
  else if (month < 2) phrase = '1 month ago'
  else if (month < 12) phrase = `${fmt(month, 'month')} ago`
  else if (year < 2) phrase = '1 year ago'
  else phrase = `${fmt(year, 'year')} ago`
  if (!past) {
    // Future date handling
    if (sec < 45) return 'in a moment'
    if (min < 2) return 'in 1 minute'
    if (min < 60) return `in ${fmt(min, 'minute')}`
    if (hr < 2) return 'in 1 hour'
    if (hr < 24) return `in ${fmt(hr, 'hour')}`
    if (day < 2) return 'in 1 day'
    if (day < 30) return `in ${fmt(day, 'day')}`
    if (month < 2) return 'in 1 month'
    if (month < 12) return `in ${fmt(month, 'month')}`
    if (year < 2) return 'in 1 year'
    return `in ${fmt(year, 'year')}`
  }
  return phrase
}

const formatFrenchDate = (iso: string): string => {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '-'
  // dd/MM/yyyy HH:mm (24h)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const UpdatedDate = ({ iso }: UpdatedDateProps) => {
  const [relative, setRelative] = useState(() => computeRelative(iso))
  useEffect(() => {
    const id = setInterval(() => setRelative(computeRelative(iso)), 60000) // refresh every minute
    return () => clearInterval(id)
  }, [iso])
  const display = formatFrenchDate(iso)
  return <time dateTime={iso} title={relative} className="gb-date">{display}</time>
}
