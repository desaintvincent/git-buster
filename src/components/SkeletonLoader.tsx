import { h } from 'preact'

export const SkeletonLoader = () => (
  h('div', { className: 'gb-skeleton-container' },
    h('table', { className: 'gb-table' },
      h('thead', null,
        h('tr', null,
          h('th', { className: 'gb-th' }, 'Title'),
          h('th', { className: 'gb-th' }, 'Project'),
          h('th', { className: 'gb-th' }, 'Author'),
          h('th', { className: 'gb-th gb-td-small' }, 'Reviewers'),
          h('th', { className: 'gb-th gb-td-small' }, 'Approvers'),
          h('th', { className: 'gb-th gb-td-small' }, 'Pipeline'),
          h('th', { className: 'gb-th gb-td-small' }, 'Updated')
        )
      ),
      h('tbody', null,
        ...Array.from({ length: 8 }).map((_, i) =>
          h('tr', { key: i },
            h('td', { className: 'gb-td' },
              h('div', { className: 'gb-skeleton-title-block' },
                h('div', { className: 'gb-skeleton-line', style: { width: `${60 + Math.random() * 30}%`, height: '20px' } }),
                h('div', { className: 'gb-skeleton-line', style: { width: '40%', height: '14px', marginTop: '8px' } })
              )
            ),
            h('td', { className: 'gb-td' },
              h('div', { className: 'gb-skeleton-line', style: { width: '80px', height: '16px' } })
            ),
            h('td', { className: 'gb-td' },
              h('div', { className: 'gb-skeleton-avatar' })
            ),
            h('td', { className: 'gb-td gb-td-small' },
              h('div', { className: 'gb-skeleton-avatars' },
                h('div', { className: 'gb-skeleton-avatar' }),
                h('div', { className: 'gb-skeleton-avatar overlap' })
              )
            ),
            h('td', { className: 'gb-td gb-td-small' },
              h('div', { className: 'gb-skeleton-avatars' },
                h('div', { className: 'gb-skeleton-avatar' })
              )
            ),
            h('td', { className: 'gb-td gb-td-small' },
              h('div', { className: 'gb-skeleton-icon' })
            ),
            h('td', { className: 'gb-td gb-td-small' },
              h('div', { className: 'gb-skeleton-line', style: { width: '90px', height: '14px' } })
            )
          )
        )
      )
    )
  )
)
