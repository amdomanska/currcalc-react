import React, { Component } from 'react';
import './App.css';

import { Dropdown } from './components/dropdown'

class App extends Component {

  constructor(props) {
    super(props);
    this.calculateRate = this.calculateRate.bind(this);
    this.callApi = this.callApi.bind(this);
    this.state = {
      response: "",
      currA: 0,
      currB: 1
    }
  }

    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }

    callApi = async () => {
      const response = await fetch('/main');
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    calculateRate = (key, val) => {
    // if the calling agent sent currA data, update currA,
    // else if the calling agent sent currB data, update currB
    if (key === 'A') this.setState({currA: val})
    if (key === 'B') this.setState({currB: val})
    console.log('updated curr' + key + ' to ' + val);
    }

    render() {
    return (
      <div className='App'>
        <div>
          <Dropdown callbackFromParent={this.calculateRate}
            stateKey={'A'} val={this.state.currA} />
          <Dropdown callbackFromParent={this.calculateRate}
            stateKey={'B'} val={this.state.currB} />
            <p>
            {this.state.currA}
            {this.state.currB}
            </p>
        </div>
      </div>
    );
    }
}

export default App;
