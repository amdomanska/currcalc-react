import React from 'react';
import PropTypes from 'prop-types';

export class Dropdown extends React.Component {
  /* constructor (props) {
    super(props);
  } */

  render () {
    let selectCurr = () =>
      <select
        onChange={event => this.props.onChange(this.props.stateKey, event.target.value)}
      >
        <option>Choose currency...</option>
        {(this.props.currencies).map((x, i) => <option key={i}>{x}</option>)}
      </select>;

    return (
      <div>
        {this.props.currencies ? selectCurr() : 'loading...'}
      </div>
    );
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  stateKey: PropTypes.string.isRequired,
  currencies: PropTypes.array
};
