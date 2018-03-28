import React from 'react';

export class Dropdown extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: this.props.list
    };
  }

componentDidMount(){

}


  render(){
    let currA = "ABC";
    return (
      <div>
      <p>
        {this.state.list}
      </p>
        <div>
          <h2> currencyDropdown </h2>
          <select name="currA" id="currA">
            <option value= "{ currA }" selected="selected">{ currA }</option>
          </select>
        </div>
      </div>
    );
  }
}
