console.log('background is running')
// let count = 0
// async function readClipboardText() {
//   try {
//     const text = await navigator.clipboard.readText()
//     // 배지에 숫자 '5'를 표시
//     count++
//     chrome.browserAction.setBadgeText({ text: count.toString() })
//   } catch (err) {
//     console.error('클립보드 접근 권한이 없거나, 다른 오류 발생:', err)
//   }
// }

// setInterval(readClipboardText, 5000)
// background.js// background.js
let lastClipboardContent = '' // 마지막 클립보드 내용을 저장할 변수

function requestClipboardContent() {
  chrome.tabs.query({}, function (tabs) {
    if (tabs.length > 0 && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readClipboard' }, function (response) {
        if (chrome.runtime.lastError) {
          console.error('Error sending message to content script:', chrome.runtime.lastError)
          return
        }
        if (response && response.success) {
          // 새로운 클립보드 내용이 이전 내용과 다를 때만 로그를 출력합니다.
          if (response.text !== lastClipboardContent) {
            console.log('Received clipboard content:', response.text)
            lastClipboardContent = response.text // 마지막 클립보드 내용을 업데이트합니다.\

            // TODO
            // 여기다가 텍스트 저장하는 API 호출하면 됨.
          }
        } else {
          console.error('Failed to read clipboard content:', response?.error)
        }
      })
    }
  })
}

setInterval(requestClipboardContent, 1000)
