const allowMediaButton = document.getElementById('allow-media-access-button')
const mediaAllowedNode = document.getElementsByClassName('allowed-media')[0]
chrome.storage.local.get({mediaAccess: false}, items => {
  if (items.mediaAccess) {
    allowMediaButton.parentElement.removeChild(allowMediaButton)
    mediaAllowedNode.classList.remove('hidden')
  } else {
    const setMediaAccess = () => getUserMedia().then(() => {
      chrome.storage.local.set({mediaAccess: true}, () => {
        console.log('mediaAccess is set')
      })
    })
    allowMediaButton.addEventListener('click', setMediaAccess)
  }
})

fetch('https://www.google.com', {mode: 'no-cors'})
  .then(() => {
    document.getElementsByClassName('checking-network')[0].classList.add('hidden')
    document.getElementsByClassName('google-access')[0].classList.remove('hidden')
  }).catch(() => {
    document.getElementsByClassName('checking-network')[0].classList.add('hidden')
    document.getElementsByClassName('no-google-access')[0].classList.remove('hidden')
  })
