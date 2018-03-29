import React from 'react';

export class Dropdown extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: []
    };
  }

componentDidMount(){
  fetch('https://api.fixer.io/latest')
    .then(response => response.json())
    .then(myJson => {
      this.setState({ list: Object.keys(myJson.rates) });
    });
}


  render(){
    var selectCurr = curr =>
     <select>{(this.state.list).map(x => <option>{x}</option>)}</select>;

    return (
      <div>
        {selectCurr()}
      </div>
    );
  }
}
