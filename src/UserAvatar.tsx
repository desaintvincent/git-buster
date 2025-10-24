/// <reference path="./jsx.d.ts" />
import { h } from 'preact'
import type { User } from './types'

// Small avatar chip showing the user's avatar; on hover (title) shows username + full name.
// Props: user (required), overlap (boolean to use negative left margin for compact stacking)
export const UserAvatar = ({ user, overlap = false }: { user: User; overlap?: boolean }) => {
  const tooltip = `${user.username} — ${user.name}`
  const cls = overlap ? 'overlap' : ''
  return (
    <span title={tooltip} className="gb-avatar-wrapper">
      {user.avatar_url ? (
        <img src={user.avatar_url} alt={user.username} className={`gb-avatar ${cls}`} />
      ) : (
        <span className={`gb-avatar-fallback ${cls}`}>{user.username?.charAt(0).toUpperCase()}</span>
      )}
    </span>
  )
}
