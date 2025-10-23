// Central stylesheet for the overview (no inline style attributes in components)
export const OVERVIEW_CSS = `
.gb-container { min-height:calc(100vh - 60px); padding:24px; color:var(--gl-text-color,#222); font-family:var(--gl-font-family,system-ui,sans-serif); max-width:1100px; }
.gb-container h1 { margin-top:0; }
.gb-filter-bar { margin-top:10px; padding:8px 12px; border:1px solid #ccc; border-radius:6px; display:flex; gap:18px; align-items:center; font-size:12px; flex-wrap:wrap; }
.gb-filter-item { display:flex; align-items:center; gap:6px; cursor:pointer; margin-bottom: 0; }
.gb-pipeline-select { padding:4px 6px; border:1px solid #bbb; border-radius:4px; background:#fff; font-size:12px; }
@media (prefers-color-scheme: dark) { .gb-pipeline-select { background:#333238; color:#fff; } }
body[data-theme='dark'] .gb-pipeline-select, body.theme-dark .gb-pipeline-select { background:#333238; color:#fff; }
.gb-filter-row { margin-top:12px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.gb-input { flex:1; min-width:260px; padding:6px 10px; border:1px solid #bbb; border-radius:6px; font-size:13px; }
.gb-small-text { font-size:12px; opacity:.7; }
.gb-btn { padding:6px 10px; border:1px solid #bbb; border-radius:6px; cursor:pointer; font-size:12px; line-height:1; }
.gb-btn[disabled] { cursor:not-allowed; opacity:.5; }
.gb-ephemeral-wrapper { margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:12px; }
.gb-filter-bar .gb-ephemeral-wrapper { margin-top:0; }
.gb-ephemeral-inner { display:flex; flex-direction:column; gap:4px; min-width:240px; }
.gb-ephemeral-row { display:flex; gap:6px; align-items:center; }
.gb-ephemeral-input { flex:1; padding:6px 8px; border:1px solid #bbb; border-radius:6px; font-size:12px; }
.gb-helper { opacity:.6; font-size:11px; }
.gb-table { border-collapse:collapse; min-width:760px; width:100%; font-size:13px; line-height:18px; }
.gb-th { text-align:left; padding:6px 8px; border-bottom:2px solid #444; }
.gb-td { vertical-align:top; padding:4px 8px; border-top:1px solid #ddd; }
.gb-td-small { width:1%; white-space:nowrap; font-size:11px; }
.gb-title-cell { display:flex; align-items:flex-start; gap:6px; }
.gb-sub { opacity:.6; font-size:11px; }
.gb-avatar-stack { display:inline-flex; align-items:center; }
.gb-magnify-btn { border:1px solid #bbb; color:#222; padding:0; width:24px; height:22px; border-radius:4px; font-size:14px; cursor:pointer; line-height:1; display:inline-flex; align-items:center; justify-content:center; }
.gb-magnify-btn:hover:not([disabled]) { background:#e6ebf1; }
@media (prefers-color-scheme: dark){ .gb-magnify-btn { background:#333238; color:#fff; } .gb-magnify-btn:hover:not([disabled]) { background:#444b53; } }
.gb-avatar-wrapper { display:inline-flex; align-items:center; justify-content:center; }
.gb-avatar { width:22px; height:22px; border-radius:50%; object-fit:cover; border:1px solid #ccc; background:#eee; display:inline-block; }
.gb-avatar-fallback { width:22px; height:22px; border-radius:50%; border:1px solid #ccc; background:#eee; display:inline-block; font-size:10px; line-height:22px; text-align:center; color:#555; }
.gb-avatar.overlap, .gb-avatar-fallback.overlap { margin-left:-6px; }
.gb-link { text-decoration:none; color:#1f78d1; font-weight:600; font-size:14px; line-height:20px; }
.gb-link:hover { text-decoration:underline; }
.gb-select { position:relative; display:inline-block; }
.gb-select-trigger { padding:6px 10px; border:1px solid #bbb; border-radius:6px; background:#333238; font-size:12px; cursor:pointer; display:flex; align-items:center; gap:6px; color:#fff; }
.gb-select-trigger.disabled { cursor:not-allowed; opacity:.5; }
.gb-select-menu { position:absolute; top:100%; left:0; background:#333238; border:1px solid #bbb; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.15); width:220px; padding:4px 0; z-index:999; max-height:260px; overflow:auto; }
.gb-select-item { display:flex; align-items:center; gap:6px; padding:6px 10px; font-size:12px; cursor:pointer; }
.gb-select-item:hover { background-color: buttonface; }
.gb-select-item.active { background-color: buttonface; }
.gb-select-empty { padding:6px 10px; font-size:11px; opacity:.6; }
.gb-select-placeholder { font-size:11px; opacity:.7; }
.gb-select-value { font-size:11px; }
.gb-label { font-size:12px; font-weight:600; }
.gb-filter-group { display:flex; flex-wrap:wrap; gap:18px; margin-top:10px; }
.gb-project-filter-wrapper { display:flex; flex-direction:column; gap:4px; }
.gb-project-filter-label, .gb-author-filter-label { font-weight:600; font-size:12px; }
.gb-project-filter { display:flex; flex-direction:column; gap:4px; }
.gb-mt6 { margin-top:6px; }
.gb-mr-title-block { display:flex; flex-direction:column; gap:2px; }
.gb-mr-title-line { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.gb-mr-link { text-decoration:none; color:#1f78d1; font-weight:600; font-size:15px; line-height:22px; }
.gb-mr-link:hover { text-decoration:underline; color:#1f78d1; }
.gb-mr-draft { background:none; padding:0; border-radius:0; color:#c17d10; font-weight:600; font-size:12px; }
.gb-mr-meta-line { display:flex; align-items:center; gap:8px; font-size:11px; color:#6b6b6b; }
.gb-mr-branches { font-family:monospace; font-size:11px; }
.gb-mr-iid { font-size:12px; font-weight:500; color:#6b6b6b; }
.gb-header-row { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.gb-group-select-label { display:flex; align-items:center; gap:6px; font-size:12px; }
.gb-group-select-text { font-weight:600; font-size:12px; }
.gb-group-select { padding:6px 10px; border:1px solid #bbb; border-radius:6px; background:#333238; color:#fff; font-size:12px; }
.gb-group-row .gb-group-cell { background:#e6ebf1; font-weight:600; font-size:12px; padding:6px 8px; border-top:2px solid #444; color:#222; letter-spacing:.25px; }
.gb-group-row:first-child .gb-group-cell { border-top:2px solid #444; }
/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .gb-group-row .gb-group-cell { background:#2d3640; color:#f1f3f5; border-top:2px solid #555; }
}
body[data-theme='dark'] .gb-group-row .gb-group-cell,
body.theme-dark .gb-group-row .gb-group-cell { background:#2d3640; color:#f1f3f5; border-top:2px solid #555; }
/* Extra separation between successive groups */
.gb-group-row + .gb-group-row .gb-group-cell { border-top:3px solid #444; }
.gb-sortable { background:none; border:none; padding:0; cursor:pointer; font:inherit; color:inherit; display:inline-flex; align-items:center; gap:4px; font-weight:600; }
.gb-sortable .gb-sort-indicator { font-size:10px; opacity:.8; }
.gb-sortable:hover .gb-sort-indicator { opacity:1; }
.gb-group-header { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.gb-group-title { font-weight:600; }
.gb-group-latest { font-size:11px; opacity:.75; font-family:monospace; }
@media (prefers-color-scheme: dark) { .gb-group-latest { opacity:.85; } }
body[data-theme='dark'] .gb-group-latest, body.theme-dark .gb-group-latest { opacity:.85; }
.gb-date { font-size:11px; font-family:monospace; white-space:nowrap; cursor:help; }
.gb-date:hover { text-decoration:underline; }
@media (prefers-color-scheme: dark) { .gb-date { color:#d1d5da; } }
body[data-theme='dark'] .gb-date, body.theme-dark .gb-date { color:#d1d5da; }
.gb-pipeline-status { font-size:11px; display:inline-flex; min-width:20px; height:18px; align-items:center; justify-content:center; font-weight:600; border:1px solid #bbb; border-radius:4px; line-height:1; background:#f5f5f5; padding:0 4px; }
.gb-pipeline-status.success { background:#2da160; color:#fff; border-color:#2da160; }
.gb-pipeline-status.failed { background:#ec5941; color:#fff; border-color:#ec5941; }
.gb-pipeline-status.other { background:#c17d10; color:#fff; border-color:#c17d10; }
@media (prefers-color-scheme: dark){ .gb-pipeline-status { background:#333238; } }
body[data-theme='dark'] .gb-pipeline-status, body.theme-dark .gb-pipeline-status { background:#333238; }
.gb-avatar-filter-value { position:relative; display:inline-block; }
.gb-avatar-invert-marker { position:absolute; top:-3px; right:-3px; background:#fff; color:#ec5941; font-size:10px; line-height:1; padding:1px 3px; border:1px solid #ec5941; border-radius:8px; box-shadow:0 0 2px rgba(0,0,0,.25); }
@media (prefers-color-scheme: dark){ .gb-avatar-invert-marker { background:#333238; } }
body[data-theme='dark'] .gb-avatar-invert-marker, body.theme-dark .gb-avatar-invert-marker { background:#333238; }
.gb-req-status { font-size:10px; font-family:monospace; padding:2px 4px; border:1px solid #bbb; border-radius:4px; display:inline-block; background:#f5f5f5; }
.gb-req-status { white-space:nowrap; }
.gb-req-status.ready { background:#2da160; border-color:#2da160; color:#fff; }
.gb-req-status.not-ready { background:#ec5941; border-color:#ec5941; color:#fff; }
@media (prefers-color-scheme: dark){ .gb-req-status.ready { background:#2da160; } .gb-req-status.not-ready { background:#ec5941; } }
.gb-inline-cell { display:inline-flex; align-items:center; gap:4px; }
.gb-inline-cell.right { justify-content:flex-end; }
.gb-right { text-align:right; }
.gb-team-miss-container { display:flex; flex-wrap:wrap; gap:4px; }
.gb-team-miss { background:#ec5941; color:#fff; font-size:10px; padding:2px 4px; border-radius:4px; line-height:1.2; font-family:monospace; }
.gb-team-miss-block { display:flex; flex-wrap:wrap; gap:4px; margin-top:4px; }
@media (prefers-color-scheme: dark){ .gb-team-miss { background:#ec5941; } }
body[data-theme='dark'] .gb-team-miss, body.theme-dark .gb-team-miss { background:#ec5941; }
.gb-miss-agg { background:#ec5941; color:#fff; font-size:10px; padding:2px 5px; border-radius:10px; font-family:monospace; font-weight:600; display:inline-flex; align-items:center; line-height:1; opacity:.35; transition:opacity .15s ease-in-out; }
tr:hover .gb-miss-agg { opacity:1; }
`;
