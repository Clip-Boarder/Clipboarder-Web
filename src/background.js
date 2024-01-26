chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.ctrlCPressed) {
		console.log('Ctrl + C was detected in content script');
		// Perform actions in background.js based on this information
	}
});
// chrome.commands.onCommand.addListener(async (command) => {
// 	console.log(`Command: ${command}`);
// 	// chrome.runtime.sendMessage({ copied: true });
// });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// 	console.log(message);
// });
console.log('Test Background');
