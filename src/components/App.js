import React from 'react';
import Pusher from "pusher-js"
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = { contextGlobal: [], currentTab: [], contextNow: [], content: [] }

     this.handleGlobalContextUpdate = this.handleGlobalContextUpdate.bind(this)
     this.handleContextNowUpdate = this.handleContextNowUpdate.bind(this)
  }

  componentDidMount() {
    const pusher = new Pusher('7183f00f7d1dd7d82761', {
      cluster: 'eu'
    });

    const globalContext = pusher.subscribe('globalContext');
    globalContext.bind('update-context', (data) => {
      console.log("recieved globalContext event", data.message);
      this.handleGlobalContextUpdate(data)
    });

    const context = pusher.subscribe('context');
    context.bind('context-now', (data) => {
      console.log("recieved contextNOW context event", data.message);
      this.handleContextNowUpdate(data)
    });
  }

  //updates the global context state
  handleGlobalContextUpdate(data){
    this.setState({
      currentTab: data.message
    })
  }

  //updates the contextNow State
  handleContextNowUpdate(data){
    this.setState({
      contextNow: data.message
    })
  }

  render(){

    return (
      <div className="app">


        <h3>Global Context:</h3>
        // Overall browser window information


        <h3>Your current Tab:</h3>
        // Active tab and scroll poistion. Websockets needed for scroll position
        <p>{JSON.stringify(this.state.currentTab)}</p>


        <h3>Context now:</h3>
        // The context when A user initiates a save
        <p>{JSON.stringify(this.state.contextNow)}</p>

        <h3>Content:</h3>
        // The content sent through and you would like to includein  your notes

      </div>
    )
  }
}

export default App;
