console.log('background script running');

// Context now

// Add command to trigger user - forced context update context
 chrome.commands.onCommand.addListener(function(command) {
  if (command == "update-context") {
    console.log("updating the context!");
    chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        buttonClicked(tab)
    });

  }
});

//needed
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

// update context on loading in a new page
chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {

 if(changeInfo.status == "loading"){

    console.log(tab);

    fetch('http://localhost:8080/api/context', {
       method: 'post',
       body: JSON.stringify(tab),
       headers: {
         'Content-Type': 'application/json'
       },
       mode: "cors"
     }).then(function(response) {
       console.log(response);
       return response.json();
     })
   }
 });

// // Update chrome extension on browser action update.
//  chrome.tabs.onActivated.addListener(function (tabId, windowId) {
//    fetch('http://localhost:8080/api/context', {
//       method: 'post',
//       body: JSON.stringify(contextData),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       mode: "cors"
//     }).then(function(response) {
//       console.log(response);
//       return response.json();
//     })
//  })


 ////////////////////////////////////

 //Context global

 //Current Tab

 //Context now

 //Content
