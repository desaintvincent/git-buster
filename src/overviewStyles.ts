// Central stylesheet for the overview (no inline style attributes in components)
export const OVERVIEW_CSS = `
.gb-container { min-height:calc(100vh - 60px); padding:24px; color:var(--gl-text-color,var(--gray-900,#303030)); font-family:var(--default-font,var(--gl-font-family,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans",Ubuntu,Cantarell,"Helvetica Neue",sans-serif)); background:var(--white,var(--gl-page-bg,#fff)); width:100%; box-sizing:border-box; }
.gb-container h1 { margin-top:0; font-size:24px; font-weight:600; color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-filter-bar { margin-top:10px; padding:12px 16px; border:1px solid var(--border-color,var(--gray-200,#dbdbdb)); border-radius:4px; display:flex; gap:16px; align-items:center; font-size:14px; flex-wrap:wrap; background:var(--gray-10,#fafafa); }
.gb-filter-item { display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:0; }
.gb-pipeline-select { padding:8px 12px; border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); border-radius:4px; background:var(--white,#fff); font-size:14px; color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-pipeline-select:focus { outline:none; border-color:var(--blue-500,#1068bf); box-shadow:0 0 0 1px var(--blue-500,#1068bf); }
.gb-filter-row { margin-top:16px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.gb-input { flex:1; min-width:260px; padding:8px 12px; border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); border-radius:4px; font-size:14px; background:var(--white,#fff); color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-input:focus { outline:none; border-color:var(--blue-500,#1068bf); box-shadow:0 0 0 1px var(--blue-500,#1068bf); }
.gb-small-text { font-size:14px; color:var(--gray-600,#666); }
.gb-btn { padding:8px 12px; border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); border-radius:4px; cursor:pointer; font-size:14px; line-height:20px; background:var(--white,#fff); color:var(--gl-text-color,var(--gray-900,#303030)); font-weight:500; transition:background-color .1s linear; }
.gb-btn:hover { background:var(--gray-10,#fafafa); border-color:var(--gray-400,#999); }
.gb-btn[disabled] { cursor:not-allowed; opacity:.5; background:var(--gray-10,#fafafa); }
.gb-ephemeral-wrapper { margin-top:12px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:14px; }
.gb-filter-bar .gb-ephemeral-wrapper { margin-top:0; }
.gb-ephemeral-inner { display:flex; flex-direction:column; gap:6px; min-width:240px; }
.gb-ephemeral-row { display:flex; gap:8px; align-items:center; }
.gb-ephemeral-input { flex:1; padding:8px 12px; border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); border-radius:4px; font-size:14px; background:var(--white,#fff); color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-ephemeral-input:focus { outline:none; border-color:var(--blue-500,#1068bf); box-shadow:0 0 0 1px var(--blue-500,#1068bf); }
.gb-helper { color:var(--gray-600,#666); font-size:12px; }
.gb-table { border-collapse:collapse; min-width:760px; width:100%; font-size:14px; line-height:20px; background:var(--white,#fff); }
.gb-th { text-align:left; padding:8px 12px; border-bottom:1px solid var(--border-color,var(--gray-200,#dbdbdb)); font-weight:600; color:var(--gl-text-color,var(--gray-900,#303030)); background:var(--gray-10,#fafafa); }
.gb-td { vertical-align:top; padding:12px; border-top:1px solid var(--border-color,var(--gray-100,#ececef)); }
.gb-td-small { width:1%; white-space:nowrap; font-size:12px; }
.gb-title-cell { display:flex; align-items:flex-start; gap:8px; }
.gb-sub { color:var(--gray-600,#666); font-size:12px; }
.gb-avatar-stack { display:inline-flex; align-items:center; }
.gb-magnify-btn { border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); color:var(--gl-text-color,var(--gray-900,#303030)); padding:0; width:28px; height:28px; border-radius:4px; font-size:14px; cursor:pointer; line-height:1; display:inline-flex; align-items:center; justify-content:center; background:var(--white,#fff); transition:background-color .1s linear; }
.gb-magnify-btn:hover:not([disabled]) { background:var(--gray-50,#f0f0f0); border-color:var(--gray-400,#999); }
.gb-avatar-wrapper { display:inline-flex; align-items:center; justify-content:center; }
.gb-avatar { width:24px; height:24px; border-radius:50%; object-fit:cover; border:1px solid var(--border-color,var(--gray-200,#dbdbdb)); background:var(--gray-50,#f0f0f0); display:inline-block; }
.gb-avatar-fallback { width:24px; height:24px; border-radius:50%; border:1px solid var(--border-color,var(--gray-200,#dbdbdb)); background:var(--gray-50,#f0f0f0); display:inline-block; font-size:11px; line-height:24px; text-align:center; color:var(--gray-600,#666); font-weight:500; }
.gb-avatar.overlap, .gb-avatar-fallback.overlap { margin-left:-8px; }
.gb-link { text-decoration:none; color:var(--blue-600,var(--gl-link-color,#1068bf)); font-weight:500; font-size:14px; line-height:20px; }
.gb-link:hover { color:var(--blue-700,#0b5cad); text-decoration:underline; }
.gb-select { position:relative; display:inline-block; }
.gb-select-trigger { padding:8px 12px; border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); border-radius:4px; background:var(--white,#fff); font-size:14px; cursor:pointer; display:flex; align-items:center; gap:8px; color:var(--gl-text-color,var(--gray-900,#303030)); transition:background-color .1s linear; }
.gb-select-trigger:hover { background:var(--gray-10,#fafafa); border-color:var(--gray-400,#999); }
.gb-select-trigger.disabled { cursor:not-allowed; opacity:.5; }
.gb-select-menu { position:absolute; top:100%; left:0; background:var(--white,#fff); border:1px solid var(--border-color,var(--gray-200,#dbdbdb)); border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,.1); width:220px; padding:4px 0; z-index:999; max-height:260px; overflow:auto; }
.gb-select-item { display:flex; align-items:center; gap:8px; padding:8px 12px; font-size:14px; cursor:pointer; color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-select-item:hover { background:var(--gray-50,#f0f0f0); }
.gb-select-item.active { background:var(--blue-100,#e1ecfa); color:var(--blue-600,#1068bf); }
.gb-select-empty { padding:8px 12px; font-size:12px; color:var(--gray-600,#666); }
.gb-select-placeholder { font-size:14px; color:var(--gray-600,#666); }
.gb-select-value { font-size:14px; }
.gb-label { font-size:14px; font-weight:600; color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-filter-group { display:flex; flex-wrap:wrap; gap:16px; margin-top:12px; }
.gb-project-filter-wrapper { display:flex; flex-direction:column; gap:6px; }
.gb-project-filter-label, .gb-author-filter-label { font-weight:600; font-size:14px; color:var(--gl-text-color,var(--gray-900,#303030)); }
.gb-project-filter { display:flex; flex-direction:column; gap:6px; }
.gb-mt6 { margin-top:6px; }
.gb-mr-title-block { display:flex; flex-direction:column; gap:4px; }
.gb-mr-title-line { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.gb-mr-link { text-decoration:none; color:var(--blue-600,var(--gl-link-color,#1068bf)); font-weight:500; font-size:16px; line-height:24px; }
.gb-mr-link:hover { color:var(--blue-700,#0b5cad); text-decoration:underline; }
.gb-mr-draft { background:none; padding:0; border-radius:0; color:var(--orange-600,#c17d10); font-weight:500; font-size:12px; }
.gb-mr-meta-line { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--gray-600,#666); }
.gb-mr-branches { font-family:monospace; font-size:12px; }
.gb-mr-iid { font-size:14px; font-weight:500; color:var(--gray-600,#666); }
.gb-header-row { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:16px; }
.gb-header-right { display:flex; align-items:center; gap:12px; }
.gb-header-status { display:flex; align-items:center; gap:8px; padding:6px 12px; background:var(--gray-10,#fafafa); border:1px solid var(--border-color,var(--gray-200,#dbdbdb)); border-radius:4px; font-size:14px; color:var(--gray-600,#666); }
.gb-header-spinner { display:flex; align-items:center; justify-content:center; color:var(--blue-600,#1068bf); }
.gb-header-error-icon { display:flex; align-items:center; justify-content:center; color:var(--red-600,#dd2b0e); }
.gb-header-status-text { font-size:14px; line-height:20px; white-space:nowrap; }
.gb-header-error-text { color:var(--red-600,#dd2b0e); font-weight:500; }
.gb-group-select-label { display:flex; align-items:center; gap:8px; font-size:14px; }
.gb-group-select-text { font-weight:600; font-size:14px; }
.gb-group-select { padding:8px 12px; border:1px solid var(--border-color,var(--gray-200,#bfbfbf)); border-radius:4px; background:var(--white,#fff); color:var(--gl-text-color,var(--gray-900,#303030)); font-size:14px; }
.gb-group-select:focus { outline:none; border-color:var(--blue-500,#1068bf); box-shadow:0 0 0 1px var(--blue-500,#1068bf); }
.gb-group-row .gb-group-cell { background:var(--gray-50,#f0f0f0); font-weight:600; font-size:12px; padding:8px 12px; border-top:1px solid var(--border-color,var(--gray-200,#dbdbdb)); color:var(--gl-text-color,var(--gray-900,#303030)); letter-spacing:0; text-transform:uppercase; }
.gb-group-row:first-child .gb-group-cell { border-top:1px solid var(--border-color,var(--gray-200,#dbdbdb)); }
.gb-group-row + .gb-group-row .gb-group-cell { border-top:2px solid var(--border-color,var(--gray-200,#dbdbdb)); }
.gb-sortable { background:none; border:none; padding:0; cursor:pointer; font:inherit; color:inherit; display:inline-flex; align-items:center; gap:4px; font-weight:600; }
.gb-sortable .gb-sort-indicator { font-size:10px; opacity:.7; }
.gb-sortable:hover .gb-sort-indicator { opacity:1; }
.gb-group-header { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.gb-group-title { font-weight:600; }
.gb-group-latest { font-size:12px; color:var(--gray-600,#666); font-family:monospace; }
.gb-date { font-size:12px; font-family:monospace; white-space:nowrap; cursor:help; color:var(--gray-600,#666); }
.gb-date:hover { text-decoration:underline; }
.gb-pipeline-status { display:inline-flex; align-items:center; justify-content:center; line-height:1; }
.gb-pipeline-status svg { display:block; }
.gb-pipeline-status.success { color:var(--green-600,#108548); }
.gb-pipeline-status.failed { color:var(--red-600,#dd2b0e); }
.gb-pipeline-status.other { color:var(--orange-600,#c17d10); }
.gb-avatar-filter-value { position:relative; display:inline-block; }
.gb-avatar-invert-marker { position:absolute; top:-3px; right:-3px; background:var(--white,#fff); color:var(--red-600,#dd2b0e); font-size:10px; line-height:1; padding:1px 3px; border:1px solid var(--red-600,#dd2b0e); border-radius:8px; box-shadow:0 0 2px rgba(0,0,0,.2); }
.gb-req-status { display:inline-flex; align-items:center; justify-content:center; line-height:1; }
.gb-req-status svg { display:block; }
.gb-req-status.ready { color:var(--green-600,#108548); }
.gb-req-status.not-ready { color:var(--red-600,#dd2b0e); }
.gb-inline-cell { display:inline-flex; align-items:center; gap:4px; }
.gb-inline-cell.right { justify-content:flex-end; }
.gb-right { text-align:right; }
.gb-team-miss-container { display:flex; flex-wrap:wrap; gap:4px; }
.gb-team-miss { background:var(--red-600,#dd2b0e); color:#fff; font-size:11px; padding:4px 6px; border-radius:4px; line-height:1.2; font-family:monospace; font-weight:500; }
.gb-team-miss-block { display:flex; flex-wrap:wrap; gap:4px; margin-top:4px; }
.gb-miss-agg { background:var(--red-600,#dd2b0e); color:#fff; font-size:11px; padding:4px 6px; border-radius:12px; font-family:monospace; font-weight:600; display:inline-flex; align-items:center; line-height:1; opacity:.4; transition:opacity .15s ease-in-out; }
.gb-miss-agg { background:var(--red-600,#dd2b0e); color:#fff; font-size:11px; padding:4px 6px; border-radius:12px; font-family:monospace; font-weight:600; display:inline-flex; align-items:center; line-height:1; opacity:.4; transition:opacity .15s ease-in-out; }
tr:hover .gb-miss-agg { opacity:1; }
.gb-skeleton-container { animation:gb-skeleton-fade-in .2s ease-in; }
@keyframes gb-skeleton-fade-in { from { opacity:0; } to { opacity:1; } }
.gb-skeleton-line { background:linear-gradient(90deg, var(--gray-100,#ececef) 25%, var(--gray-200,#dbdbdb) 50%, var(--gray-100,#ececef) 75%); background-size:200% 100%; animation:gb-skeleton-shimmer 1.5s infinite; border-radius:4px; }
.gb-skeleton-avatar { width:24px; height:24px; border-radius:50%; background:linear-gradient(90deg, var(--gray-100,#ececef) 25%, var(--gray-200,#dbdbdb) 50%, var(--gray-100,#ececef) 75%); background-size:200% 100%; animation:gb-skeleton-shimmer 1.5s infinite; display:inline-block; }
.gb-skeleton-avatar.overlap { margin-left:-8px; }
.gb-skeleton-avatars { display:inline-flex; align-items:center; justify-content:flex-end; }
.gb-skeleton-icon { width:16px; height:16px; border-radius:50%; background:linear-gradient(90deg, var(--gray-100,#ececef) 25%, var(--gray-200,#dbdbdb) 50%, var(--gray-100,#ececef) 75%); background-size:200% 100%; animation:gb-skeleton-shimmer 1.5s infinite; display:inline-block; }
.gb-skeleton-title-block { display:flex; flex-direction:column; gap:8px; }
@keyframes gb-skeleton-shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }
`;
