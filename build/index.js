"use strict";
/// <reference types="chrome" />
// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let options;
var BADGE;
(function (BADGE) {
    BADGE["ACTIONS"] = "actions";
    BADGE["WAIT"] = "wait";
    BADGE["DONE"] = "done";
    BADGE["NEUTRAL"] = "neutral";
})(BADGE || (BADGE = {}));
var TAG;
(function (TAG) {
    TAG["NOT_APPROVED_BY_ME"] = "not_approved_by_me";
    TAG["MISSING_APPROVALS"] = "missing_approvals";
    TAG["DISCUSSIONS_NOT_RESOLVED"] = "discussions_not_resolved";
    TAG["CI_UNSUCCESSFUL"] = "ci_unsuccessful";
    TAG["NEED_REBASE"] = "need_rebase";
    TAG["CAN_BE_MERGED"] = "can_be_merged";
})(TAG || (TAG = {}));
// /!\ is in order
const tagToBadgeForMe = {
    [TAG.DISCUSSIONS_NOT_RESOLVED]: BADGE.ACTIONS,
    [TAG.CI_UNSUCCESSFUL]: BADGE.ACTIONS,
    [TAG.NEED_REBASE]: BADGE.ACTIONS,
    [TAG.MISSING_APPROVALS]: BADGE.WAIT,
    [TAG.NOT_APPROVED_BY_ME]: BADGE.NEUTRAL,
    [TAG.CAN_BE_MERGED]: BADGE.DONE,
};
// /!\ is in order
const tagToBadgeForOthers = {
    [TAG.CI_UNSUCCESSFUL]: BADGE.WAIT,
    [TAG.DISCUSSIONS_NOT_RESOLVED]: BADGE.WAIT,
    [TAG.NOT_APPROVED_BY_ME]: BADGE.ACTIONS,
    [TAG.MISSING_APPROVALS]: BADGE.WAIT,
    [TAG.NEED_REBASE]: BADGE.WAIT,
    [TAG.CAN_BE_MERGED]: BADGE.DONE,
};
const tagsByMr = {};
const addTag = (mr, tag) => {
    if (!(mr.id in tagsByMr)) {
        tagsByMr[mr.id] = [];
    }
    tagsByMr[mr.id].push(tag);
};
const getTags = (mr) => {
    var _a;
    return (_a = tagsByMr[mr.id]) !== null && _a !== void 0 ? _a : [];
};
const colors = {
    [BADGE.ACTIONS]: '#ec5941',
    [BADGE.WAIT]: '#c17d10',
    [BADGE.DONE]: '#2da160',
    [BADGE.NEUTRAL]: 'white'
};
const EXTENSION_NAME = 'git-buster';
const EXT_PAGE_ID = 'git-buster-page';
const EXT_SIDEBAR_BTN_ID = 'git-buster-sidebar-btn';
let syntheticPageVisible = false;
let sidebarObserverStarted = false;
const loadOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // @ts-ignore
    const options = yield chrome.storage.sync.get([EXTENSION_NAME]);
    const scoppedOptions = (_a = options[EXTENSION_NAME]) !== null && _a !== void 0 ? _a : {};
    return Object.assign(Object.assign({}, scoppedOptions), { facultativeApprovers: ((_b = scoppedOptions.facultativeApprovers) !== null && _b !== void 0 ? _b : '').split(',').filter(Boolean) });
});
const getBadge = (isMine, tags) => {
    if (!tags.length) {
        return BADGE.DONE;
    }
    const mapping = isMine ? tagToBadgeForMe : tagToBadgeForOthers;
    for (const [tag, badge] of Object.entries(mapping)) {
        if (tags.includes(tag)) {
            return badge;
        }
    }
    return BADGE.NEUTRAL;
};
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const displayBadge = (tag, isMine) => {
    const badge = getBadge(isMine, [tag]);
    const classMap = {
        [BADGE.ACTIONS]: 'gb-tag-actions',
        [BADGE.WAIT]: 'gb-tag-wait',
        [BADGE.DONE]: 'gb-tag-done',
        [BADGE.NEUTRAL]: 'gb-tag-neutral'
    };
    return `<span class="gb-tag ${classMap[badge]}">${capitalizeFirstLetter(tag).replace(/_/g, ' ')}</span>`;
};
const setBadge = (mr) => {
    const issueElem = document.getElementById(`merge_request_${mr.id}`);
    if (!issueElem) {
        console.error('could not find elem', { mr });
        return;
    }
    const isMine = isMrMine(mr);
    const tags = getTags(mr);
    const badge = getBadge(isMine, tags);
    const badgeColor = colors[badge];
    // @ts-ignore
    issueElem.style.borderLeft = `5px solid ${badgeColor}`;
    // @ts-ignore
    issueElem.style.paddingLeft = '10px';
    const issueInfoElem = issueElem.querySelector('.issuable-info');
    if (!issueInfoElem) {
        console.error('could not find issuable-info', { mr });
        return;
    }
    if (badge === BADGE.DONE) {
        issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div>${displayBadge(TAG.CAN_BE_MERGED, isMine)}</div>
    </div>`;
        return;
    }
    issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div class="has-tooltip" title="is Mine: ${isMrMine(mr) ? 'true' : 'false'}" style="display: flex; gap: 5px">${tags.map(tag => displayBadge(tag, isMine)).join('')}</div>
    </div>`;
};
const myFetch = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch(`${options.baseUrl}/api/v4${url}`).then(res => res.json());
});
const isMrMine = (mr) => {
    var _a;
    return ((_a = mr.assignee) === null || _a === void 0 ? void 0 : _a.username) === options.username;
};
const getMrOfProject = (projectName, mrIids) => __awaiter(void 0, void 0, void 0, function* () {
    const project = (yield myFetch(`/projects?search=${projectName}`)).shift();
    const params = mrIids.map(iid => `iids[]=${iid}`).join('&');
    return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`);
});
const getAllMr = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const mergeRequests = document.querySelectorAll('li.merge-request .merge-request-title-text a');
    const mrByProject = new Map();
    for (let i = 0; i < mergeRequests.length; i++) {
        const href = mergeRequests[i].getAttribute('href');
        if (!href) {
            continue;
        }
        const [project, , , mrIid] = href.split('/').splice(-4);
        const iidList = (_c = mrByProject.get(project)) !== null && _c !== void 0 ? _c : [];
        iidList.push(mrIid);
        mrByProject.set(project, iidList);
    }
    const mrsByProject = yield Promise.all(Array.from(mrByProject)
        .map(([projectName, mrIIds]) => getMrOfProject(projectName, mrIIds)));
    return mrsByProject.flat();
});
const processDiscussion = (elem, mr) => __awaiter(void 0, void 0, void 0, function* () {
    const discussions = yield myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/discussions?per_page=100`);
    const humanDiscussions = discussions.filter((d) => !d.individual_note);
    if (!humanDiscussions.length) {
        elem.innerHTML += `<div class="discussion">No discussion</div>`;
        return;
    }
    const resolved = humanDiscussions.filter((discussion) => !!discussion.notes[0].resolved);
    const allResolved = resolved.length >= humanDiscussions.length;
    if (!allResolved) {
        addTag(mr, TAG.DISCUSSIONS_NOT_RESOLVED);
    }
    const color = allResolved ? colors[BADGE.DONE] : (isMrMine(mr) ? colors[BADGE.ACTIONS] : colors[BADGE.WAIT]);
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Discussions ${resolved.length}/${humanDiscussions.length}</div>`;
});
const processApprovals = (elem, mr) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const approval = yield myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`);
    if (!approval.approved) {
        const color = ((isMrMine(mr)) ? colors[BADGE.WAIT] : colors[BADGE.ACTIONS]);
        if (!isMrMine(mr)) {
            addTag(mr, TAG.NOT_APPROVED_BY_ME);
        }
        addTag(mr, TAG.MISSING_APPROVALS);
        elem.innerHTML += `<div class="approval" style="color: ${color}">No approval</div>`;
        return;
    }
    const needed = (_d = options.requiredApprovals) !== null && _d !== void 0 ? _d : 3;
    const requiredResolvers = approval.approved_by.filter(u => !options.facultativeApprovers.includes(u.user.username));
    const allResolved = requiredResolvers.length >= needed;
    const approvedByMe = !!approval.approved_by.find(u => u.user.username === options.username);
    if (!allResolved) {
        if (!approvedByMe && !isMrMine(mr)) {
            addTag(mr, TAG.NOT_APPROVED_BY_ME);
        }
        addTag(mr, TAG.MISSING_APPROVALS);
    }
    const color = allResolved ? colors[BADGE.DONE] : ((isMrMine(mr) || approvedByMe) ? colors[BADGE.WAIT] : colors[BADGE.ACTIONS]);
    const allAvatars = approval.approved_by.map(u => `<span class="author-link has-tooltip" title="Approved by ${u.user.name}" data-container="body" data-qa-selector="assignee_link" data-original-title="Approved by ${u.user.name}" aria-describedby="gl-tooltip5">
<img width="16" class="avatar avatar-inline s16 js-lazy-loaded" alt="" src="${u.user.avatar_url}" loading="lazy" data-qa_selector="js_lazy_loaded_content">
</span>`).join('');
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Approvals ${approval.approved_by.length}/${needed} (${allAvatars})</div>`;
});
const processCI = (mr) => __awaiter(void 0, void 0, void 0, function* () {
    const fullMR = yield myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}?include_diverged_commits_count=true`);
    if (fullMR.diverged_commits_count > 0) {
        addTag(mr, TAG.NEED_REBASE);
    }
    if (fullMR.detailed_merge_status === "ci_must_pass" || (fullMR.pipeline && fullMR.pipeline.status !== 'success')) {
        addTag(mr, TAG.CI_UNSUCCESSFUL);
    }
});
const processMr = (mr) => __awaiter(void 0, void 0, void 0, function* () {
    const elem = document.querySelector(`#merge_request_${mr.id} .issuable-meta`);
    if (!elem) {
        return;
    }
    yield Promise.all([
        processDiscussion(elem, mr),
        processApprovals(elem, mr),
        processCI(mr),
    ]);
    setBadge(mr);
});
const isOld = (mr, ignoreAfterMonth) => {
    if (!ignoreAfterMonth || ignoreAfterMonth < 1) {
        return false;
    }
    const now = new Date();
    const targetDate = new Date(mr.updated_at);
    const monthDiff = Math.abs((now.getFullYear() - targetDate.getFullYear()) * 12 + (now.getMonth() - targetDate.getMonth()));
    return monthDiff > ignoreAfterMonth;
};
const getMainContentContainer = () => {
    return document.querySelector('#content-body') || document.querySelector('main') || document.querySelector('.content-wrapper');
};
const removeSyntheticPage = () => {
    const page = document.getElementById('git-buster-page');
    if (page) {
        page.remove();
    }
    const main = getMainContentContainer();
    if (main) {
        main.style.display = '';
    }
};
const renderSyntheticPage = () => __awaiter(void 0, void 0, void 0, function* () {
    removeSyntheticPage();
    const main = getMainContentContainer();
    if (main) {
        main.style.display = 'none';
    }
    const page = document.createElement('div');
    page.id = 'git-buster-page';
    page.style.minHeight = 'calc(100vh - 60px)';
    page.style.padding = '24px';
    page.style.color = 'var(--gl-text-color, #222)';
    page.style.fontFamily = 'var(--gl-font-family, system-ui, sans-serif)';
    page.innerHTML = `<h1 style="margin-top:0;">Git Buster Overview</h1>
    <p style="max-width:720px">Synthetic page injected by the extension. It summarizes merge requests visible on the current list. Click the sidebar button again to close.</p>
    <div id="git-buster-overview" style="margin-top:20px;font-size:13px;line-height:18px"></div>
    <div style="margin-top:32px;font-size:12px;opacity:.7">Base URL: ${options.baseUrl}</div>`;
    const containerTarget = document.querySelector('.content-wrapper') || document.body;
    containerTarget.appendChild(page);
    try {
        const allMr = yield getAllMr();
        yield Promise.all(allMr.filter(mr => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map(mr => processMr(mr)));
        const overviewElem = page.querySelector('#git-buster-overview');
        const rows = allMr.map(mr => {
            var _a;
            const tags = getTags(mr);
            const badge = getBadge(isMrMine(mr), tags);
            return `<tr>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd"><a href="${mr.web_url}" target="_blank" style="text-decoration:none;color:#1f78d1">${mr.title.replace(/</g, '&lt;')}</a><div style="opacity:.6;font-size:11px">${mr.source_branch} → ${mr.target_branch}</div></td>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${(_a = mr.author) === null || _a === void 0 ? void 0 : _a.name}</td>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${tags.map(t => displayBadge(t, isMrMine(mr))).join('') || displayBadge(TAG.CAN_BE_MERGED, isMrMine(mr))}</td>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;"><span style="background:${colors[badge]};padding:2px 6px;border-radius:4px;border:1px solid #000;">${badge}</span></td>
            </tr>`;
        }).join('');
        overviewElem.innerHTML = `<table style="border-collapse:collapse;min-width:680px;width:100%">
            <thead><tr>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Tags</th>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Badge</th>
            </tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
    }
    catch (e) {
        const overviewElem = page.querySelector('#git-buster-overview');
        overviewElem.innerHTML = `<div style="color:#ec5941">Failed to build overview: ${e.message}</div>`;
        console.error('[git-buster] overview error', e);
    }
});
const ensureSidebarButton = () => {
    if (!(options === null || options === void 0 ? void 0 : options.baseUrl) || !document.location.href.startsWith(options.baseUrl)) {
        return;
    }
    if (document.getElementById(EXT_SIDEBAR_BTN_ID)) {
        return;
    }
    const topBarContainer = document.querySelector('.top-bar-container');
    const sidebarContainer = document.querySelector('.super-sidebar-nav') || document.querySelector('.nav-sidebar') || document.querySelector('.sidebar') || document.querySelector('.layout-page .aside');
    let target = null;
    let mode = 'sidebar';
    if (topBarContainer) {
        target = topBarContainer;
        mode = 'topbar';
    }
    else if (sidebarContainer) {
        target = sidebarContainer;
    }
    if (!target) {
        return;
    }
    const item = document.createElement('button');
    item.type = 'button';
    item.id = EXT_SIDEBAR_BTN_ID;
    item.style.cursor = 'pointer';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '6px';
    item.style.padding = mode === 'topbar' ? '4px 12px' : '6px 10px';
    item.style.margin = mode === 'topbar' ? '0 0 0 auto' : '4px 8px';
    item.style.borderRadius = '6px';
    item.style.fontSize = '13px';
    item.style.lineHeight = '18px';
    item.style.fontWeight = '500';
    item.style.background = '#1f78d1';
    item.style.color = '#fff';
    item.style.border = '1px solid rgba(255,255,255,0.18)';
    item.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.15)';
    item.style.userSelect = 'none';
    item.style.whiteSpace = 'nowrap';
    item.title = 'Toggle Git Buster Overview';
    item.innerHTML = `<span>Git Buster</span>`;
    const applyStateColors = () => { item.style.background = syntheticPageVisible ? '#094d8b' : '#1f78d1'; };
    item.addEventListener('mouseenter', () => { item.style.filter = 'brightness(1.1)'; });
    item.addEventListener('mouseleave', () => { item.style.filter = 'none'; });
    item.addEventListener('click', e => {
        e.preventDefault();
        syntheticPageVisible = !syntheticPageVisible;
        if (syntheticPageVisible) {
            renderSyntheticPage();
        }
        else {
            removeSyntheticPage();
        }
        applyStateColors();
    });
    if (mode === 'topbar') {
        const parentIsFlex = getComputedStyle(target).display.includes('flex');
        if (parentIsFlex) {
            item.style.marginLeft = 'auto';
            target.appendChild(item);
        }
        else {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.marginLeft = 'auto';
            wrapper.appendChild(item);
            target.appendChild(wrapper);
        }
    }
    else {
        const insertBefore = Array.from(target.children).find(ch => { var _a; return (_a = ch.textContent) === null || _a === void 0 ? void 0 : _a.match(/help|feedback/i); });
        if (insertBefore) {
            target.insertBefore(item, insertBefore);
        }
        else {
            target.appendChild(item);
        }
    }
    applyStateColors();
};
const startSidebarObserver = () => {
    if (sidebarObserverStarted) {
        return;
    }
    sidebarObserverStarted = true;
    const observer = new MutationObserver(() => {
        if (!document.getElementById(EXT_SIDEBAR_BTN_ID)) {
            ensureSidebarButton();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
};
// Adjust init: remove loadPersistedVisibility/attachGlobalListeners
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    options = yield loadOptions();
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
        return;
    }
    ensureSidebarButton();
    startSidebarObserver();
    if (!syntheticPageVisible) {
        const allMr = yield getAllMr();
        yield Promise.all(allMr.filter(mr => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map(mr => processMr(mr)));
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield init();
}))();
