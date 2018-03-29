import React, { Component } from 'react';
import './App.css';

import { Dropdown } from './components/dropdown'

class App extends Component {

  state = {
      response: "",
      currA: "",
      currB: "",
      rate: 0
    };

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

    calculateRate = (currA) => {
      this.setState({currA: currA});
      //this.setState({currB: currB});
      //this.state.rate = Math.round((rateCurrB / rateCurrA) * 10000) / 10000;
      //this.state.result = Math.round((req.body.value * (rateCurrB / rateCurrA)) * 100) / 100;
    }

    calculate

  render() {
    return (
      <div className="App">
        <div>
          <Dropdown callbackFromParent={this.calculateRate}/>
        </div>
        <p>
          {this.state.currA}
        </p>

      </div>
    );
  }
}

export default App;
