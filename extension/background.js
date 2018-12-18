console.log('background script running');

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab){
  chrome.tabs.captureVisibleTab(null, {}, function (image) {
   // You can add that image HTML5 canvas, or Element.
   console.log({url: tab.url, title: tab.title, image: image});
  });
}
