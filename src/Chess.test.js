import React from 'react';
import ReactDOM from 'react-dom';
import Chess from './Chess';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chess />, div);
});
