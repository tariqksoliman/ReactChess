import React from 'react';
import ReactDOM from 'react-dom';
import Chess from './Chess';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Chess />, document.getElementById('root'));
registerServiceWorker();
