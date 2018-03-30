import React from 'react';

export class Result extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <p class="result"> = {this.props.result ? this.props.result : ""}</p>
      </div>
    )
  }
}
