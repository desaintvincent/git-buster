import { Options, MR, TAG, getTags, displayBadge, getBadge, colors, isMrMine } from './types'

// Builds the HTML content (table) for the overview page.
// Keeping this isolated allows easy customization of layout & columns later.
export const buildOverviewContent = (allMr: MR[], options: Options): string => {

    const rows = allMr.map(mr => {
        const tags = getTags(mr)
        const badge = getBadge(isMrMine(mr, options), tags)
        return `<tr>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd"><a href="${mr.web_url}" target="_blank" style="text-decoration:none;color:#1f78d1">${mr.title.replace(/</g,'&lt;')}</a><div style="opacity:.6;font-size:11px">${mr.source_branch} → ${mr.target_branch}</div></td>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${mr.author?.name}</td>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${tags.map(t => displayBadge(t, isMrMine(mr, options))).join('') || displayBadge(TAG.CAN_BE_MERGED, isMrMine(mr, options))}</td>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;"><span style="background:${colors[badge]};padding:2px 6px;border-radius:4px;border:1px solid #000;">${badge}</span></td>
        </tr>`
    }).join('')

    return `<table style="border-collapse:collapse;min-width:680px;width:100%">
        <thead><tr>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Tags</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Badge</th>
        </tr></thead>
        <tbody>${rows}</tbody>
    </table>`
}
