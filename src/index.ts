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

enum BADGE {
    ACTIONS = 'actions',
    WAIT = 'wait',
    DONE = 'done',
}

const colors = {
    [BADGE.ACTIONS]: '#ec5941',
    [BADGE.WAIT]: '#c17d10',
    [BADGE.DONE]: '#2da160'
};

const EXTENSION_NAME = 'gitlab-speculum'

const loadOptions = async (): Promise<Options> => {
    // @ts-ignore
    const options = await chrome.storage.sync.get([EXTENSION_NAME])

    return options[EXTENSION_NAME]

}

async function myFetch (url: string) {
    return fetch(`${options.baseUrl}/api/v4${url}`).then(res => res.json())
}

const isMrMine = (mr: MR) => {
    return mr.assignee?.username === options.username
}

async function getMrOfProject (projectName: string, mrIids: string[]): Promise<MR[]> {
    const project = (await myFetch(`/projects?search=${projectName}`)).shift()


    const params = mrIids.map(iid => `iids[]=${iid}`).join('&')
    return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`)
}

async function getAllMr(): Promise<MR[]>{
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

const getDiscussions = async (projectId: number, mrIId: number) => {
    return myFetch(`/projects/${projectId}/merge_requests/${mrIId}/discussions`)
}

const processMr = async (mr: MR): Promise<void> => {
    const discussions = await getDiscussions(mr.project_id, mr.iid)
    const humanDiscussions = discussions.filter((d: Record<string, unknown>) => !d.individual_note)
    const elem = document.querySelector(`#merge_request_${mr.id} .issuable-meta`)
    if (!elem) {
        return
    }
    if (!humanDiscussions.length) {
        elem.innerHTML += `<div class="discussion">No discussion</div>`
        return
    }
    const resolved = humanDiscussions.filter((discussion: any) => !!discussion.notes[0].resolved)
    const allResolved = resolved.length >= humanDiscussions.length
    const color = allResolved ? colors[BADGE.DONE] : (isMrMine(mr) ? colors[BADGE.ACTIONS] : colors[BADGE.WAIT])
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Discussions ${resolved.length}/${humanDiscussions.length}</div>`
}

async function init() {
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
