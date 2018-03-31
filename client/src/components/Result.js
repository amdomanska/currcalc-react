import React from 'react';
import PropTypes from 'prop-types';

export class Result extends React.Component {
/*  constructor (props) {
    super(props);
  }
*/

  render () {
    return (
      <div>
        <p className='result'> = {this.props.result ? this.props.result : ''}</p>
      </div>
    );
  }
}

Result.propTypes = {
  result: PropTypes.number
}
