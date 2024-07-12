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
    "blocking_discussions_resolved": boolean
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

const loadOptions = async (): Promise<Options> => {
    // @ts-ignore
    const options = await chrome.storage.sync.get([EXTENSION_NAME])

    const scoppedOptions = options[EXTENSION_NAME]

    return {
        ...scoppedOptions,
        facultativeApprovers: scoppedOptions.facultativeApprovers.split(','),

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
    const badgeColor = colors[badge]
    return `<span style="border: 1px solid black; padding: 0 8px; border-radius: 50px; background-color: ${badgeColor}; color: black">${capitalizeFirstLetter(tag).replace(/_/g, ' ')}</span>`
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

const init = async () => {
    options = await loadOptions();
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
        return
    }
    const allMr = await getAllMr()
    await Promise.all(allMr.filter(mr => !options.skipDrafts || !mr.draft).map(mr => processMr(mr)))
}

(async () => {
    await init()
})()
