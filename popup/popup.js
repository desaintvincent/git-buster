const EXTENSION_NAME = 'git-buster'

const notif = (str) => {
    const savedContainer = document.querySelector('#notif');
    savedContainer.innerHTML = `<div role="alert" class="alert alert-success">
  <span>${str}</span>
</div>`;
    setTimeout(() => {
        savedContainer.innerHTML = '';
    }, 2000);
}

const loadOptions = async () => {
    // Cross-browser API detection
    const browserAPI = (typeof browser !== 'undefined' && browser.storage) ? browser : 
                      (typeof chrome !== 'undefined' && chrome.storage) ? chrome : null;
    
    if (!browserAPI?.storage?.sync) {
        console.warn('[git-buster] No storage API available');
        return {};
    }

    try {
        const options = await browserAPI.storage.sync.get([EXTENSION_NAME]);
        return options[EXTENSION_NAME] ?? {};
    } catch (error) {
        console.error('[git-buster] Failed to load options:', error);
        return {};
    }
}

const AllOptions = ['enable', 'baseUrl', 'username', 'projects', 'teamRequirements']

const saveOptions = async () => {
    const getValueFromType = (elem) => {
        switch(elem.type) {
            case 'checkbox': {return !!elem.checked; }
            case 'number': {return parseInt(elem.value); }
            default: {return elem.value; }
        }
    }

    const options = AllOptions.reduce((acc, optionName) => {
        const elem = document.querySelector(`#${optionName}`)
        return {
            ...acc,
            [optionName]: getValueFromType(elem)
        }
    }, {})

    // Cross-browser API detection
    const browserAPI = (typeof browser !== 'undefined' && browser.storage) ? browser : 
                      (typeof chrome !== 'undefined' && chrome.storage) ? chrome : null;
    
    if (!browserAPI?.storage?.sync) {
        console.error('[git-buster] No storage API available');
        notif('Error: Storage not available');
        return;
    }

    try {
        await browserAPI.storage.sync.set({ [EXTENSION_NAME]: options });
        notif('saved');
    } catch (error) {
        console.error('[git-buster] Failed to save options:', error);
        notif('Error saving options');
    }
}

const applyOptions = options => {
    AllOptions.forEach(optionName => {
        const elem = document.querySelector(`#${optionName}`)
        switch(elem.type) {
            case 'checkbox': {elem.checked = options[optionName] ?? false; break }
            case 'number': {elem.value = (options[optionName] ?? 0); break }
            default: {elem.value = options[optionName] ?? ''; break }
        }
    })
}
const listenElems = () => {
    AllOptions.forEach(optionName => {
        const elem = document.querySelector(`#${optionName}`)
        elem.addEventListener('change', e => {
            saveOptions()
        })
    })
}

document.querySelector("#button-reload").onclick = (e) => {
    e.preventDefault()
    // Cross-browser API detection
    const browserAPI = (typeof browser !== 'undefined' && browser.runtime) ? browser : 
                      (typeof chrome !== 'undefined' && chrome.runtime) ? chrome : null;
    
    if (browserAPI?.runtime?.reload) {
        browserAPI.runtime.reload();
    }
    location.reload();
};

const init = async () => {
    const options = await loadOptions()
    applyOptions(options)
    listenElems()
}

(async () => {
    await init();
})();
