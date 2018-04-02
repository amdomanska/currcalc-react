import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

fetchMock.get('*', JSON.stringify({
  'rates': {
    'GBP': 1,
    'PLN': 2
  }
}));

jest.useFakeTimers();

function flushPromises () {
  return new Promise(resolve => setImmediate(resolve));
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders default state', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('fetches rates', () => {
    const app = mount(<App />);
    expect(app.state().rates).toBe(undefined);

    return flushPromises().then(() => {
      expect(app.state().rates).toEqual({
        'GBP': 1,
        'PLN': 2
      });
    });
  });
});
