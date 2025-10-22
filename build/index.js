"use strict";
(() => {
  // src/types.ts
  var tagToBadgeForMe = {
    ["discussions_not_resolved" /* DISCUSSIONS_NOT_RESOLVED */]: "actions" /* ACTIONS */,
    ["ci_unsuccessful" /* CI_UNSUCCESSFUL */]: "actions" /* ACTIONS */,
    ["need_rebase" /* NEED_REBASE */]: "actions" /* ACTIONS */,
    ["missing_approvals" /* MISSING_APPROVALS */]: "wait" /* WAIT */,
    ["not_approved_by_me" /* NOT_APPROVED_BY_ME */]: "neutral" /* NEUTRAL */,
    ["can_be_merged" /* CAN_BE_MERGED */]: "done" /* DONE */
  };
  var tagToBadgeForOthers = {
    ["ci_unsuccessful" /* CI_UNSUCCESSFUL */]: "wait" /* WAIT */,
    ["discussions_not_resolved" /* DISCUSSIONS_NOT_RESOLVED */]: "wait" /* WAIT */,
    ["not_approved_by_me" /* NOT_APPROVED_BY_ME */]: "actions" /* ACTIONS */,
    ["missing_approvals" /* MISSING_APPROVALS */]: "wait" /* WAIT */,
    ["need_rebase" /* NEED_REBASE */]: "wait" /* WAIT */,
    ["can_be_merged" /* CAN_BE_MERGED */]: "done" /* DONE */
  };
  var colors = {
    ["actions" /* ACTIONS */]: "#ec5941",
    ["wait" /* WAIT */]: "#c17d10",
    ["done" /* DONE */]: "#2da160",
    ["neutral" /* NEUTRAL */]: "white"
  };
  var getBadge = (isMine, tags) => {
    if (!tags.length) {
      return "done" /* DONE */;
    }
    const mapping = isMine ? tagToBadgeForMe : tagToBadgeForOthers;
    for (const [tag, badge] of Object.entries(mapping)) {
      if (tags.includes(tag)) {
        return badge;
      }
    }
    return "neutral" /* NEUTRAL */;
  };
  var capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  var displayBadge = (tag, isMine) => {
    const badge = getBadge(isMine, [tag]);
    const classMap = {
      ["actions" /* ACTIONS */]: "gb-tag-actions",
      ["wait" /* WAIT */]: "gb-tag-wait",
      ["done" /* DONE */]: "gb-tag-done",
      ["neutral" /* NEUTRAL */]: "gb-tag-neutral"
    };
    return `<span class="gb-tag ${classMap[badge]}">${capitalizeFirstLetter(tag).replace(/_/g, " ")}</span>`;
  };
  var isMrMine = (mr, options2) => mr.assignee?.username === options2.username;
  var tagsByMr = {};
  var addTag = (mr, tag) => {
    if (!(mr.id in tagsByMr)) {
      tagsByMr[mr.id] = [];
    }
    tagsByMr[mr.id].push(tag);
  };
  var getTags = (mr) => tagsByMr[mr.id] ?? [];

  // src/overview.ts
  var buildOverviewContent = (allMr, options2) => {
    console.log("====> allMr", allMr);
    const rows = allMr.map((mr) => {
      const tags = getTags(mr);
      const badge = getBadge(isMrMine(mr, options2), tags);
      return `<tr>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd"><a href="${mr.web_url}" target="_blank" style="text-decoration:none;color:#1f78d1">${mr.title.replace(/</g, "&lt;")}</a><div style="opacity:.6;font-size:11px">${mr.source_branch} \u2192 ${mr.target_branch}</div></td>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${mr.author?.name}</td>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd">${tags.map((t) => displayBadge(t, isMrMine(mr, options2))).join("") || displayBadge("can_be_merged" /* CAN_BE_MERGED */, isMrMine(mr, options2))}</td>
            <td style="vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;"><span style="background:${colors[badge]};padding:2px 6px;border-radius:4px;border:1px solid #000;">${badge}</span></td>
        </tr>`;
    }).join("");
    return `<table style="border-collapse:collapse;min-width:680px;width:100%">
        <thead><tr>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Title</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Author</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Tags</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #444">Badge</th>
        </tr></thead>
        <tbody>${rows}</tbody>
    </table>`;
  };

  // src/index.ts
  var options;
  var EXTENSION_NAME = "git-buster";
  var EXT_PAGE_ID = "git-buster-page";
  var EXT_SIDEBAR_BTN_ID = "git-buster-sidebar-btn";
  var URL_ANCHOR = "git-buster";
  var syntheticPageVisible = false;
  var sidebarObserverStarted = false;
  var loadOptions = async () => {
    const options2 = await chrome.storage.sync.get([EXTENSION_NAME]);
    const scoppedOptions = options2[EXTENSION_NAME] ?? {};
    return {
      ...scoppedOptions,
      facultativeApprovers: (scoppedOptions.facultativeApprovers ?? "").split(",").filter(Boolean)
    };
  };
  var setBadge = (mr) => {
    const issueElem = document.getElementById(`merge_request_${mr.id}`);
    if (!issueElem) {
      console.error("could not find elem", { mr });
      return;
    }
    const isMine = isMrMine(mr, options);
    const tags = getTags(mr);
    const badge = getBadge(isMine, tags);
    const badgeColor = colors[badge];
    issueElem.style.borderLeft = `5px solid ${badgeColor}`;
    issueElem.style.paddingLeft = "10px";
    const issueInfoElem = issueElem.querySelector(".issuable-info");
    if (!issueInfoElem) {
      console.error("could not find issuable-info", { mr });
      return;
    }
    if (badge === "done" /* DONE */) {
      issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div>${displayBadge("can_be_merged" /* CAN_BE_MERGED */, isMine)}</div>
    </div>`;
      return;
    }
    issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div class="has-tooltip" title="is Mine: ${isMine ? "true" : "false"}" style="display: flex; gap: 5px">${tags.map((tag) => displayBadge(tag, isMine)).join("")}</div>
    </div>`;
  };
  var myFetch = async (url) => {
    return fetch(`${options.baseUrl}/api/v4${url}`).then((res) => res.json());
  };
  var getMrOfProject = async (projectName, mrIids) => {
    const project = (await myFetch(`/projects?search=${projectName}`)).shift();
    const params = mrIids.map((iid) => `iids[]=${iid}`).join("&");
    return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`);
  };
  var getAllMr = async () => {
    const mergeRequests = document.querySelectorAll("li.merge-request .merge-request-title-text a");
    const mrByProject = /* @__PURE__ */ new Map();
    for (let i = 0; i < mergeRequests.length; i++) {
      const href = mergeRequests[i].getAttribute("href");
      if (!href) {
        continue;
      }
      const [project, , , mrIid] = href.split("/").splice(-4);
      const iidList = mrByProject.get(project) ?? [];
      iidList.push(mrIid);
      mrByProject.set(project, iidList);
    }
    const mrsByProject = await Promise.all(
      Array.from(mrByProject).map(([projectName, mrIIds]) => getMrOfProject(projectName, mrIIds))
    );
    return mrsByProject.flat();
  };
  var processDiscussion = async (elem, mr) => {
    const discussions = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/discussions?per_page=100`);
    const humanDiscussions = discussions.filter((d) => !d.individual_note);
    if (!humanDiscussions.length) {
      elem.innerHTML += `<div class="discussion">No discussion</div>`;
      return;
    }
    const resolved = humanDiscussions.filter((discussion) => !!discussion.notes[0].resolved);
    const allResolved = resolved.length >= humanDiscussions.length;
    if (!allResolved) {
      addTag(mr, "discussions_not_resolved" /* DISCUSSIONS_NOT_RESOLVED */);
    }
    const color = allResolved ? colors["done" /* DONE */] : isMrMine(mr, options) ? colors["actions" /* ACTIONS */] : colors["wait" /* WAIT */];
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Discussions ${resolved.length}/${humanDiscussions.length}</div>`;
  };
  var processApprovals = async (elem, mr) => {
    const approval = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`);
    if (!approval.approved) {
      const color2 = isMrMine(mr, options) ? colors["wait" /* WAIT */] : colors["actions" /* ACTIONS */];
      if (!isMrMine(mr, options)) {
        addTag(mr, "not_approved_by_me" /* NOT_APPROVED_BY_ME */);
      }
      addTag(mr, "missing_approvals" /* MISSING_APPROVALS */);
      elem.innerHTML += `<div class="approval" style="color: ${color2}">No approval</div>`;
      return;
    }
    const needed = options.requiredApprovals ?? 3;
    const requiredResolvers = approval.approved_by.filter((u) => !options.facultativeApprovers.includes(u.user.username));
    const allResolved = requiredResolvers.length >= needed;
    const approvedByMe = !!approval.approved_by.find((u) => u.user.username === options.username);
    if (!allResolved) {
      if (!approvedByMe && !isMrMine(mr, options)) {
        addTag(mr, "not_approved_by_me" /* NOT_APPROVED_BY_ME */);
      }
      addTag(mr, "missing_approvals" /* MISSING_APPROVALS */);
    }
    const color = allResolved ? colors["done" /* DONE */] : isMrMine(mr, options) || approvedByMe ? colors["wait" /* WAIT */] : colors["actions" /* ACTIONS */];
    const allAvatars = approval.approved_by.map((u) => `<span class="author-link has-tooltip" title="Approved by ${u.user.name}" data-container="body" data-qa-selector="assignee_link" data-original-title="Approved by ${u.user.name}" aria-describedby="gl-tooltip5">
<img width="16" class="avatar avatar-inline s16 js-lazy-loaded" alt="" src="${u.user.avatar_url}" loading="lazy" data-qa_selector="js_lazy_loaded_content">
</span>`).join("");
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Approvals ${approval.approved_by.length}/${needed} (${allAvatars})</div>`;
  };
  var processCI = async (mr) => {
    const fullMR = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}?include_diverged_commits_count=true`);
    if (fullMR.diverged_commits_count > 0) {
      addTag(mr, "need_rebase" /* NEED_REBASE */);
    }
    if (fullMR.detailed_merge_status === "ci_must_pass" || fullMR.pipeline && fullMR.pipeline.status !== "success") {
      addTag(mr, "ci_unsuccessful" /* CI_UNSUCCESSFUL */);
    }
  };
  var processMr = async (mr) => {
    const elem = document.querySelector(`#merge_request_${mr.id} .issuable-meta`);
    if (!elem) {
      return;
    }
    await Promise.all([
      processDiscussion(elem, mr),
      processApprovals(elem, mr),
      processCI(mr)
    ]);
    setBadge(mr);
  };
  var isOld = (mr, ignoreAfterMonth) => {
    if (!ignoreAfterMonth || ignoreAfterMonth < 1) {
      return false;
    }
    const now = /* @__PURE__ */ new Date();
    const targetDate = new Date(mr.updated_at);
    const monthDiff = Math.abs((now.getFullYear() - targetDate.getFullYear()) * 12 + (now.getMonth() - targetDate.getMonth()));
    return monthDiff > ignoreAfterMonth;
  };
  var getMainContentContainer = () => {
    return document.querySelector("#content-body") || document.querySelector("main") || document.querySelector(".content-wrapper");
  };
  var removeSyntheticPage = () => {
    const page = document.getElementById(EXT_PAGE_ID);
    if (page) {
      page.remove();
    }
    const main = getMainContentContainer();
    if (main) {
      main.style.display = "";
    }
  };
  var renderSyntheticPage = async () => {
    removeSyntheticPage();
    const main = getMainContentContainer();
    if (main) {
      main.style.display = "none";
    }
    const page = document.createElement("div");
    page.id = EXT_PAGE_ID;
    page.style.minHeight = "calc(100vh - 60px)";
    page.style.padding = "24px";
    page.style.color = "var(--gl-text-color, #222)";
    page.style.fontFamily = "var(--gl-font-family, system-ui, sans-serif)";
    page.innerHTML = `<h1 style="margin-top:0;">Git Buster Overview</h1>
    <p style="max-width:720px">Synthetic page injected by the extension. It summarizes merge requests visible on the current list.</p>
    <div id="git-buster-overview" style="margin-top:20px;font-size:13px;line-height:18px"></div>
    <div style="margin-top:32px;font-size:12px;opacity:.7">Base URL: ${options.baseUrl}</div>`;
    const containerTarget = document.querySelector(".content-wrapper") || document.body;
    containerTarget.appendChild(page);
    try {
      const allMr = await getAllMr();
      await Promise.all(allMr.filter((mr) => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map((mr) => processMr(mr)));
      const overviewElem = page.querySelector("#git-buster-overview");
      overviewElem.innerHTML = buildOverviewContent(allMr, options);
    } catch (e) {
      const overviewElem = page.querySelector("#git-buster-overview");
      overviewElem.innerHTML = `<div style="color:#ec5941">Failed to build overview: ${e.message}</div>`;
      console.error("[git-buster] overview error", e);
    }
  };
  var updateSidebarButtonState = () => {
    const btn = document.getElementById(EXT_SIDEBAR_BTN_ID);
    if (btn) {
      btn.style.background = syntheticPageVisible ? "#094d8b" : "#1f78d1";
      btn.setAttribute("aria-expanded", syntheticPageVisible ? "true" : "false");
    }
  };
  var updateUrlForVisibility = () => {
    const currentHash = window.location.hash.replace("#", "");
    if (syntheticPageVisible) {
      if (currentHash !== URL_ANCHOR) {
        history.replaceState(null, "", `${location.pathname}${location.search}#${URL_ANCHOR}`);
      }
    } else {
      if (currentHash === URL_ANCHOR) {
        history.replaceState(null, "", `${location.pathname}${location.search}`);
      }
    }
  };
  var ensureSidebarButton = () => {
    if (!options?.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
      return;
    }
    if (document.getElementById(EXT_SIDEBAR_BTN_ID)) {
      return;
    }
    const topBarContainer = document.querySelector(".top-bar-container");
    const sidebarContainer = document.querySelector(".super-sidebar-nav") || document.querySelector(".nav-sidebar") || document.querySelector(".sidebar") || document.querySelector(".layout-page .aside");
    let target = null;
    let mode = "sidebar";
    if (topBarContainer) {
      target = topBarContainer;
      mode = "topbar";
    } else if (sidebarContainer) {
      target = sidebarContainer;
    }
    if (!target) {
      return;
    }
    const item = document.createElement("button");
    item.type = "button";
    item.id = EXT_SIDEBAR_BTN_ID;
    item.style.cursor = "pointer";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "6px";
    item.style.padding = mode === "topbar" ? "4px 12px" : "6px 10px";
    item.style.margin = mode === "topbar" ? "0 0 0 auto" : "4px 8px";
    item.style.borderRadius = "6px";
    item.style.fontSize = "13px";
    item.style.lineHeight = "18px";
    item.style.fontWeight = "500";
    item.style.background = "#1f78d1";
    item.style.color = "#fff";
    item.style.border = "1px solid rgba(255,255,255,0.18)";
    item.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.15)";
    item.style.userSelect = "none";
    item.style.whiteSpace = "nowrap";
    item.title = "Toggle Git Buster Overview";
    item.innerHTML = `<span>Git Buster</span>`;
    item.addEventListener("mouseenter", () => {
      item.style.filter = "brightness(1.1)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.filter = "none";
    });
    item.addEventListener("click", (e) => {
      e.preventDefault();
      syntheticPageVisible = !syntheticPageVisible;
      if (syntheticPageVisible) {
        renderSyntheticPage();
      } else {
        removeSyntheticPage();
      }
      updateUrlForVisibility();
      updateSidebarButtonState();
    });
    if (mode === "topbar") {
      const parentIsFlex = getComputedStyle(target).display.includes("flex");
      if (parentIsFlex) {
        item.style.marginLeft = "auto";
        target.appendChild(item);
      } else {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.marginLeft = "auto";
        wrapper.appendChild(item);
        target.appendChild(wrapper);
      }
    } else {
      const insertBefore = Array.from(target.children).find((ch) => ch.textContent?.match(/help|feedback/i));
      if (insertBefore) {
        target.insertBefore(item, insertBefore);
      } else {
        target.appendChild(item);
      }
    }
    updateSidebarButtonState();
    if (!syntheticPageVisible && window.location.hash.replace("#", "") === URL_ANCHOR) {
      syntheticPageVisible = true;
      renderSyntheticPage().then(() => updateSidebarButtonState());
    }
  };
  var startSidebarObserver = () => {
    if (sidebarObserverStarted) {
      return;
    }
    sidebarObserverStarted = true;
    const observer = new MutationObserver(() => {
      if (!document.getElementById(EXT_SIDEBAR_BTN_ID)) {
        ensureSidebarButton();
        updateSidebarButtonState();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };
  var init = async () => {
    options = await loadOptions();
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
      return;
    }
    if (window.location.hash.replace("#", "") === URL_ANCHOR) {
      syntheticPageVisible = true;
    }
    ensureSidebarButton();
    startSidebarObserver();
    if (syntheticPageVisible) {
      await renderSyntheticPage();
      updateSidebarButtonState();
    } else {
      const allMr = await getAllMr();
      await Promise.all(allMr.filter((mr) => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map((mr) => processMr(mr)));
    }
    window.addEventListener("hashchange", () => {
      const shouldBeVisible = window.location.hash.replace("#", "") === URL_ANCHOR;
      if (shouldBeVisible !== syntheticPageVisible) {
        syntheticPageVisible = shouldBeVisible;
        if (syntheticPageVisible) {
          renderSyntheticPage();
        } else {
          removeSyntheticPage();
        }
        updateSidebarButtonState();
      }
    });
    const isEditableTarget = (el) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || el.isContentEditable;
    };
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "q") {
        if (isEditableTarget(e.target)) {
          return;
        }
        e.preventDefault();
        syntheticPageVisible = !syntheticPageVisible;
        if (syntheticPageVisible) {
          renderSyntheticPage();
        } else {
          removeSyntheticPage();
        }
        updateUrlForVisibility();
        updateSidebarButtonState();
      }
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }
})();
