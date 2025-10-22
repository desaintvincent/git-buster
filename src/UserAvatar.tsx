import type { User } from './types'

// Small avatar chip showing the user's avatar; on hover (title) shows username + full name.
// Props: user (required), size (px, default 22), overlap (boolean to use negative left margin for compact stacking)
export const UserAvatar = ({ user, size = 22, overlap = false }: { user: User; size?: number; overlap?: boolean }) => {
  const tooltip = `${user.username} — ${user.name}`
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover' as const,
    border: '1px solid #ccc',
    background: '#eee',
    display: 'inline-block',
  }
  return (
    <span
      title={tooltip}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: overlap ? '-6px' : '0',
      }}
    >
      {user.avatar_url ? (
        <img src={user.avatar_url} alt={user.username} style={style} />
      ) : (
        <span style={{...style, fontSize: '10px', lineHeight: `${size}px`, textAlign: 'center', color: '#555'}}>{user.username?.charAt(0).toUpperCase()}</span>
      )}
    </span>
  )
}
