import React from 'react';
import PropTypes from 'prop-types';

const Result = ({currA, currB, currAval, currBval, names}) => {
  if (currA && currB && currAval && currBval) {
    const nameA = currAval > 1 ? names[currA].name_plural : names[currA].name;
    const nameB = currBval > 1 ? names[currB].name_plural : names[currB].name;
    return (
      <div>
        <p className='result-first-line'> {currAval} {nameA} equals </p>
        <p className='result-second-line'> {currBval} {nameB} </p>
      </div>
    );
  } else {
    return null;
  }
};

export default Result;

Result.propTypes = {
  currA: PropTypes.string,
  currB: PropTypes.string,
  currAval: PropTypes.number,
  currBval: PropTypes.number,
  names: PropTypes.object
};
