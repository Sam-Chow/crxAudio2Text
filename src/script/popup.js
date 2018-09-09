chrome.storage.local.get({mediaAccess: false}, function(items) {
  if (!items.mediaAccess) {
    chrome.tabs.create({url: "html/options.html"});
  } else {
    const buttonNode = document.getElementsByClassName('audio-icon')[0]
    const emptyImg = buttonNode.getElementsByClassName('empty-img')[0]
    const solidImg = buttonNode.getElementsByClassName('solid-img')[0]
    const textNode = document.getElementsByClassName('text')[0]
    let isSpeaking = false
    let isActive = false
    let recoginition = null
    buttonNode.addEventListener('click', () => {
      if (isActive) {
        isActive = false
        recoginition.stop()
        buttonNode.classList.remove('speaking')
        emptyImg.style.zIndex = 1
        solidImg.style.zIndex = 2
        if (!isSpeaking) {
          textNode.innerHTML = '点击图标开始说话'
          textNode.classList.remove('finished')
          textNode.classList.add('waiting')
        } else {
          textNode.classList.remove('waiting')
          textNode.classList.add('finished')
        }
        return
      }
      isActive = true
      buttonNode.classList.add('speaking')
      textNode.classList.remove('finished')
      textNode.classList.add('waiting')
      textNode.innerHTML = '我在听…'
      emptyImg.style.zIndex = 2
      solidImg.style.zIndex = 1
      const newRecognition = new SpeechRecognition()
      recoginition = newRecognition
      newRecognition.continuous = true
      newRecognition.interimResults = true
      newRecognition.onresult = event => {
        isSpeaking = true
        let sentence = ''
        Array.prototype.forEach.call(event.results, result => {
          sentence += `${result[0].transcript} `
        })
        textNode.innerHTML = sentence.trim()
      }
      newRecognition.onerror = err => {
        textNode.classList.add('hidden')
        const errorTextNode = document.getElementsByClassName('recognition-error')[0]
        errorTextNode.classList.remove('hidden')
        errorTextNode.getElementsByClassName('recognition-error-content')[0].innerHTML =
          `${err.error} ${err.type}`
        isActive = false
        recoginition.stop()
        buttonNode.classList.remove('speaking')
        textNode.classList.remove('waiting')
        textNode.classList.add('finished')
        emptyImg.style.zIndex = 1
        solidImg.style.zIndex = 2
      }
      newRecognition.start()
    })
  }
})
