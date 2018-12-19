console.log('background script running');

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab){
  chrome.tabs.captureVisibleTab(null, {}, function (image) {
   // You can add that image HTML5 canvas, or Element.
   const contextData = { url: tab.url, title: tab.title/*, image: image*/ }
   console.log(contextData);

   fetch('http://localhost:8080/api/context', {
      method: 'post',
      body: JSON.stringify(contextData),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors"
    }).then(function(response) {
      console.log(response);
      return response.json();
    })

 });
}

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {

 if(changeInfo.status == "loading"){

    console.log(tab);

     var request = new XMLHttpRequest();

     request.open("POST", "http://localhost:8080/api/context", true);
     request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
     request.send(JSON.stringify({tab}));
   }
 });
