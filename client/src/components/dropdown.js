import React from 'react';

export class Dropdown extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: [],
      selected: ""
    };
  }

componentDidMount(){
  fetch('https://api.fixer.io/latest')
    .then(response => response.json())
    .then(myJson => {
      this.setState({ list: Object.keys(myJson.rates) });
    });
}

change(event) {
  this.setState({ selected: event.target.value });
  this.props.callbackFromParent(this.state.selected);
}

  render(){
    var selectCurr = (curr) =>
     <select
      onChange={this.change.bind(this)}
      value={this.state.currA}
     >
     {(this.state.list).map(x => <option>{x}</option>)}
     </select>;

    return (
      <div>
        {selectCurr()}
      </div>
    );
  }
}
