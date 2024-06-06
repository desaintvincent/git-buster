// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

const apiUrlBase = 'https://git.lab.viaco.fr/api/v4'

async function myFetch (url: string) {
    return fetch(`${apiUrlBase}${url}`).then(res => res.json())
}

async function getMrOfProject (projectName: string, mrIids: string[]) {
    const project = (await myFetch(`/projects?search=${projectName}`)).shift()


    const params = mrIids.map(iid => `iids[]=${iid}`).join('&')
    return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`)
}

async function getAllMr(){
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


async function init() {
    const allMr = await getAllMr()

    console.log('====> allMr', allMr);
}


(async () => {
    await init()
})()
