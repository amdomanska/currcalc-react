import React, { Component } from 'react';
// import './App.css';

import { Dropdown } from './components/Dropdown';
import { Result } from './components/Result';
import { Value } from './components/Value';
import { FullResult } from './components/FullResult';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currA: null,
      currB: null,
      currAval: 1,
      result: null,
      names: null
    };
  }

  async componentDidMount () {
    await this.callApi();
    await this.callNames();
  }

  callApi = async () => {
    try {
      const response = await fetch('/rates');
      if (response.status === 200) {
        const body = await response.json();
        this.setState({ rates: body.rates, ratesError: null });
      } else {
        this.setState({ ratesError: 'Error getting currency rates' });
      }
    } catch (err) {
      console.log(err);
      this.setState({ ratesError: err });
    }
    setTimeout(this.callApi.bind(this), 60000);
  }

  callNames = async () => {
    try {
      console.log('Fetching names...');
      const response = await fetch('/names');
      if (response.status === 200) {
        const body = await response.json();
        this.setState({names: body.names, namesError: null});
      } else {
        this.setState({namesError: 'Error getting currency names'});
      }
    } catch (err) {
      console.log(err);
      this.setState({namesError: err});
    }
    setTimeout(this.callNames.bind(this), 60000);
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
        {this.state.ratesError ? <div> {'Couldn not load currencies... Waiting for server... '} </div> : null}
        {this.state.namesError ? null : <FullResult data={this.state} />}
        <div className='rowC'>
          <Value value={this.state.currAval} onChange={this.setValue} />
          <Dropdown onChange={this.setCurrs} currencies={currencies}
            stateKey={'A'} val={this.state.currA} />
          <Result result={this.state.result} />
          <Dropdown onChange={this.setCurrs} currencies={currencies}
            stateKey={'B'} val={this.state.currB} />
        </div>
        <footer>
          <h5>@ data received from api.fixer.io</h5>
        </footer>
      </div>
    );
  }
}

export default App;
