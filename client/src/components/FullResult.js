import React from 'react';
import PropTypes from 'prop-types';

const FullResult = ({currA, currB, names, currAval, result}) => {
  if (currA && currB && currAval && result) {
    const nameA = currAval > 1 ? names[currA].name_plural : names[currA].name;
    const nameB = result > 1 ? names[currB].name_plural : names[currB].name;
    return (
      <div>
        <p className='result-first-line'> {currAval} {nameA} equals </p>
        <p className='result-second-line'> {result} {nameB} </p>
      </div>
    );
  } else {
    return null;
  }
};

export default FullResult;

FullResult.propTypes = {
  currA: PropTypes.string,
  currB: PropTypes.string,
  currAval: PropTypes.number,
  names: PropTypes.object,
  result: PropTypes.number
};
