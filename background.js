// create a unique ID for this context menu
const CONTEXT_MENU_ID = "MY_CONTEXT_MENU";

// function that is called when the context menu is selected
async function getVbbLinkForClipboard(selectedImageElement, tab){
  // check if it was our context menu that called the function
  if (selectedImageElement.menuItemId !== CONTEXT_MENU_ID) {
    // not us so drop out
    return;
  }
  // get the image source and link URLs for the selected image
  var output = "";
  var link = selectedImageElement.linkUrl;
  var image = selectedImageElement.srcUrl;
  if (image) {
    if (image.length) {
      // image has a source, so check if it is gmail security encoded
      var parts = image.split("#");
      if (parts.length == 2) {
        // url was encoded, return url after the #
        output += parts[1];
      } else {
        // url wasn't encoded, return the full url
        output += parts[0];
      }
      // wrap the url in VBB code [IMG] tags
      output = "[img]" + output + "[/img]"
    }
  }
  if (link) {
    // image also had a link, so wrap in VBB code [URL] tags
    // and include the link
    output = "[url=" + link + "]" + output + "[/url]";
  }

  // call the function to copy the output to the clipboard
  await addToClipboard(output);
}

// this function copies the passed value into the clipboard
async function addToClipboard(value) {
  // due to tighter security in Chrome, we have to use
  // an off-screen document to do the clipboard copy
  await chrome.offscreen.createDocument({
    // create based on our included template file
    url: 'offscreen.html',
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: 'Write text to the clipboard.'
  });

  // send the value to the offscreen document
  // this will do the actual copy to clipboard
  chrome.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen-doc',
    data: value
  });
}

// one time initialisation call to create our context menu
chrome.contextMenus.create({
  title: "Create VBB Code for Image",
  contexts: ["image"],
  id: CONTEXT_MENU_ID
});
// add the function to the context menu
chrome.contextMenus.onClicked.addListener(getVbbLinkForClipboard);
