/// <reference types="chrome" />
// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

type Options = {
    enable?: boolean;
    username?: string;
    baseUrl?: string;
    skipDrafts?: boolean;
    requiredApprovals?: number;
    facultativeApprovers: string[];
    ignoreAfterMonth?: number;
}

let options: Options

type User = {
    "id": number,
    "username": string,
    "name": string,
    "state": string,
    "avatar_url": string,
    "web_url": string
}

type MR = {
    "id": number,
    "iid": number,
    "project_id": number,
    "title": string,
    "description": string,
    "state": string,
    "target_branch": string,
    "source_branch": string,
    "user_notes_count": number,
    "upvotes": number,
    "downvotes": number,
    "author": User,
    "assignees": User[],
    "assignee": User,
    "reviewers": User[],
    "source_project_id": number,
    "target_project_id": number,
    "labels": [],
    "draft": boolean,
    "work_in_progress": boolean,
    "milestone": null,
    "merge_when_pipeline_succeeds": boolean,
    "merge_status": "can_be_merged",
    "detailed_merge_status": "draft_status",
    "sha": string,
    "merge_commit_sha": null,
    "squash_commit_sha": null,
    "discussion_locked": null,
    "should_remove_source_branch": null,
    "force_remove_source_branch": boolean,
    "web_url": string,
    "time_stats": {
        "time_estimate": 0,
        "total_time_spent": 0,
        "human_time_estimate": null,
        "human_total_time_spent": null
    },
    "squash": boolean,
    "task_completion_status": {
        "count": number,
        "completed_count": number
    },
    "has_conflicts": boolean,
    "blocking_discussions_resolved": boolean,
    "updated_at": string
}

type Approval = {
    "user_has_approved": boolean,
    "user_can_approve": boolean,
    "approved": boolean,
    "approved_by": Array<{
        user: User
    }>
}

enum BADGE {
    ACTIONS = 'actions',
    WAIT = 'wait',
    DONE = 'done',
    NEUTRAL = 'neutral'
}

enum TAG {
    NOT_APPROVED_BY_ME = 'not_approved_by_me',
    MISSING_APPROVALS = 'missing_approvals',
    DISCUSSIONS_NOT_RESOLVED = 'discussions_not_resolved',
    CI_UNSUCCESSFUL = 'ci_unsuccessful',
    NEED_REBASE = 'need_rebase',
    CAN_BE_MERGED = 'can_be_merged'
}

// /!\ is in order
const tagToBadgeForMe: Record<TAG, BADGE> = {
    [TAG.DISCUSSIONS_NOT_RESOLVED]: BADGE.ACTIONS,
    [TAG.CI_UNSUCCESSFUL]: BADGE.ACTIONS,
    [TAG.NEED_REBASE]: BADGE.ACTIONS,
    [TAG.MISSING_APPROVALS]: BADGE.WAIT,
    [TAG.NOT_APPROVED_BY_ME]: BADGE.NEUTRAL,
    [TAG.CAN_BE_MERGED]: BADGE.DONE,
}

// /!\ is in order
const tagToBadgeForOthers: Record<TAG, BADGE> = {
    [TAG.CI_UNSUCCESSFUL]: BADGE.WAIT,
    [TAG.DISCUSSIONS_NOT_RESOLVED]: BADGE.WAIT,
    [TAG.NOT_APPROVED_BY_ME]: BADGE.ACTIONS,
    [TAG.MISSING_APPROVALS]: BADGE.WAIT,
    [TAG.NEED_REBASE]: BADGE.WAIT,
    [TAG.CAN_BE_MERGED]: BADGE.DONE,
}

const tagsByMr: Record<string, TAG[]> = {}

const addTag = (mr: MR, tag: TAG): void => {
    if (!(mr.id in tagsByMr)) {
        tagsByMr[mr.id] = []
    }

    tagsByMr[mr.id].push(tag)
}

const getTags = (mr: MR): TAG[] => {
    return tagsByMr[mr.id] ?? []
}

const colors = {
    [BADGE.ACTIONS]: '#ec5941',
    [BADGE.WAIT]: '#c17d10',
    [BADGE.DONE]: '#2da160',
    [BADGE.NEUTRAL]: 'white'
};

