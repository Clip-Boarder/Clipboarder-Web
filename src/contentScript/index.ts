console.info('contentScript is running')

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'readClipboard') {
    const readText = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        // Create hidden input to receive text
        const el = document.createElement('textarea')
        el.value = 'before paste'
        document.body.appendChild(el)

        // Paste from clipboard into input
        el.select()
        const success = document.execCommand('paste')

        // The contents of the clipboard
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
        // If reading the clipboard was successful, send the text back
        sendResponse({ success: true, text: text })
      })
      .catch((error) => {
        // If there was an error, send the error message back
        sendResponse({ success: false, error: error.toString() })
      })

    // Return true to indicate that sendResponse will be called asynchronously
    return true
  }
})
