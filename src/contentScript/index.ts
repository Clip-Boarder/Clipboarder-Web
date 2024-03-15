console.info('contentScript is running')

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'readClipboard') {
    const readText = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        const el = document.createElement('input')
        el.style.position = 'fixed'
        el.style.top = '0'
        el.style.left = '-9999px'
        el.value = ''
        document.body.appendChild(el)
        el.focus()
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
