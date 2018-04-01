import React from 'react';
import PropTypes from 'prop-types';

export class FullResult extends React.Component {
  render () {
    let result = () => {
      console.log('rendering FullResult', );
      if (this.props.data.currA &&
          this.props.data.currB &&
          !isNaN(this.props.data.currAval) &&
          !isNaN(this.props.data.result) &&
          this.props.data.names) {
        let curr = this.props.data.currA;
        let names = this.props.data.names;
        // console.log(names[curr]);
        return (
          <div>
            <h2> {this.props.data.currAval} {names[curr].name} </h2>
          </div>
        );
      }
    };
    return (
      <div>
        { result() }
      </div>
    );
  }
}

FullResult.propTypes = {
  data: PropTypes.Object
};
