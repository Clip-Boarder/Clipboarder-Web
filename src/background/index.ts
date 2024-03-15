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
let lastClipboardContent = ''

function requestClipboardContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0 && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readClipboard' }, function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError)
          return
        }
        if (response && response.success) {
          if (response.text !== lastClipboardContent) {
            console.log(response.text)
            lastClipboardContent = response.text

            // TODO
            // 여기에 텍스트 저장하는 API 호출 코드 추가해야함
          }
        } else {
          console.error(response?.error)
        }
      })
    }
  })
}

setInterval(requestClipboardContent, 1000)
