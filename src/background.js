chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type === 'COPY_EVENT') {
		// Ctrl + C 이벤트 감지
		// 여기서 React 앱으로 메시지를 보낼 수 있습니다.
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { type: 'COPY_DETECTED' });
		});
	}
});
