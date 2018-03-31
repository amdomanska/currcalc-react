import React from 'react';

export class Dropdown extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    var selectCurr = () =>
      <select
        onChange={event => this.props.onChange(this.props.stateKey, event.target.value)}
      >
        {(this.props.currencies).map(x => <option>{x}</option>)}
      </select>;

    return (
      <div>
        {this.props.currencies ? selectCurr() : 'loading...'}
      </div>
    );
  }
}