const EXTENSION_NAME = 'git-buster'
const EXT_PAGE_ID = 'git-buster-page'
const EXT_SIDEBAR_BTN_ID = 'git-buster-sidebar-btn'
const URL_ANCHOR = 'git-buster'
let syntheticPageVisible = false
let sidebarObserverStarted = false

const loadOptions = async (): Promise<Options> => {
    // @ts-ignore
    const options = await chrome.storage.sync.get([EXTENSION_NAME])

    const scoppedOptions = options[EXTENSION_NAME] ?? {}

    return {
        ...scoppedOptions,
        facultativeApprovers: (scoppedOptions.facultativeApprovers ?? '').split(',').filter(Boolean),
    }

}

const getBadge = (isMine: boolean, tags: TAG[]): BADGE => {
    if (!tags.length) {
        return BADGE.DONE
    }

    const mapping = isMine ? tagToBadgeForMe : tagToBadgeForOthers

    for (const [tag, badge] of Object.entries(mapping)) {
        if (tags.includes(tag as TAG)) {
            return badge
        }
    }
    return BADGE.NEUTRAL
}

const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const displayBadge = (tag: TAG, isMine: boolean): string => {
    const badge = getBadge(isMine, [tag])
    const classMap: Record<BADGE, string> = {
        [BADGE.ACTIONS]: 'gb-tag-actions',
        [BADGE.WAIT]: 'gb-tag-wait',
        [BADGE.DONE]: 'gb-tag-done',
        [BADGE.NEUTRAL]: 'gb-tag-neutral'
    }
    return `<span class="gb-tag ${classMap[badge]}">${capitalizeFirstLetter(tag).replace(/_/g, ' ')}</span>`
}

