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
})(BADGE || (BADGE = {}));
const colors = {
    [BADGE.ACTIONS]: '#ec5941',
    [BADGE.WAIT]: '#c17d10',
    [BADGE.DONE]: '#2da160'
};
const EXTENSION_NAME = 'gitlab-speculum';
const loadOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const options = yield chrome.storage.sync.get([EXTENSION_NAME]);
    return options[EXTENSION_NAME];
});
function myFetch(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${options.baseUrl}/api/v4${url}`).then(res => res.json());
    });
}
const isMrMine = (mr) => {
    var _a;
    return ((_a = mr.assignee) === null || _a === void 0 ? void 0 : _a.username) === options.username;
};
function getMrOfProject(projectName, mrIids) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = (yield myFetch(`/projects?search=${projectName}`)).shift();
        const params = mrIids.map(iid => `iids[]=${iid}`).join('&');
        return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`);
    });
}
function getAllMr() {
    return __awaiter(this, void 0, void 0, function* () {
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
}
const getDiscussions = (projectId, mrIId) => __awaiter(void 0, void 0, void 0, function* () {
    return myFetch(`/projects/${projectId}/merge_requests/${mrIId}/discussions`);
});
const processMr = (mr) => __awaiter(void 0, void 0, void 0, function* () {
    const discussions = yield getDiscussions(mr.project_id, mr.iid);
    const humanDiscussions = discussions.filter((d) => !d.individual_note);
    const elem = document.querySelector(`#merge_request_${mr.id} .issuable-meta`);
    if (!elem) {
        return;
    }
    if (!humanDiscussions.length) {
        elem.innerHTML += `<div class="discussion">No discussion</div>`;
        return;
    }
    const resolved = humanDiscussions.filter((discussion) => !!discussion.notes[0].resolved);
    const allResolved = resolved.length >= humanDiscussions.length;
    const color = allResolved ? colors[BADGE.DONE] : (isMrMine(mr) ? colors[BADGE.ACTIONS] : colors[BADGE.WAIT]);
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Discussions ${resolved.length}/${humanDiscussions.length}</div>`;
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        options = yield loadOptions();
        if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
            return;
        }
        const allMr = yield getAllMr();
        yield Promise.all(allMr.filter(mr => !options.skipDrafts || !mr.draft).map(mr => processMr(mr)));
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield init();
}))();
