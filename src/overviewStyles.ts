// Central stylesheet for the overview (no inline style attributes in components)
export const OVERVIEW_CSS = `
.gb-container { min-height:calc(100vh - 60px); padding:24px; color:var(--gl-text-color,#222); font-family:var(--gl-font-family,system-ui,sans-serif); max-width:1100px; }
.gb-container h1 { margin-top:0; }
.gb-filter-bar { margin-top:10px; padding:8px 12px; border:1px solid #ccc; border-radius:6px; display:flex; gap:18px; align-items:center; font-size:12px; flex-wrap:wrap; }
.gb-filter-item { display:flex; align-items:center; gap:6px; cursor:pointer; }
.gb-filter-row { margin-top:12px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.gb-input { flex:1; min-width:260px; padding:6px 10px; border:1px solid #bbb; border-radius:6px; font-size:13px; }
.gb-small-text { font-size:12px; opacity:.7; }
.gb-btn { padding:6px 10px; border:1px solid #bbb; border-radius:6px; cursor:pointer; font-size:12px; line-height:1; }
.gb-btn[disabled] { cursor:not-allowed; opacity:.5; }
.gb-ephemeral-wrapper { margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:12px; }
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
.gb-magnify-btn { border:1px solid #bbb; color:#222; padding:2px 5px; border-radius:4px; font-size:11px; cursor:pointer; line-height:1; display:inline-flex; align-items:center; gap:2px; }
.gb-magnify-btn[disabled] { background:#f5f5f5; color:#999; cursor:not-allowed; }
.gb-avatar-wrapper { display:inline-flex; align-items:center; justify-content:center; }
.gb-avatar { width:22px; height:22px; border-radius:50%; object-fit:cover; border:1px solid #ccc; background:#eee; display:inline-block; }
.gb-avatar-fallback { width:22px; height:22px; border-radius:50%; border:1px solid #ccc; background:#eee; display:inline-block; font-size:10px; line-height:22px; text-align:center; color:#555; }
.gb-avatar.overlap, .gb-avatar-fallback.overlap { margin-left:-6px; }
.gb-link { text-decoration:none; color:#1f78d1; }
.gb-section { margin-top:20px; }
.gb-error { color:#ec5941; }
.gb-label-bold { font-weight:600; }
`;
