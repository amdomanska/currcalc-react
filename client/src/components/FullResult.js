import React from 'react';
import PropTypes from 'prop-types';

export class FullResult extends React.Component {
  render () {
    let result = () => {
      if (this.props.data.currA &&
          this.props.data.currB &&
          !isNaN(this.props.data.currAval) &&
          !isNaN(this.props.data.result) &&
          this.props.data.names) {
        let currA = this.props.data.currA;
        let currB = this.props.data.currB;
        let names = this.props.data.names;
        let nameA = this.props.data.currAval > 1 ? names[currA].name_plural : names[currA].name;
        let nameB = this.props.data.result > 1 ? names[currB].name_plural : names[currB].name;
        // console.log(names[curr]);
        return (
          <div>
            <p className='result-first-line'> {this.props.data.currAval} {nameA} equals </p>
            <p className='result-second-line'> {this.props.data.result} {nameB} </p>
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
