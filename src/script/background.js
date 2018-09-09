chrome.storage.local.get({mediaAccess: false}, function(items) {
  if (!items.mediaAccess) {
    chrome.tabs.create({ url: "html/options.html" })
  }
})
