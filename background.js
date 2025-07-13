const CONTEXT_MENU_ID = "MY_CONTEXT_MENU";

async function getVbbLinkForClipboard(selectedImageElement, tab){
  if (selectedImageElement.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }
  var output = "";
  var link = selectedImageElement.linkUrl;
  var image = selectedImageElement.srcUrl;
  if (image) {
    if (image.length) {
      var parts = image.split("#");
      if (parts.length == 2) {
        output += parts[1];
      } else {
        output += parts[0];
      }
      output = "[img]" + output + "[/img]"
    }
  }
  if (link) {
    output = "[url=" + link + "]" + output + "[/url]";
  }

  await addToClipboard(output);
}

async function addToClipboard(value) {
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: 'Write text to the clipboard.'
  });

  // Now that we have an offscreen document, we can dispatch the
  // message.
  chrome.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen-doc',
    data: value
  });
}

chrome.contextMenus.create({
  title: "Create VBB Code for Image",
  contexts: ["image"],
  id: CONTEXT_MENU_ID
});
chrome.contextMenus.onClicked.addListener(getVbbLinkForClipboard);


