import React from 'react';
import PropTypes from 'prop-types';

const Result = ({currA, currB, currAval, currBval, names}) => {
  let nameA = 'Needs to be calculated!';
  let nameB = 'Needs to be calculated!';
  let isDataSet = currA && currB && currAval && currBval;
  if (isDataSet) {
    nameA = currAval > 1 ? names[currA].name_plural : names[currA].name;
    nameB = currBval > 1 ? names[currB].name_plural : names[currB].name;
  }
  return (
    <div>
      <p className={isDataSet ? 'result-first-line' : 'result-first-line hidden'}> {currAval} {nameA} equals </p>
      <p className={isDataSet ? 'result-second-line' : 'result-second-line hidden'}> {currBval} {nameB} </p>
    </div>
  );
};

export default Result;

Result.propTypes = {
  currA: PropTypes.string,
  currB: PropTypes.string,
  currAval: PropTypes.number,
  currBval: PropTypes.number,
  names: PropTypes.object
};