const setBadge = (mr: MR) => {
    const issueElem = document.getElementById(`merge_request_${mr.id}`);
    if (!issueElem) {
        console.error('could not find elem', {mr})
        return;
    }

    const isMine = isMrMine(mr)
    const tags = getTags(mr)
    const badge = getBadge(isMine, tags)
    const badgeColor = colors[badge]

    // @ts-ignore
    issueElem.style.borderLeft = `5px solid ${badgeColor}`;
    // @ts-ignore
    issueElem.style.paddingLeft = '10px';

    const issueInfoElem = issueElem.querySelector('.issuable-info')
    if (!issueInfoElem) {
        console.error('could not find issuable-info', {mr})
        return
    }

    if (badge === BADGE.DONE) {
        issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div>${displayBadge(TAG.CAN_BE_MERGED, isMine)}</div>
    </div>`

        return
    }

    issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div class="has-tooltip" title="is Mine: ${isMrMine(mr) ? 'true' : 'false'}" style="display: flex; gap: 5px">${tags.map(tag => displayBadge(tag, isMine)).join('')}</div>
    </div>`
}

const myFetch = async <T = any>(url: string): Promise<T> => {
    return fetch(`${options.baseUrl}/api/v4${url}`).then(res => res.json() as T)
}

const isMrMine = (mr: MR) => {
    return mr.assignee?.username === options.username
}

const getMrOfProject = async  (projectName: string, mrIids: string[]): Promise<MR[]> => {
    const project = (await myFetch(`/projects?search=${projectName}`)).shift()


    const params = mrIids.map(iid => `iids[]=${iid}`).join('&')
    return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`)
}

const getAllMr = async (): Promise<MR[]> => {
    const mergeRequests = document.querySelectorAll('li.merge-request .merge-request-title-text a');
    const mrByProject = new Map()
    for (let i = 0 ; i < mergeRequests.length ; i++) {
        const href = mergeRequests[i].getAttribute('href')
        if (!href) { continue }
        const [project, , , mrIid] = href.split('/').splice(-4)

        const iidList = mrByProject.get(project) ?? [];
        iidList.push(mrIid);
        mrByProject.set(project, iidList);
    }


    const mrsByProject = await Promise.all(
        Array.from(mrByProject)
            .map(([projectName, mrIIds]) => getMrOfProject(projectName, mrIIds))
    );

    return mrsByProject.flat();
}

const processDiscussion = async (elem: Element,mr: MR): Promise<void> => {
    const discussions = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/discussions?per_page=100`)
    const humanDiscussions = discussions.filter((d: Record<string, unknown>) => !d.individual_note)

    if (!humanDiscussions.length) {
        elem.innerHTML += `<div class="discussion">No discussion</div>`
        return
    }
    const resolved = humanDiscussions.filter((discussion: any) => !!discussion.notes[0].resolved)
    const allResolved = resolved.length >= humanDiscussions.length
    if (!allResolved) {
        addTag(mr, TAG.DISCUSSIONS_NOT_RESOLVED)
    }
    const color = allResolved ? colors[BADGE.DONE] : (isMrMine(mr) ? colors[BADGE.ACTIONS] : colors[BADGE.WAIT])
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Discussions ${resolved.length}/${humanDiscussions.length}</div>`
}

const processApprovals = async (elem: Element, mr: MR) => {
    const approval = await myFetch<Approval>(`/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`)

    if (!approval.approved) {
        const color = ((isMrMine(mr)) ? colors[BADGE.WAIT] : colors[BADGE.ACTIONS])
        if (!isMrMine(mr)) {
            addTag(mr, TAG.NOT_APPROVED_BY_ME)
        }
        addTag(mr, TAG.MISSING_APPROVALS)
        elem.innerHTML += `<div class="approval" style="color: ${color}">No approval</div>`
        return
    }

    const needed = options.requiredApprovals ?? 3

    const requiredResolvers = approval.approved_by.filter(u => !options.facultativeApprovers.includes(u.user.username))
    const allResolved = requiredResolvers.length >= needed
    const approvedByMe = !!approval.approved_by.find(u => u.user.username === options.username)

    if (!allResolved) {

        if (!approvedByMe && !isMrMine(mr)) {
            addTag(mr, TAG.NOT_APPROVED_BY_ME)
        }
        addTag(mr, TAG.MISSING_APPROVALS)
    }


    const color = allResolved ? colors[BADGE.DONE] : ((isMrMine(mr) || approvedByMe) ? colors[BADGE.WAIT] : colors[BADGE.ACTIONS])

    const allAvatars = approval.approved_by.map(u => `<span class="author-link has-tooltip" title="Approved by ${u.user.name}" data-container="body" data-qa-selector="assignee_link" data-original-title="Approved by ${u.user.name}" aria-describedby="gl-tooltip5">
<img width="16" class="avatar avatar-inline s16 js-lazy-loaded" alt="" src="${u.user.avatar_url}" loading="lazy" data-qa_selector="js_lazy_loaded_content">
</span>`).join('')

    elem.innerHTML += `<div class="discussion" style="color: ${color}">Approvals ${approval.approved_by.length}/${needed} (${allAvatars})</div>`
}

const processCI = async (mr: MR): Promise<void> => {
    const fullMR = await myFetch<any>(`/projects/${mr.project_id}/merge_requests/${mr.iid}?include_diverged_commits_count=true`)

    if (fullMR.diverged_commits_count > 0) {
        addTag(mr, TAG.NEED_REBASE)
    }

    if (fullMR.detailed_merge_status === "ci_must_pass" || (fullMR.pipeline && fullMR.pipeline.status !== 'success')) {
        addTag(mr, TAG.CI_UNSUCCESSFUL)
    }
}


const processMr = async (mr: MR): Promise<void> => {

    const elem = document.querySelector(`#merge_request_${mr.id} .issuable-meta`)
    if (!elem) {
        return
    }
    await Promise.all([
        processDiscussion(elem, mr),
        processApprovals(elem, mr),
        processCI(mr),
    ])
    setBadge(mr)
}

const isOld = (mr: MR, ignoreAfterMonth?: number): boolean => {
    if (!ignoreAfterMonth || ignoreAfterMonth < 1) {
        return false
    }

    const now = new Date();
    const targetDate = new Date(mr.updated_at)

    const monthDiff = Math.abs((now.getFullYear() - targetDate.getFullYear()) * 12 + (now.getMonth() - targetDate.getMonth()));

    return monthDiff > ignoreAfterMonth
}

const getMainContentContainer = (): HTMLElement | null => {
    return document.querySelector('#content-body') as HTMLElement || document.querySelector('main') as HTMLElement || document.querySelector('.content-wrapper') as HTMLElement
}

const removeSyntheticPage = () => {
    const page = document.getElementById('git-buster-page')
    if (page) { page.remove() }
    const main = getMainContentContainer()
    if (main) { main.style.display = '' }
}

