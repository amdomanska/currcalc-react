import React from 'react';

export class Value extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <input type="text" class="value" value={this.props.value} onChange={event => this.props.onChange(event.target.value)} />
      </div>
    );
  }
}
