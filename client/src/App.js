import React, { Component } from 'react';

import { Dropdown } from './components/Dropdown';
import { Value } from './components/Value';
import Result from './components/Result';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currA: null,
      currB: null,
      currAval: 1,
      currBval: 1,
      names: null
    };
  }

  async componentDidMount () {
    document.title = 'Currency Calculator';
    await this.fetchRates();
    this.timer = setInterval(() => {
      this.fetchRates().then();
    }, 60000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  fetchRates = async () => {
    try {
      const response = await fetch('/rates');
      if (response.status === 200) {
        const body = await response.json();
        this.setState({ rates: body.rates, names: body.info, ratesError: null });
      } else {
        this.setState({ ratesError: 'Error getting currency rates' });
      }
    } catch (err) {
      console.log(err);
      this.setState({ ratesError: err });
    }
  }

  setCurrs = (key, val) => {
    if (key === 'A') this.setState({currA: val}, () => this.update('B'));
    if (key === 'B') this.setState({currB: val}, () => this.update('A'));
  }

  setValue = (key, val) => {
    val = Number(val);
    if (key === 'A') this.setState({currAval: val}, () => this.update('B'));
    if (key === 'B') this.setState({currBval: val}, () => this.update('A'));
  }

  update (keyToChange) {
    const { rates, currA, currB, currAval, currBval } = this.state;
    console.log(currA, currB, currAval, currBval);
    if (rates && currA && currB) {
      const rateA = rates[currA];
      const rateB = rates[currB];
      if (keyToChange === 'A') {
        const newVal = Math.round((currBval * (rateA / rateB)) * 100) / 100;
        this.setState({currAval: newVal});
      } else if (keyToChange === 'B') {
        const newVal = Math.round((currAval * (rateB / rateA)) * 100) / 100;
        this.setState({currBval: newVal});
      }
    } else {
      if (keyToChange === 'A') {
        this.setState({currAval: 1});
      } else if (keyToChange === 'B') {
        this.setState({currBval: 1});
      }
    }
  }

  render () {
    const currencies = this.state.rates ? Object.keys(this.state.rates) : null;
    return (
      <div className='App'>
        {this.state.ratesError ? <div> {'Couldn not load currencies... Waiting for server... '} </div> : null}
        <Result {...this.state} />
        <div className='rowC'>
          <Value
            value={this.state.currAval}
            onChange={this.setValue}
            stateKey={'A'} />
          <Dropdown
            onChange={this.setCurrs}
            currencies={currencies}
            stateKey={'A'}
            val={this.state.currA} />
        </div>
        <div className='rowC'>
          <Value
            value={this.state.currBval}
            onChange={this.setValue}
            stateKey={'B'} />
          <Dropdown
            onChange={this.setCurrs}
            currencies={currencies}
            stateKey={'B'}
            val={this.state.currB} />
        </div>
        <footer>
          <p className='footer'>@ data received from fixer.io</p>
        </footer>
      </div>
    );
  }
}

export default App;
