import React from 'react';
import PropTypes from 'prop-types';

export class Value extends React.Component {
/*  constructor (props) {
    super(props);
  }
*/

  render () {
    return (
      <div>
        <input type='text' className='value' value={this.props.value} onChange={event => this.props.onChange(event.target.value)} />
      </div>
    );
  }
}

Value.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number
};
