const EXTENSION_NAME = 'git-buster'

// Git buster popup stub: all configuration moved to settings page.
(function() {
  const btn = document.getElementById('open-settings');
  if (!btn) return;
  btn.addEventListener('click', () => {
    try {
      if (chrome?.runtime?.openOptionsPage) { chrome.runtime.openOptionsPage(); return; }
      if (browser?.runtime?.openOptionsPage) { browser.runtime.openOptionsPage(); return; }
    } catch {}
    const url = chrome?.runtime?.getURL('settings/settings.html') || browser?.runtime?.getURL('settings/settings.html');
    if (url) window.open(url, '_blank');
  });
})();

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
