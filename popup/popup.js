document.querySelector("#button-reload").onclick = () => {
    chrome.runtime.reload();
    location.reload();
};
