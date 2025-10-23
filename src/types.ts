/// <reference types="chrome" />
// Shared domain types and utilities for git-buster

export type ProjectGroup = { name: string; projects: string[] }

export type Options = {
    enable?: boolean;
    username?: string;
    baseUrl?: string;
    projects?: ProjectGroup[]; // Full PROJECTS variable attached to plugin options
}

export type User = {
    id: number;
    username: string;
    name: string;
    state: string;
    avatar_url: string;
    web_url: string;
}

export type Pipeline = {
    id: number;
    status: string; // success, failed, running, pending, canceled, skipped, etc.
    web_url?: string;
}

export type MR = {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    target_branch: string;
    source_branch: string;
    user_notes_count: number;
    upvotes: number;
    downvotes: number;
    author: User;
    assignees: User[];
    assignee: User;
    reviewers: User[];
    source_project_id: number;
    target_project_id: number;
    labels: [];
    draft: boolean;
    work_in_progress: boolean;
    milestone: null;
    merge_when_pipeline_succeeds: boolean;
    merge_status: "can_be_merged";
    detailed_merge_status: string; // was "draft_status" but can vary
    sha: string;
    merge_commit_sha: null;
    squash_commit_sha: null;
    discussion_locked: null;
    should_remove_source_branch: null;
    force_remove_source_branch: boolean;
    web_url: string;
    time_stats: {
        time_estimate: number;
        total_time_spent: number;
        human_time_estimate: null;
        human_total_time_spent: null;
    };
    squash: boolean;
    task_completion_status: {
        count: number;
        completed_count: number;
    };
    has_conflicts: boolean;
    blocking_discussions_resolved: boolean;
    updated_at: string;
    head_pipeline?: Pipeline | null; // optional pipeline info
}

export type Approval = {
    user_has_approved: boolean;
    user_can_approve: boolean;
    approved: boolean;
    approved_by: Array<{ user: User }>;
}

export enum BADGE {
    ACTIONS = 'actions',
    WAIT = 'wait',
    DONE = 'done',
    NEUTRAL = 'neutral'
}

export enum TAG {
    NOT_APPROVED_BY_ME = 'not_approved_by_me',
    MISSING_APPROVALS = 'missing_approvals',
    DISCUSSIONS_NOT_RESOLVED = 'discussions_not_resolved',
    CI_UNSUCCESSFUL = 'ci_unsuccessful',
    NEED_REBASE = 'need_rebase',
    CAN_BE_MERGED = 'can_be_merged'
}

// In-order mappings determine precedence
export const tagToBadgeForMe: Record<TAG, BADGE> = {
    [TAG.DISCUSSIONS_NOT_RESOLVED]: BADGE.ACTIONS,
    [TAG.CI_UNSUCCESSFUL]: BADGE.ACTIONS,
    [TAG.NEED_REBASE]: BADGE.ACTIONS,
    [TAG.MISSING_APPROVALS]: BADGE.WAIT,
    [TAG.NOT_APPROVED_BY_ME]: BADGE.NEUTRAL,
    [TAG.CAN_BE_MERGED]: BADGE.DONE,
}

export const tagToBadgeForOthers: Record<TAG, BADGE> = {
    [TAG.CI_UNSUCCESSFUL]: BADGE.WAIT,
    [TAG.DISCUSSIONS_NOT_RESOLVED]: BADGE.WAIT,
    [TAG.NOT_APPROVED_BY_ME]: BADGE.ACTIONS,
    [TAG.MISSING_APPROVALS]: BADGE.WAIT,
    [TAG.NEED_REBASE]: BADGE.WAIT,
    [TAG.CAN_BE_MERGED]: BADGE.DONE,
}

export const colors: Record<BADGE, string> = {
    [BADGE.ACTIONS]: '#ec5941',
    [BADGE.WAIT]: '#c17d10',
    [BADGE.DONE]: '#2da160',
    [BADGE.NEUTRAL]: 'white'
};

export const getBadge = (isMine: boolean, tags: TAG[]): BADGE => {
    if (!tags.length) { return BADGE.DONE }
    const mapping = isMine ? tagToBadgeForMe : tagToBadgeForOthers;
    for (const [tag, badge] of Object.entries(mapping)) {
        if (tags.includes(tag as TAG)) { return badge as BADGE }
    }
    return BADGE.NEUTRAL
}

export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

export const displayBadge = (tag: TAG, isMine: boolean): string => {
    const badge = getBadge(isMine, [tag])
    const classMap: Record<BADGE, string> = {
        [BADGE.ACTIONS]: 'gb-tag-actions',
        [BADGE.WAIT]: 'gb-tag-wait',
        [BADGE.DONE]: 'gb-tag-done',
        [BADGE.NEUTRAL]: 'gb-tag-neutral'
    }
    return `<span class="gb-tag ${classMap[badge]}">${capitalizeFirstLetter(tag).replace(/_/g, ' ')}</span>`
}

export const isMrMine = (mr: MR, options: Options): boolean => mr.assignee?.username === options.username

// Tags store
const tagsByMr: Record<string, TAG[]> = {}
export const addTag = (mr: MR, tag: TAG): void => {
    if (!(mr.id in tagsByMr)) { tagsByMr[mr.id] = [] }
    tagsByMr[mr.id].push(tag)
}
export const getTags = (mr: MR): TAG[] => tagsByMr[mr.id] ?? []
