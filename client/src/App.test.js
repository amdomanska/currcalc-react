import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from 'fetch-mock';

fetchMock.get('*', JSON.stringify({
  'rates': {
    'GBP': 0.5
  }
}));

it('renders without crashing', () => {
  jest.useFakeTimers();
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  jest.runAllTimers();
});
