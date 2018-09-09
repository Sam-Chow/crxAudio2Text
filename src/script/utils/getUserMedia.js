const getUserMedia = () =>
  navigator.mediaDevices.getUserMedia({audio: true}).then(
    x => x,
    error => {
      const { name } = error
      let errorMessage
      switch (name) {
        // 用户拒绝
        case 'NotAllowedError':
        case 'PermissionDeniedError':
          errorMessage = '用户已禁止网页调用录音设备'
          break
        // 没接入录音设备
        case 'NotFoundError':
        case 'DevicesNotFoundError':
          errorMessage = '录音设备未找到'
          break
        // 其它错误
        case 'NotSupportedError':
          errorMessage = '不支持录音功能'
          break
        default:
          errorMessage = '录音调用错误'
          window.console.log(error)
      }
      chrome.storage.local.set({error: errorMessage}, () => {
        window.console.log(errorMessage)
      })
      Promise.reject(errorMessage)
    }
  )

// export default getUserMedia
