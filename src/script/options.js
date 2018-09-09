const allowMediaButton = document.getElementById('allow-media-access-button')
chrome.storage.local.get({mediaAccess: false}, items => {
  if (items.mediaAccess) {
    const allowMediaNode = allowMediaButton.parentElement
    allowMediaNode.parentElement.removeChild(allowMediaNode)
  } else {
    const setMediaAccess = () => getUserMedia().then(() => {
      chrome.storage.local.set({mediaAccess: true}, () => {
        console.log('mediaAccess is set')
      })
    })
    allowMediaButton.addEventListener('click', setMediaAccess)
  }
})
