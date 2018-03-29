import React, { Component } from 'react';
import './App.css';

import { Dropdown } from './components/dropdown'

class App extends Component {

  state = {
      response: ''
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

  render() {
    return (
      <div className="App">
        <div>
          <Dropdown />
        </div>

      </div>
    );
  }
}

export default App;
