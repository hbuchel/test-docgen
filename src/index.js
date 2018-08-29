import React from 'react';
import { render } from 'react-dom';
import App from './App';


import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Amazon Ember', 'Arial', sans-serif;
  }
`

render(<App />, document.getElementById('root'));