const renderSyntheticPage = async () => {
    removeSyntheticPage()
    const main = getMainContentContainer()
    if (main) { main.style.display = 'none' }

    const page = document.createElement('div')
    page.id = 'git-buster-page'
    page.style.minHeight = 'calc(100vh - 60px)'
    page.style.padding = '24px'
    page.style.color = 'var(--gl-text-color, #222)'
    page.style.fontFamily = 'var(--gl-font-family, system-ui, sans-serif)'
    page.innerHTML = `<h1 style="margin-top:0;">Git Buster Overview</h1>
    <p style="max-width:720px">Synthetic page injected by the extension. It summarizes merge requests visible on the current list. Click the sidebar button again to close.</p>
    <div id="git-buster-overview" style="margin-top:20px;font-size:13px;line-height:18px"></div>
    <div style="margin-top:32px;font-size:12px;opacity:.7">Base URL: ${options.baseUrl}</div>`

    const containerTarget = document.querySelector('.content-wrapper') || document.body
    containerTarget.appendChild(page)

    try {
        const allMr = await getAllMr()
        await Promise.all(allMr.filter(mr => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map(mr => processMr(mr)))
        const overviewElem = page.querySelector('#git-buster-overview') as HTMLElement
        const rows = allMr.map(mr => {
            const tags = getTags(mr)
            const badge = getBadge(isMrMine(mr), tags)
            return `<tr>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd"><a href="${mr.web_url}" target="_blank" style="text-decoration:none;color:#1f78d1">${mr.title.replace(/</g,'&lt;')}</a><div style="opacity:.6;font-size:11px">${mr.source_branch} → ${mr.target_branch}</div></td>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${mr.author?.name}</td>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${tags.map(t => displayBadge(t, isMrMine(mr))).join('') || displayBadge(TAG.CAN_BE_MERGED, isMrMine(mr))}</td>
                <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;"><span style="background:${colors[badge]};padding:2px 6px;border-radius:4px;border:1px solid #000;">${badge}</span></td>
            </tr>`
        }).join('')
        overviewElem.innerHTML = `<table style="border-collapse:collapse;min-width:680px;width:100%">
            <thead><tr>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Tags</th>
                <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Badge</th>
            </tr></thead>
            <tbody>${rows}</tbody>
        </table>`
    } catch (e) {
        const overviewElem = page.querySelector('#git-buster-overview') as HTMLElement
        overviewElem.innerHTML = `<div style="color:#ec5941">Failed to build overview: ${(e as Error).message}</div>`
        console.error('[git-buster] overview error', e)
    }
}

// Helper to update button color based on visibility
const updateSidebarButtonState = () => {
    const btn = document.getElementById(EXT_SIDEBAR_BTN_ID)
    if (btn) {
        // @ts-ignore
        btn.style.background = syntheticPageVisible ? '#094d8b' : '#1f78d1'
        btn.setAttribute('aria-expanded', syntheticPageVisible ? 'true' : 'false')
    }
}

// Update URL hash to reflect current visibility
const updateUrlForVisibility = () => {
    const currentHash = window.location.hash.replace('#','')
    if (syntheticPageVisible) {
        if (currentHash !== URL_ANCHOR) {
            // Use replaceState to avoid polluting history with toggles
            history.replaceState(null, '', `${location.pathname}${location.search}#${URL_ANCHOR}`)
        }
    } else {
        if (currentHash === URL_ANCHOR) {
            history.replaceState(null, '', `${location.pathname}${location.search}`)
        }
    }
}

const ensureSidebarButton = () => {
    if (!options?.baseUrl || !document.location.href.startsWith(options.baseUrl)) { return }
    if (document.getElementById(EXT_SIDEBAR_BTN_ID)) { return }

    const topBarContainer = document.querySelector('.top-bar-container')
    const sidebarContainer = document.querySelector('.super-sidebar-nav') || document.querySelector('.nav-sidebar') || document.querySelector('.sidebar') || document.querySelector('.layout-page .aside');

    let target: Element | null = null
    let mode: 'topbar' | 'sidebar' = 'sidebar'
    if (topBarContainer) { target = topBarContainer; mode = 'topbar' } else if (sidebarContainer) { target = sidebarContainer }
    if (!target) { return }

    const item = document.createElement('button')
    item.type = 'button'
    item.id = EXT_SIDEBAR_BTN_ID
    item.style.cursor = 'pointer'
    item.style.display = 'flex'
    item.style.alignItems = 'center'
    item.style.gap = '6px'
    item.style.padding = mode === 'topbar' ? '4px 12px' : '6px 10px'
    item.style.margin = mode === 'topbar' ? '0 0 0 auto' : '4px 8px'
    item.style.borderRadius = '6px'
    item.style.fontSize = '13px'
    item.style.lineHeight = '18px'
    item.style.fontWeight = '500'
    item.style.background = '#1f78d1'
    item.style.color = '#fff'
    item.style.border = '1px solid rgba(255,255,255,0.18)'
    item.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.15)'
    item.style.userSelect = 'none'
    item.style.whiteSpace = 'nowrap'
    item.title = 'Toggle Git Buster Overview'
    item.innerHTML = `<span>Git Buster</span>`

    item.addEventListener('mouseenter', () => { item.style.filter = 'brightness(1.1)' })
    item.addEventListener('mouseleave', () => { item.style.filter = 'none' })

    item.addEventListener('click', e => {
        e.preventDefault()
        syntheticPageVisible = !syntheticPageVisible
        if (syntheticPageVisible) { renderSyntheticPage() } else { removeSyntheticPage() }
        updateUrlForVisibility()
        updateSidebarButtonState()
    })

    if (mode === 'topbar') {
        const parentIsFlex = getComputedStyle(target).display.includes('flex')
        if (parentIsFlex) {
            item.style.marginLeft = 'auto'
            target.appendChild(item)
        } else {
            const wrapper = document.createElement('div')
            wrapper.style.display = 'flex'
            wrapper.style.marginLeft = 'auto'
            wrapper.appendChild(item)
            target.appendChild(wrapper)
        }
    } else {
        const insertBefore = Array.from(target.children).find(ch => ch.textContent?.match(/help|feedback/i))
        if (insertBefore) { target.insertBefore(item, insertBefore) } else { target.appendChild(item) }
    }
    updateSidebarButtonState()

    // Auto-open if hash already set (handles SPA navigations where init() not re-run)
    if (!syntheticPageVisible && window.location.hash.replace('#','') === URL_ANCHOR) {
        syntheticPageVisible = true
        renderSyntheticPage().then(() => updateSidebarButtonState())
    }
}

