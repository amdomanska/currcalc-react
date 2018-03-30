import React, { Component } from 'react';
//import './App.css';

import { Dropdown } from './components/Dropdown'
import { Result } from './components/Result'

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
   }
  }

  componentDidMount() {

    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => {console.log(err)});

  }

  callApi = async () => {
    const response = await fetch('/rates');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  setCurrs = (key, val) => {
    // if the calling agent sent currA data, update currA,
    // else if the calling agent sent currB data, update currB
    if (key === 'A') this.setState({currA: val})
    if (key === 'B') this.setState({currB: val})
  }

  render() {
    return (
      <div className='App'>

        <div class="rowC">
          <input type="text" value={this.state.currAval} onChange={ event => this.setState({currAval: event.target.value})} />
          <Dropdown callbackFromParent={this.setCurrs}
            stateKey={'A'} val={this.state.currA} />
          <Result data={this.state} />
          <Dropdown callbackFromParent={this.setCurrs}
            stateKey={'B'} val={this.state.currB} />
        </div>
      </div>
    );
  }
}


export default App;
