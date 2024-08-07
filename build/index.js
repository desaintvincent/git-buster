"use strict";
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
const loadOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const options = yield chrome.storage.sync.get([EXTENSION_NAME]);
    const scoppedOptions = options[EXTENSION_NAME];
    return Object.assign(Object.assign({}, scoppedOptions), { facultativeApprovers: scoppedOptions.facultativeApprovers.split(',') });
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
    const badgeColor = colors[badge];
    return `<span style="border: 1px solid black; padding: 0 8px; border-radius: 50px; background-color: ${badgeColor}; color: black">${capitalizeFirstLetter(tag).replace(/_/g, ' ')}</span>`;
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
    var _a;
    const mergeRequests = document.querySelectorAll('li.merge-request .merge-request-title-text a');
    const mrByProject = new Map();
    for (let i = 0; i < mergeRequests.length; i++) {
        const href = mergeRequests[i].getAttribute('href');
        if (!href) {
            continue;
        }
        const [project, , , mrIid] = href.split('/').splice(-4);
        const iidList = (_a = mrByProject.get(project)) !== null && _a !== void 0 ? _a : [];
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
    var _b;
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
    const needed = (_b = options.requiredApprovals) !== null && _b !== void 0 ? _b : 3;
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
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    options = yield loadOptions();
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
        return;
    }
    const allMr = yield getAllMr();
    yield Promise.all(allMr.filter(mr => !options.skipDrafts || !mr.draft).map(mr => processMr(mr)));
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield init();
}))();
