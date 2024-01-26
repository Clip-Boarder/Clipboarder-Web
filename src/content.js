console.log('Test Content');
window.addEventListener('keydown', function (event) {
	if (
		(event.ctrlKey || event.metaKey) &&
		(event.key === 'C' || event.key === 'c')
	) {
		console.log('Ctrl + C was pressed');

		// Send message to background.js if needed
		chrome.runtime.sendMessage({ ctrlCPressed: true });
	}
});
