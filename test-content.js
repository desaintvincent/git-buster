console.log('[git-buster-test] Simple content script loaded!');
console.log('[git-buster-test] Document title:', document.title);
console.log('[git-buster-test] Current URL:', window.location.href);

// Test storage API
try {
    const browserAPI = (typeof browser !== 'undefined' && browser.storage) ? browser : 
                      (typeof chrome !== 'undefined' && chrome.storage) ? chrome : null;
    
    if (browserAPI?.storage?.sync) {
        console.log('[git-buster-test] Storage API available');
    } else {
        console.log('[git-buster-test] Storage API NOT available');
    }
} catch (e) {
    console.error('[git-buster-test] Storage API error:', e);
}