console.info('contentScript is running')

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'readClipboard') {
    const readText = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        const el = document.createElement('textarea')
        el.style.position = 'fixed'
        el.style.top = '0'
        el.style.left = '-9999px' // 화면 왼쪽 밖으로 배치
        el.value = 'before paste'
        document.body.appendChild(el)

        el.select()
        const success = document.execCommand('paste')

        const text = el.value
        document.body.removeChild(el)

        if (success) {
          resolve(text)
        } else {
          reject(new Error('Unable to read from clipboard'))
        }
      })
    }

    readText()
      .then((text) => {
        sendResponse({ success: true, text: text })
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.toString() })
      })

    return true
  }
})
