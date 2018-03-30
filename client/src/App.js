import React, { Component } from 'react';
//import './App.css';

import { Dropdown } from './components/dropdown'
import { Result } from './components/result'

class App extends Component {
  constructor(props) {
   super(props);
   this.callApi = this.callApi.bind(this);
   this.setCurrs = this.setCurrs.bind(this);
   this.state = {
     currA: "AUD",
     currB: "AUD",
     currAval: 1,
     currBval: 1,
     lastCurrChanged: ""
   }
  }

  componentDidMount() {

    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => {console.log(err)});

  }

  callApi = async () => {
    const response = await fetch('/main');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  setCurrs = (key, val) => {
    // if the calling agent sent currA data, update currA,
    // else if the calling agent sent currB data, update currB
    if (key === 'A') this.setState({currA: val, lastCurrChanged: "A"})
    if (key === 'B') this.setState({currB: val, lastCurrChanged: "B"})
  }

  render() {
    return (
      <div className='App'>
        <Result data={this.state} />
        <div class="rowC">
          <input type="text" value={this.state.currAval} onChange={ event => this.setState({currAval: event.target.value, lastCurrChanged: "A"})} />
          <Dropdown callbackFromParent={this.setCurrs}
            stateKey={'A'} val={this.state.currA} />
        </div>
        <div class="rowC">
          <input type="text" value={this.state.currBval} onChange={ event => this.setState({currBval: event.target.value, lastCurrChanged: "B"})} />
            <Dropdown callbackFromParent={this.setCurrs}
              stateKey={'B'} val={this.state.currB} />
        </div>
      </div>
    );
  }
}


export default App;
