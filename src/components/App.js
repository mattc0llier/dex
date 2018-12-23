import React from 'react';
import Pusher from "pusher-js"
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = { currentTab: [] }

     this.handleContextUpdate = this.handleContextUpdate.bind(this)
  }



  componentDidMount() {
    const pusher = new Pusher('7183f00f7d1dd7d82761', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('context');
    channel.bind('update-context', (data) => {
      console.log("recieved update context event", data.message);
      this.handleContextUpdate(data)
    });
  }

  handleContextUpdate(data){
    this.setState({
      currentTab: data.message
    })
  }




  render(){

    return (
      <div className="app">
        Your current Tab:

        <p>{JSON.stringify(this.state.currentTab)}</p>
      </div>
    )
  }
}

export default App;
