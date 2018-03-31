import React from 'react';
import PropTypes from 'prop-types';

export class Result extends React.Component {
/*  constructor (props) {
    super(props);
  }
*/

  propTypes = {
    result: PropTypes.number.isRequired
  }

  render () {
    return (
      <div>
        <p className='result'> = {this.props.result ? this.props.result : ''}</p>
      </div>
    );
  }
}
