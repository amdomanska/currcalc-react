import React from 'react';
import PropTypes from 'prop-types';

const FullResult = ({currA, currB, names, currAval, result}) => {
  let nameA = 'Needs to be calculated!';
  let nameB = 'Needs to be calculated!';
  let isDataSet = currA && currB && currAval && result;
  if (isDataSet) {
    nameA = currAval > 1 ? names[currA].name_plural : names[currA].name;
    nameB = result > 1 ? names[currB].name_plural : names[currB].name;
  }
  return (
    <div>
      <p className={isDataSet ? 'result-first-line' : 'result-first-line hidden'}> {currAval} {nameA} equals </p>
      <p className={isDataSet ? 'result-second-line' : 'result-second-line hidden'}> {result} {nameB} </p>
    </div>
  );
};

export default FullResult;

FullResult.propTypes = {
  currA: PropTypes.string,
  currB: PropTypes.string,
  currAval: PropTypes.number,
  names: PropTypes.object,
  result: PropTypes.number
};
