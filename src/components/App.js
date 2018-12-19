import React from 'react';
import Pusher from "pusher-js"
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = { currentTab: [] }

     this.handleContextUpdate = this.handleContextUpdate.bind(this)
  }

  handleContextUpdate(){
    this.setState({
      currentTab: data.message
    })
  }

  componentDidMount(handleContextUpdate) {
    const pusher = new Pusher('7183f00f7d1dd7d82761', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('context');
    channel.bind('update-context', function(data) {
      console.log("recieved update context event", data.message);
      this.handleContextUpdate()
    });
  }




  render(){

    return (
      <div className="app">
        App goes here ioehfioehr

        { this.state.currentTab }
      </div>
    )
  }
}

export default App;