const startSidebarObserver = () => {
    if (sidebarObserverStarted) { return }
    sidebarObserverStarted = true
    const observer = new MutationObserver(() => {
        if (!document.getElementById(EXT_SIDEBAR_BTN_ID)) {
            ensureSidebarButton()
            updateSidebarButtonState()
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
}

// Adjust init: remove loadPersistedVisibility/attachGlobalListeners
const init = async () => {
    options = await loadOptions();
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
        return
    }

    // Determine initial visibility from hash
    if (window.location.hash.replace('#','') === URL_ANCHOR) {
        syntheticPageVisible = true
    }

    ensureSidebarButton()
    startSidebarObserver()

    if (syntheticPageVisible) {
        await renderSyntheticPage()
        updateSidebarButtonState()
    } else {
        const allMr = await getAllMr()
        await Promise.all(allMr.filter(mr => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map(mr => processMr(mr)))
    }

    // Listen to hash changes (user navigation or manual edit)
    window.addEventListener('hashchange', () => {
        const shouldBeVisible = window.location.hash.replace('#','') === URL_ANCHOR
        if (shouldBeVisible !== syntheticPageVisible) {
            syntheticPageVisible = shouldBeVisible
            if (syntheticPageVisible) { renderSyntheticPage() } else { removeSyntheticPage() }
            updateSidebarButtonState()
        }
    })

    // Keyboard shortcut (Ctrl+Q) to toggle page visibility
    const isEditableTarget = (el: EventTarget | null): boolean => {
        if (!(el instanceof HTMLElement)) return false
        const tag = el.tagName.toLowerCase()
        return tag === 'input' || tag === 'textarea' || el.isContentEditable
    }

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'q') {
            if (isEditableTarget(e.target)) { return }
            e.preventDefault()
            syntheticPageVisible = !syntheticPageVisible
            if (syntheticPageVisible) { renderSyntheticPage() } else { removeSyntheticPage() }
            updateUrlForVisibility()
            updateSidebarButtonState()
        }
    })
}

(async () => {
    await init()
})()
