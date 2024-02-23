console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})
async function readClipboardText() {
  try {
    const text = await navigator.clipboard.readText()
    console.log('클립보드에서 읽은 텍스트:', text)
  } catch (err) {
    console.error('클립보드 접근 권한이 없거나, 다른 오류 발생:', err)
  }
}

setInterval(readClipboardText, 5000)
