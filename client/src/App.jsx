import {Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './general/Router.jsx';
import {Loading} from './components/Loading.jsx';


export const App = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <Loading name="suspense"/>
      }
    >
      <Router/>
    </Suspense>
  </BrowserRouter>
);
