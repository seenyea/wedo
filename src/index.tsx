import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '@src/contexts/theme'

import '@src/styles/bulma/bulma.custom.sass';
import '@src/styles/app.scss';
import '@src/styles/pure.scss';

import { addShareStore } from '@src/model/share-store'

addShareStore('Analysis', {});
addShareStore('Portal', {});
addShareStore('ProcessData', {});


import App from './app';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root'))