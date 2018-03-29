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

/*change(event) {
  this.props.callbackFromParent(event.target.value);
}*/

  render(){
    var selectCurr = (curr) =>
     <select
      onChange={event => this.props.callbackFromParent.bind(null, this.props.stateKey, this.props.val+1)}
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
