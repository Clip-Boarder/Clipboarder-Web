chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'readClipboard') {
    navigator.clipboard
      .read()
      .then((clipboardItems) => {
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            // 텍스트 처리
            if (type === 'text/plain') {
              clipboardItem.getType(type).then((blob) => {
                blob.text().then((text) => {
                  sendResponse({ success: true, type: 'text', text: text })
                })
              })
              return true
            }
            // 이미지 처리
            else if (type.startsWith('image/')) {
              clipboardItem.getType(type).then((blob) => {
                const reader = new FileReader()
                reader.onload = function (e) {
                  sendResponse({ success: true, type: 'image', image: e.target?.result })
                }
                reader.readAsDataURL(blob)
              })
              return true
            }
          }
        }
        sendResponse({ success: false, error: 'Data Not Found' })
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.toString() })
      })

    return true
  }
})
