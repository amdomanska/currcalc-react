import React, { Component } from 'react';
// import './App.css';

import { Dropdown } from './components/Dropdown';
import { Result } from './components/Result';
import { Value } from './components/Value';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rates: null,
      currA: null,
      currB: null,
      currAval: 1,
      result: null
    };
  }

  componentDidMount () {
    this.callApi()
      .then(res => this.setState({ rates: res.rates }))
      .catch(err => { console.log(err); });
  }

  callApi = async () => {
    const response = await fetch('/rates');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  setCurrs = (key, val) => {
    if (key === 'A') this.setState({currA: val}, () => this.update());
    if (key === 'B') this.setState({currB: val}, () => this.update());
  }

  setValue = (val) => {
    this.setState({currAval: val}, () => this.update());
  }

  update () {
    const { rates, currA, currB, currAval } = this.state;
    console.log(currAval, currA, currB);
    if (rates && currA && currB) {
      const rateA = rates[currA];
      const rateB = rates[currB];
      const newVal = Math.round((currAval * (rateB / rateA)) * 100) / 100;
      this.setState({result: newVal});
    } else {
      this.setState({result: null});
    }
  }

  render () {
    const currencies = this.state.rates ? Object.keys(this.state.rates) : null;
    return (
      <div className='App'>

        <div className='rowC'>
          <Value value={this.state.currAval} onChange={this.setValue} />
          <Dropdown onChange={this.setCurrs} currencies={currencies}
            stateKey={'A'} val={this.state.currA} />
          <Result result={this.state.result} />
          <Dropdown onChange={this.setCurrs} currencies={currencies}
            stateKey={'B'} val={this.state.currB} />
        </div>
      </div>
    );
  }
}

export default App;
