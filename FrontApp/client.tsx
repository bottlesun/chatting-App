import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container!) // ts 를 사용할때는, ! 를 붙혀야 한다.

import App from '@layouts/App';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);