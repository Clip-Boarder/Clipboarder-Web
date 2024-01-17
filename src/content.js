document.addEventListener('copy', (event) => {
	chrome.runtime.sendMessage({ copied: true });
});
