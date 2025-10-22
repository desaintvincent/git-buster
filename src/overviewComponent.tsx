import { render } from 'preact'
import { Options, MR, TAG, getTags, displayBadge, getBadge, colors, isMrMine } from './types'

const escapeHtml = (s: string) => s.replace(/</g, '&lt;')

interface OverviewProps {
  mrs: MR[]
  options: Options
}

const OverviewTable = ({ mrs, options }: OverviewProps) => {
  return (
      <>
          PATATE
          <table style="border-collapse:collapse;min-width:680px;width:100%">
              <thead>
              <tr>
                  <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
                  <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
                  <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Tags</th>
                  <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Badge</th>
              </tr>
              </thead>
              <tbody>
              {mrs.map(mr => {
                  const tags = getTags(mr)
                  const mine = isMrMine(mr, options)
                  const badge = getBadge(mine, tags)
                  return (
                      <tr key={mr.id}>
                          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">
                              <a href={mr.web_url} target="_blank" style="text-decoration:none;color:#1f78d1">{escapeHtml(mr.title)}</a>
                              <div style="opacity:.6;font-size:11px">{mr.source_branch} → {mr.target_branch}</div>
                          </td>
                          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">{mr.author?.name}</td>
                          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">
                              {tags.length
                                  ? tags.map(t => <span dangerouslySetInnerHTML={{ __html: displayBadge(t, mine) }} />)
                                  : <span dangerouslySetInnerHTML={{ __html: displayBadge(TAG.CAN_BE_MERGED, mine) }} />}
                          </td>
                          <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">
                <span style={`background:${colors[badge]};padding:2px 6px;border-radius:4px;border:1px solid #000;`}>
                  {badge}
                </span>
                          </td>
                      </tr>
                  )
              })}
              </tbody>
          </table>
      </>
  )
}

export const mountOverview = (container: HTMLElement, allMr: MR[], options: Options) => {
  render(<OverviewTable mrs={allMr} options={options} />, container)
}

