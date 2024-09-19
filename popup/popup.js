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
    const options = await chrome.storage.sync.get([EXTENSION_NAME])

    return options[EXTENSION_NAME] ?? {}

}

const AllOptions = ['enable', 'skipDrafts', 'baseUrl', 'username', 'requiredApprovals', 'facultativeApprovers', 'ignoreAfterMonth']

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

    await chrome.storage.sync.set({ [EXTENSION_NAME]: options }).then(() => {
        notif('saved')
    });
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
    chrome.runtime.reload();
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
