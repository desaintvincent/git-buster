const EXTENSION_NAME = 'git-buster'

// Reusable notification helper
const notif = (str, type = 'success') => {
  const savedContainer = document.querySelector('#notif');
  if (!savedContainer) return;
  savedContainer.innerHTML = `<div role="alert" class="alert alert-${type}">${str}</div>`;
  setTimeout(() => { savedContainer.innerHTML = ''; }, 3000);
}

const browserAPI = (typeof browser !== 'undefined' && browser.storage) ? browser :
  (typeof chrome !== 'undefined' && chrome.storage) ? chrome : null;

const loadOptions = async () => {
  if (!browserAPI?.storage?.sync) {
    console.warn('[git-buster] No storage API available');
    return {};
  }
  try {
    const options = await browserAPI.storage.sync.get([EXTENSION_NAME]);
    return options[EXTENSION_NAME] ?? {};
  } catch (e) {
    console.error('[git-buster] Failed to load options', e);
    return {};
  }
}

// Keep list in sync with index.ts parsing expectations
const AllOptions = [
  'enable',
  'baseUrl',
  'username',
  'projects',
  'teams',
  'facultativeApprovers',
  'requiredApprovals'
]

const getValueFromType = (elem) => {
  if (!elem) return undefined;
  switch (elem.type) {
    case 'checkbox': return !!elem.checked;
    case 'number': return parseInt(elem.value || '0', 10);
    default: return elem.value;
  }
}

const saveOptions = async () => {
  const options = AllOptions.reduce((acc, key) => {
    const el = document.getElementById(key);
    return { ...acc, [key]: getValueFromType(el) };
  }, {});

  if (!browserAPI?.storage?.sync) {
    notif('Error: storage unavailable', 'error');
    return;
  }
  try {
    await browserAPI.storage.sync.set({ [EXTENSION_NAME]: options });
    notif('Saved');
  } catch (e) {
    notif('Save failed', 'error');
  }
}

const applyOptions = (options) => {
  AllOptions.forEach(key => {
    const el = document.getElementById(key);
    if (!el) return;
    if (el.type === 'checkbox') {
      el.checked = !!options[key];
    } else if (el.type === 'number') {
      el.value = options[key] != null ? options[key] : '';
    } else {
      el.value = options[key] != null ? options[key] : '';
    }
  });
}

const listenElems = () => {
  AllOptions.forEach(key => {
    const el = document.getElementById(key);
    if (!el) return;
    el.addEventListener('change', () => saveOptions());
    // For textareas, also autosave on input after debounce
    if (el.tagName === 'TEXTAREA') {
      let t = null;
      el.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(saveOptions, 600);
      })
    }
  })
}

const formatHint = () => {
  const el = document.getElementById('projects-hint');
  if (el) {
    el.innerHTML = `Groups with shared requirements<pre>[\n  {\n    \"name\": \"Core\",\n    \"projects\": [\"group/frontend\", \"group/backend\"],\n    \"requirements\": [\n      {\n        \"team\": \"Core Team\",\n        \"approvalsRequired\": 1,\n        \"reviewersRequired\": 1\n      }\n    ]\n  }\n]</pre>`;
  }
  const teamsEl = document.getElementById('teams-hint');
  if (teamsEl) {
    teamsEl.innerHTML = `Team membership definitions<pre>[\n  {\n    \"name\": \"Core Team\",\n    \"members\": [\"alice\", \"bob\"]\n  }\n]</pre>`;
  }
}

const init = async () => {
  formatHint();
  const options = await loadOptions();
  applyOptions(options);
  listenElems();
  document.getElementById('button-reload')?.addEventListener('click', e => {
    e.preventDefault();
    // Inform all tabs to reload content script (if background live reload present)
    try {
      const runtimeAPI = (typeof browser !== 'undefined' && browser.runtime) ? browser.runtime : (typeof chrome !== 'undefined' ? chrome.runtime : null);
      runtimeAPI?.sendMessage?.({ type: 'GB_FORCE_RELOAD' });
    } catch {}
    notif('Reload signal sent');
  })
}

init();
